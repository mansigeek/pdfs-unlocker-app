import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export async function saveAndSharePdf(data: ArrayBuffer, filename: string): Promise<void> {
  const base64 = arrayBufferToBase64(data);
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const uri = `${FileSystem.cacheDirectory}${safeName}`;

  await FileSystem.writeAsStringAsync(uri, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const canShare = await Sharing.isAvailableAsync();
  if (canShare) {
    await Sharing.shareAsync(uri, {
      mimeType: 'application/pdf',
      dialogTitle: 'Save unlocked PDF',
      UTI: 'com.adobe.pdf',
    });
  } else {
    throw new Error('Sharing is not available on this device.');
  }
}
