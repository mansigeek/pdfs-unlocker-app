import * as DocumentPicker from 'expo-document-picker';
import {
  ArrowClockwise,
  CheckCircle,
  CircleNotch,
  Eye,
  EyeSlash,
  FilePdf,
  Info,
  LockKey,
  ShieldCheck,
  UploadSimple,
  Warning,
  X,
} from 'phosphor-react-native';
import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { SectionHeader } from '@/components/pdf-unlocker/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Input, Label } from '@/components/ui/Input';
import { MAX_BYTES, MAX_MB } from '@/constants/config';
import { radius, spacing } from '@/constants/theme';
import { useAppTheme } from '@/contexts/theme-context';
import { useToast } from '@/contexts/toast-context';
import { saveAndSharePdf } from '@/lib/file-save';
import { formatSize, wait } from '@/lib/format';
import { PickedFile, unlockPdf, verifyPdfLock } from '@/lib/pdf-api';

const STAGES = [
  {
    id: 'analyzing',
    label: 'Analyzing PDF security',
    sub: 'Inspecting encryption type and metadata',
    duration: 1100,
  },
  {
    id: 'unlocking',
    label: 'Removing password protection',
    sub: 'Decrypting your document in memory',
    duration: 1300,
  },
  {
    id: 'finalizing',
    label: 'Finalizing your document',
    sub: 'Rebuilding the PDF without restrictions',
    duration: 900,
  },
  {
    id: 'ready',
    label: 'Ready to download',
    sub: 'Verifying integrity and packaging',
    duration: 500,
  },
];

type UnlockResultState = {
  data: ArrayBuffer;
  filename: string;
  originalSize: number;
  unlockedSize: number;
  alreadyUnlocked: boolean;
};

