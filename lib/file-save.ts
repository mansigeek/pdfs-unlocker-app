import AsyncStorage from '@react-native-async-storage/async-storage';
import { Directory, File } from 'expo-file-system';
import * as FileSystem from 'expo-file-system/legacy';
import { Platform } from 'react-native';

const DOWNLOADS_URI_KEY = 'pdf_unlocker_downloads_uri';

function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '_');
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

async function downloadPdfWeb(data: ArrayBuffer, filename: string): Promise<void> {
  const blob = new Blob([data], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function getAndroidDownloadsUri(forcePrompt = false): Promise<string> {
  if (!forcePrompt) {
    const cached = await AsyncStorage.getItem(DOWNLOADS_URI_KEY);
    if (cached) return cached;
  } else {
    await AsyncStorage.removeItem(DOWNLOADS_URI_KEY);
  }

  const { StorageAccessFramework } = FileSystem;
  const downloadsRoot = StorageAccessFramework.getUriForDirectoryInRoot('Download');
  const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync(downloadsRoot);

  if (!permissions.granted || !permissions.directoryUri) {
    throw new Error('Downloads folder access was not granted.');
  }

  await AsyncStorage.setItem(DOWNLOADS_URI_KEY, permissions.directoryUri);
  return permissions.directoryUri;
}

async function downloadPdfAndroid(data: ArrayBuffer, filename: string): Promise<void> {
  const { StorageAccessFramework } = FileSystem;
  const safeName = sanitizeFilename(filename);
  const baseName = safeName.replace(/\.pdf$/i, '') || 'unlocked';
  const base64 = arrayBufferToBase64(data);

  const writeToDownloads = async (downloadsUri: string) => {
    const fileUri = await StorageAccessFramework.createFileAsync(
      downloadsUri,
      baseName,
      'application/pdf'
    );

    await StorageAccessFramework.writeAsStringAsync(fileUri, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });
  };

  try {
    await writeToDownloads(await getAndroidDownloadsUri());
  } catch {
    await writeToDownloads(await getAndroidDownloadsUri(true));
  }
}

async function downloadPdfIos(data: ArrayBuffer, filename: string): Promise<void> {
  const safeName = sanitizeFilename(filename);
  const directory = await Directory.pickDirectoryAsync();
  const file = new File(directory.uri, safeName);
  file.create({ overwrite: true });
  file.write(new Uint8Array(data));
}

export async function downloadPdf(data: ArrayBuffer, filename: string): Promise<string> {
  const safeName = sanitizeFilename(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);

  if (Platform.OS === 'web') {
    await downloadPdfWeb(data, safeName);
    return 'PDF downloaded.';
  }

  if (Platform.OS === 'android') {
    await downloadPdfAndroid(data, safeName);
    return 'PDF saved to Downloads.';
  }

  await downloadPdfIos(data, safeName);
  return 'PDF saved to selected folder.';
}
