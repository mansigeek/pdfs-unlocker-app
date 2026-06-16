import { API_BASE } from '@/constants/config';

export const STATUS_MESSAGES: Record<number, string> = {
  400: 'This does not appear to be a valid PDF file. Please check the file and try again.',
  401: 'That password is incorrect. Please double-check and try again. Note: passwords are case-sensitive.',
  413: 'File too large. Maximum allowed size is 5 MB.',
  415: 'Something went wrong processing this file. This can happen with very heavily encrypted PDFs. Try a different file or check your password.',
  500: 'Something went wrong processing this file. This can happen with very heavily encrypted PDFs. Try a different file or check your password.',
};

export type PickedFile = {
  uri: string;
  name: string;
  size: number;
  mimeType: string;
};

export type UnlockResult = {
  data: ArrayBuffer;
  filename: string;
  originalSize: number;
  unlockedSize: number;
  alreadyUnlocked: boolean;
};

function ensureApiBase(): string {
  if (!API_BASE) {
    throw new Error('Backend URL is not configured. Set EXPO_PUBLIC_BACKEND_URL in your environment.');
  }
  return API_BASE;
}

function buildFormFile(file: PickedFile): { uri: string; name: string; type: string } {
  return {
    uri: file.uri,
    name: file.name,
    type: file.mimeType || 'application/pdf',
  };
}

export async function verifyPdfLock(file: PickedFile): Promise<'locked' | 'unlocked' | 'error'> {
  try {
    const form = new FormData();
    form.append('file', buildFormFile(file) as unknown as Blob);
    const res = await fetch(`${ensureApiBase()}/verify-locked-pdf`, {
      method: 'POST',
      body: form,
    });
    if (!res.ok) return 'error';
    try {
      const data = await res.json();
      if (data?.is_locked === false) return 'unlocked';
      return 'locked';
    } catch {
      return 'locked';
    }
  } catch {
    return 'error';
  }
}

export async function unlockPdf(
  file: PickedFile,
  password: string,
  signal?: AbortSignal,
): Promise<UnlockResult> {
  const form = new FormData();
  form.append('file', buildFormFile(file) as unknown as Blob);
  form.append('password', password);

  const res = await fetch(`${ensureApiBase()}/unlock-pdf`, {
    method: 'POST',
    body: form,
    signal,
  });

  if (!res.ok) {
    let detail = STATUS_MESSAGES[res.status] || STATUS_MESSAGES[500];
    try {
      const json = await res.json();
      if (json?.detail) detail = json.detail;
    } catch {
      /* body already consumed */
    }
    const error = new Error(detail) as Error & { status?: number };
    error.status = res.status;
    throw error;
  }

  const data = await res.arrayBuffer();
  const headerName = res.headers.get('X-Unlocked-Filename');
  const originalSize = parseInt(res.headers.get('X-Original-Size') || '0', 10) || file.size;
  const unlockedSize = parseInt(res.headers.get('X-Unlocked-Size') || '0', 10) || data.byteLength;
  const alreadyUnlocked = res.headers.get('X-Already-Unlocked') === 'true';
  const outName = headerName || file.name.replace(/\.pdf$/i, '_unlocked.pdf');

  return { data, filename: outName, originalSize, unlockedSize, alreadyUnlocked };
}