export function ToolSection() {
  const { theme } = useAppTheme();
  const { showToast } = useToast();

  const [file, setFile] = useState<PickedFile | null>(null);
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'uploading' | string>('idle');
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [result, setResult] = useState<UnlockResultState | null>(null);
  const [lockStatus, setLockStatus] = useState<
    null | 'checking' | 'locked' | 'unlocked' | 'error'
  >(null);
  const [toolStep, setToolStep] = useState<'upload' | 'transition' | 'password'>('upload');
  const [transitionProgress, setTransitionProgress] = useState(0);

  const rampRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitionRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearRamp = () => {
    if (rampRef.current) {
      clearInterval(rampRef.current);
      rampRef.current = null;
    }
  };

  const clearTransition = () => {
    if (transitionRef.current) {
      clearInterval(transitionRef.current);
      transitionRef.current = null;
    }
  };

  const checkLock = async (f: PickedFile) => {
    setLockStatus('checking');
    const status = await verifyPdfLock(f);
    setLockStatus(status);
    if (status === 'unlocked') {
      showToast(
        'This PDF is not password-protected. No unlocking needed — you can open it directly.',
        'info',
      );
    }
  };

  const validateAndSet = async (f: PickedFile) => {
    if (!f.name.toLowerCase().endsWith('.pdf')) {
      showToast('Only PDF files are supported.', 'error');
      return;
    }
    if (f.size > MAX_BYTES) {
      showToast(`File exceeds ${MAX_MB} MB limit.`, 'error');
      return;
    }
    setFile(f);
    setToolStep('upload');
    await checkLock(f);
  };

  const pickFile = async () => {
    try {
      const picked = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
        multiple: false,
      });
      if (picked.canceled || !picked.assets?.[0]) return;
      const asset = picked.assets[0];
      await validateAndSet({
        uri: asset.uri,
        name: asset.name,
        size: asset.size ?? 0,
        mimeType: asset.mimeType ?? 'application/pdf',
      });
    } catch {
      showToast('Could not open file picker.', 'error');
    }
  };

  const startPasswordStep = async () => {
    setToolStep('transition');
    setTransitionProgress(0);
    const duration = 4000;
    const startTime = Date.now();
    clearTransition();
    transitionRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setTransitionProgress(pct);
      if (pct >= 100) clearTransition();
    }, 40);
    await wait(duration);
    clearTransition();
    setToolStep('password');
  };

  const reset = () => {
    setFile(null);
    setPassword('');
    setShowPw(false);
    setPasswordError('');
    setProgress(0);
    setPhase('idle');
    setStageIndex(0);
    setResult(null);
    setProcessing(false);
    setLockStatus(null);
    setToolStep('upload');
    setTransitionProgress(0);
    clearRamp();
    clearTransition();
  };

  const handleUnlock = async () => {
    if (!file) return;
    if (lockStatus === 'unlocked') {
      showToast('This PDF is not password-protected. No unlocking needed.', 'info');
      return;
    }
    if (!password.trim()) {
      setPasswordError('Password is required to unlock this PDF.');
      showToast('Please enter the PDF password.', 'error');
      return;
    }
    setPasswordError('');
    setProcessing(true);
    setPhase('uploading');
    setProgress(0);
    setStageIndex(0);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000);

    clearRamp();
    rampRef.current = setInterval(() => {
      setProgress((p) => (p < 92 ? p + 4 : p));
    }, 120);

    try {
      const unlockResult = await unlockPdf(file, password, controller.signal);
      clearRamp();
      setProgress(100);
      await wait(300);

      for (let i = 0; i < STAGES.length; i++) {
        setStageIndex(i);
        setPhase(STAGES[i].id);
        // eslint-disable-next-line no-await-in-loop
        await wait(STAGES[i].duration);
      }

      setResult(unlockResult);
      if (unlockResult.alreadyUnlocked) {
        showToast(
          'Good news — this PDF has no password protection. You can open it directly without unlocking.',
          'success',
        );
      } else {
        showToast('PDF unlocked successfully!', 'success');
      }
    } catch (err) {
      clearRamp();
      let message =
        'Something went wrong processing this file. This can happen with very heavily encrypted PDFs. Try a different file or check your password.';
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          message = 'Request timed out. Please try again or use a smaller file.';
        } else if (err.message) {
          message = err.message;
        }
      }
      showToast(message, 'error');
      setProgress(0);
    } finally {
      clearTimeout(timeoutId);
      setProcessing(false);
      setPhase('idle');
      setStageIndex(0);
    }
  };

  const handleDownload = async () => {
    if (!result) return;
    try {
      await saveAndSharePdf(result.data, result.filename);
    } catch {
      showToast('Could not save the PDF. Please try again.', 'error');
    }
  };

  const renderProcessing = () => {
    const isTransition = toolStep === 'transition';
    const stage = STAGES[stageIndex];
    const pct = isTransition
      ? transitionProgress
      : phase === 'uploading'
        ? progress
        : Math.round(((stageIndex + 1) / (STAGES.length + 1)) * 100 + 16);

    return (
      <View testID="processing-state" style={styles.processing}>
        <View style={styles.processingIconWrap}>
          <View style={[styles.processingRing, { borderColor: `${theme.primary}33` }]} />
          <View style={[styles.processingIcon, { backgroundColor: `${theme.primary}1A` }]}>
            {isTransition || phase === 'uploading' ? (
              phase === 'uploading' ? (
                <UploadSimple size={28} color={theme.primary} weight="duotone" />
              ) : (
                <FilePdf size={28} color={theme.primary} weight="duotone" />
              )
            ) : (
              <LockKey size={28} color={theme.primary} weight="duotone" />
            )}
          </View>
        </View>

        <Text testID="processing-stage-label" style={[styles.processingTitle, { color: theme.foreground }]}>
          {isTransition
            ? 'Analyzing PDF Security'
            : phase === 'uploading'
              ? 'Uploading your PDF'
              : stage?.label || 'Processing'}
        </Text>
        <Text style={[styles.processingSub, { color: theme.mutedForeground }]}>
          {isTransition
            ? 'Inspecting encryption type and document metadata'
            : phase === 'uploading'
              ? 'Securely transferring to our in-memory processor'
              : stage?.sub || ''}
        </Text>

        <View style={styles.progressWrap}>
          <View style={styles.progressLabels}>
            <Text style={[styles.progressLabel, { color: theme.mutedForeground }]}>
              {isTransition
                ? 'Checking protection status...'
                : phase === 'uploading'
                  ? 'Step 1 of 5 · Uploading'
                  : `Step ${stageIndex + 2} of 5 · ${stage?.label}`}
            </Text>
            <Text testID="processing-progress-pct" style={[styles.progressLabel, { color: theme.mutedForeground }]}>
              {pct}%
            </Text>
          </View>
          <View style={[styles.progressTrack, { backgroundColor: theme.muted }]}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: theme.primary,
                  width: `${isTransition ? transitionProgress : phase === 'uploading' ? Math.max(progress * 0.2, 2) : 20 + ((stageIndex + 1) / STAGES.length) * 80}%`,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.secureNote}>
          <ShieldCheck size={14} color={theme.primary} weight="duotone" />
          <Text style={[styles.secureText, { color: theme.mutedForeground }]}>
            Processed in memory · No file is saved on our servers
          </Text>
        </View>
      </View>
    );
  };

  const renderSuccess = () => (
    <View testID="success-state" style={styles.success}>
      <View style={[styles.successIcon, { backgroundColor: `${theme.success}1A` }]}>
        <CheckCircle size={56} color={theme.success} weight="fill" />
      </View>
      <Text style={[styles.successTitle, { color: theme.foreground }]}>File Unlocked</Text>
      <Text style={[styles.successSub, { color: theme.mutedForeground }]}>
        Your PDF is ready. Download it now — we don't keep a copy.
      </Text>

      <Button testID="download-unlocked-button" onPress={handleDownload} style={styles.downloadBtn}>
        ↓ Download unlocked PDF
      </Button>

      {result && result.originalSize > 0 && result.unlockedSize > 0 ? (
        <Text testID="size-delta" style={[styles.sizeDelta, { color: theme.mutedForeground }]}>
          Original: {formatSize(result.originalSize)} → Unlocked: {formatSize(result.unlockedSize)}
        </Text>
      ) : null}

      <Pressable testID="unlock-another-link" onPress={reset} style={styles.resetLink}>
        <ArrowClockwise size={14} color={theme.primary} weight="bold" />
        <Text style={[styles.resetText, { color: theme.primary }]}>Unlock another file</Text>
      </Pressable>

      {result ? (
        <Text style={[styles.filename, { color: theme.mutedForeground }]} numberOfLines={1}>
          {result.filename}
        </Text>
      ) : null}
    </View>
  );

  const renderTool = () => (
    <View style={styles.toolBody}>
      <View
        testID="trust-bar"
        style={[styles.trustBar, { borderColor: theme.border, backgroundColor: `${theme.muted}66` }]}
      >
        <View style={styles.trustItem}>
          <LockKey size={14} color={theme.primary} weight="duotone" />
          <Text style={[styles.trustText, { color: theme.foreground }]}>Your file never leaves your device</Text>
        </View>
        <View style={[styles.trustDivider, { borderColor: theme.border }]} />
        <View style={styles.trustItem}>
          <ShieldCheck size={14} color={theme.primary} weight="duotone" />
          <Text style={[styles.trustText, { color: theme.foreground }]}>5MB file size limit</Text>
        </View>
        <View style={[styles.trustDivider, { borderColor: theme.border }]} />
        <View style={styles.trustItem}>
          <CheckCircle size={14} color={theme.primary} weight="duotone" />
          <Text style={[styles.trustText, { color: theme.foreground }]}>No watermark · No signup</Text>
        </View>
      </View>

      <Pressable
        testID="upload-dropzone"
        onPress={pickFile}
        style={[
          styles.dropzone,
          {
            borderColor: theme.border,
            backgroundColor: theme.background,
          },
        ]}
      >
        {!file ? (
          <>
            <View style={[styles.dropIcon, { backgroundColor: `${theme.primary}1A` }]}>
              <UploadSimple size={26} color={theme.primary} weight="bold" />
            </View>
            <Text style={[styles.dropTitle, { color: theme.foreground }]}>
              Tap to select your locked PDF
            </Text>
            <Text style={[styles.dropSub, { color: theme.mutedForeground }]}>
              Choose a PDF from your device
            </Text>
            <View style={[styles.dropHint, { borderColor: theme.border, backgroundColor: theme.muted }]}>
              <Info size={12} color={theme.mutedForeground} weight="bold" />
              <Text style={[styles.dropHintText, { color: theme.mutedForeground }]}>
                Max file size {MAX_MB} MB · PDF only
              </Text>
            </View>
          </>
        ) : (
          <View style={[styles.fileRow, { borderColor: theme.border, backgroundColor: theme.card }]}>
            <View style={styles.fileInfo}>
              <View style={[styles.fileIcon, { backgroundColor: `${theme.primary}1A` }]}>
                <FilePdf size={22} color={theme.primary} weight="duotone" />
              </View>
              <View style={styles.fileMeta}>
                <Text testID="selected-file-name" style={[styles.fileName, { color: theme.foreground }]} numberOfLines={1}>
                  {file.name}
                </Text>
                <Text style={[styles.fileSize, { color: theme.mutedForeground }]}>
                  {formatSize(file.size)} / {MAX_MB} MB max
                </Text>
                <View style={[styles.fileBar, { backgroundColor: theme.muted }]}>
                  <View
                    style={[
                      styles.fileBarFill,
                      {
                        backgroundColor: theme.primary,
                        width: `${Math.min(100, (file.size / MAX_BYTES) * 100)}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
            <Pressable
              testID="remove-file-btn"
              onPress={(e) => {
                e.stopPropagation?.();
                setFile(null);
                setLockStatus(null);
              }}
              style={[styles.removeBtn, { borderColor: theme.border }]}
              accessibilityLabel="Remove file"
            >
              <X size={16} color={theme.mutedForeground} weight="bold" />
            </Pressable>
          </View>
        )}

        {file && lockStatus ? (
          <View style={styles.lockBadgeWrap}>
            {lockStatus === 'checking' ? (
              <View style={[styles.badge, { borderColor: theme.border, backgroundColor: `${theme.muted}80` }]}>
                <CircleNotch size={12} color={theme.mutedForeground} weight="bold" />
                <Text style={[styles.badgeText, { color: theme.mutedForeground }]}>Verifying PDF protection…</Text>
              </View>
            ) : null}
            {lockStatus === 'locked' ? (
              <View style={[styles.badge, { borderColor: `${theme.primary}4D`, backgroundColor: `${theme.primary}0D` }]}>
                <LockKey size={12} color={theme.primary} weight="fill" />
                <Text style={[styles.badgeText, { color: theme.primary, fontWeight: '700' }]}>
                  Password-protected · Ready to unlock
                </Text>
              </View>
            ) : null}
            {lockStatus === 'unlocked' ? (
              <View style={[styles.badge, { borderColor: `${theme.success}4D`, backgroundColor: `${theme.success}0D` }]}>
                <CheckCircle size={12} color={theme.success} weight="fill" />
                <Text style={[styles.badgeText, { color: theme.success, fontWeight: '700' }]}>
                  Not locked · No unlocking needed
                </Text>
              </View>
            ) : null}
            {lockStatus === 'error' ? (
              <View style={[styles.badge, { borderColor: theme.border, backgroundColor: `${theme.muted}80` }]}>
                <Warning size={12} color={theme.mutedForeground} weight="fill" />
                <Text style={[styles.badgeText, { color: theme.mutedForeground }]}>
                  Could not verify · You can still try unlocking
                </Text>
              </View>
            ) : null}
          </View>
        ) : null}
      </Pressable>

      {file && toolStep === 'upload' ? (
        <View style={styles.unlockCta}>
          <Button
            testID="initial-unlock-button"
            onPress={startPasswordStep}
            disabled={lockStatus === 'unlocked' || lockStatus === 'checking'}
            style={styles.bigBtn}
          >
            🔓 Unlock PDF
          </Button>
          {lockStatus === 'unlocked' ? (
            <Text style={[styles.unlockedNote, { color: theme.success }]}>This PDF is already unlocked.</Text>
          ) : null}
        </View>
      ) : null}

      {toolStep === 'password' ? (
        <View style={styles.passwordBlock}>
          <Label>
            PDF Password <Text style={{ color: theme.destructive }}>*</Text>
          </Label>
          <View style={styles.passwordRow}>
            <View style={styles.passwordInputWrap}>
            <View style={styles.passwordIcon} pointerEvents="none">
              <LockKey
                size={16}
                color={passwordError ? theme.destructive : theme.mutedForeground}
                weight="bold"
              />
            </View>
              <Input
                testID="password-input"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) setPasswordError('');
                }}
                placeholder="Enter the PDF password"
                secureTextEntry={!showPw}
                autoFocus
                error={!!passwordError}
                style={styles.passwordInput}
                returnKeyType="go"
                onSubmitEditing={() => {
                  if (file && !processing && password.trim()) handleUnlock();
                }}
              />
              <Pressable
                testID="toggle-password-visibility"
                onPress={() => setShowPw((v) => !v)}
                style={styles.eyeBtn}
                accessibilityLabel="Toggle password visibility"
              >
                {showPw ? (
                  <EyeSlash size={16} color={theme.mutedForeground} weight="bold" />
                ) : (
                  <Eye size={16} color={theme.mutedForeground} weight="bold" />
                )}
              </Pressable>
            </View>
          </View>
          {passwordError ? (
            <Text testID="password-error" style={[styles.passwordError, { color: theme.destructive }]}>
              {passwordError}
            </Text>
          ) : null}
          <Button
            testID="unlock-submit-button"
            onPress={handleUnlock}
            disabled={!file || !password.trim() || processing || lockStatus === 'unlocked' || lockStatus === 'checking'}
            loading={processing}
            style={styles.submitBtn}
          >
            {processing ? 'Unlocking…' : '🔓 Unlock PDF'}
          </Button>
        </View>
      ) : null}

      <Text style={[styles.disclaimer, { color: theme.mutedForeground }]}>
        By uploading, you confirm you have the right to remove the password from this file.
      </Text>
    </View>
  );

  return (
    <View
      testID="tool-section"
      style={[styles.section, { borderBottomColor: theme.border, backgroundColor: `${theme.muted}4D` }]}
    >
      <SectionHeader
        eyebrow="The Tool"
        title="Unlock your PDF"
        description="Select a password-protected PDF, enter the password, and download the unlocked copy. Files are processed in memory and never saved to disk."
      />

      <View style={[styles.card, { borderColor: theme.border, backgroundColor: theme.card }]}>
        {result ? renderSuccess() : processing || toolStep === 'transition' ? renderProcessing() : renderTool()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xxl,
    borderBottomWidth: 1,
  },
  card: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  toolBody: {
    gap: spacing.lg,
  },
  trustBar: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.sm + 4,
    gap: spacing.sm,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: 4,
  },
  trustDivider: {
    borderTopWidth: 1,
  },
  trustText: {
    fontSize: 11,
    fontFamily: 'monospace',
    textAlign: 'center',
    flexShrink: 1,
  },
  dropzone: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
  },
  dropIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropTitle: {
    marginTop: spacing.md,
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
  },
  dropSub: {
    marginTop: 4,
    fontSize: 14,
    textAlign: 'center',
  },
  dropHint: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: 6,
  },
  dropHintText: {
    fontSize: 12,
  },
  fileRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.sm + 4,
    gap: spacing.sm,
  },
  fileInfo: {
    flex: 1,
    flexDirection: 'row',
    gap: spacing.sm + 4,
    alignItems: 'center',
  },
  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileMeta: {
    flex: 1,
    minWidth: 0,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '700',
  },
  fileSize: {
    fontSize: 12,
    marginTop: 2,
  },
  fileBar: {
    marginTop: 6,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  fileBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  removeBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockBadgeWrap: {
    marginTop: spacing.sm,
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 12,
  },
  unlockCta: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  bigBtn: {
    width: '100%',
    minHeight: 56,
  },
  unlockedNote: {
    fontSize: 14,
    fontWeight: '600',
  },
  passwordBlock: {
    gap: spacing.sm,
  },
  passwordRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  passwordInputWrap: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  passwordIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
    top: 16,
  },
  passwordInput: {
    paddingLeft: 36,
    paddingRight: 40,
  },
  eyeBtn: {
    position: 'absolute',
    right: 8,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordError: {
    fontSize: 12,
    fontWeight: '600',
  },
  submitBtn: {
    marginTop: spacing.sm,
    width: '100%',
  },
  disclaimer: {
    fontSize: 12,
    textAlign: 'center',
  },
  processing: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  processingIconWrap: {
    width: 112,
    height: 112,
    alignItems: 'center',
    justifyContent: 'center',
  },
  processingRing: {
    position: 'absolute',
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 1,
  },
  processingIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  processingTitle: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  processingSub: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
  progressWrap: {
    width: '100%',
    marginTop: spacing.sm,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  secureNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  secureText: {
    fontSize: 12,
  },
  success: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  successSub: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
  downloadBtn: {
    width: '100%',
    minHeight: 48,
    marginTop: spacing.sm,
  },
  sizeDelta: {
    fontSize: 12,
  },
  resetLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.sm,
  },
  resetText: {
    fontSize: 14,
    fontWeight: '600',
  },
  filename: {
    fontSize: 12,
    maxWidth: '100%',
    paddingHorizontal: spacing.md,
  },
});
