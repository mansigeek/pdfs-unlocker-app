# PDF Unlocker (React Native)

Mobile app port of the [PDF Unlocker](https://pdfsunlocker.com) web tool — unlock password-protected PDFs on iOS and Android.

## Features

- Full site parity: Hero, Tool, How it works, Features, About, Instructions, FAQ, Share, Footer
- PDF pick → verify lock → password → unlock → download/share
- Light / dark theme with safe-area support on all devices
- Privacy Policy & Terms of Use screens

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Set your backend URL in `.env`:

```
EXPO_PUBLIC_BACKEND_URL=https://your-backend.run.app
EXPO_PUBLIC_SITE_URL=https://pdfsunlocker.com
```

4. Start the app:

```bash
npx expo start
```

Then press `i` for iOS simulator or `a` for Android emulator, or scan the QR code with Expo Go.

## Production builds

```bash
npx expo prebuild
npx expo run:ios
npx expo run:android
```

For store releases, use EAS Build:

```bash
npx eas build --platform all
```

## Project structure

- `app/` — Expo Router screens (home, privacy, terms)
- `components/pdf-unlocker/` — UI sections matching the website
- `lib/pdf-api.ts` — Backend API (`verify-locked-pdf`, `unlock-pdf`)
- `constants/theme.ts` — Trust Blue design tokens from the web app
