# LAK-Goods-Transport-Application

## Setup

Requires:

- [nvm](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/), npm, and Node.js (version 16.13.2 is preferred)
  - It's easier to first install nvm, then use it to install the correct npm and Node versions.
- [Android Studio and Expo](https://docs.expo.dev/workflow/android-studio-emulator/)

Additionally, you'll need to add the following config files:

- ./LAKMobile/.env (For development purposes, this will have the same contents as [./LAKMobile/.env.example](./LAKMobile/.env.example))
- ./LAKMobile/firebase-config.json (the Google Firebase credentials required for user authentication)

NOTE: When developing locally, you have to tell the Android emulator to map the backend localhost port to a port on the emulator. Otherwise it won't be able to find localhost:3000. This is already bundled into the `npm start` command in LAKMobile, so to ensure
that this works, run `adb reverse tcp:3000 tcp:3000` to confirm that `adb` is recognized on your terminal.

### Running the Development Environment

- Backend (This should be running first before LAKMobile or AdminPortal)

```bash
cd backend
npm install
npm run dev
```

- LAKMobile (This is the mobile application written using React Native)

```bash
# First, open the Android emulator through Android Studio.
# The following commands should be run in a separate terminal window from the backend.
cd LAKMobile
npm install
npm start
# Finally, press the 'a' key to open the app on the emulator.
```

- AdminPortal (This is an administrative portal webpage written using Next.js)

```bash
# Again, this should be run in a separate terminal window from the backend.
cd AdminPortal
npm install
npm run dev
```

## Linting

Linting can be run in the root directory or in any of the three specific directories (backend, LAKMobile, AdminPortal)

To check the source code for linting errors, run `npm run lint-check`

To check the code for errors and fix auto-fixable problems, run `npm run lint-fix`

## Backend

Please checkout the backend guide at [backend/README.md](./backend/README.md)
