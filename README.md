# LAK-Goods-Transport-Application

## Frontend Setup

Requires:

- [Expo](https://docs.expo.dev/get-started/installation/)

Using a terminal, cd to the LAKMobile directory, install packages, and start the frontend.

```
cd LAKMobile
npm install
npm start
```
Hello there
The app will be live at http://localhost:19002.

NOTE: When developing locally, you have to tell the Android emulator to map the backend localhost port to a port on the emulator. Otherwise it won't be able to find localhost:3000. Steps are as follows:

`npm run dev` in /backend

`npm start` in /LAKMobile

Launch Android emulator

`adb reverse tcp:3000 tcp:3000`

Now requests to localhost:3000 will go through to your machine

You can update the start script in package.json to be "expo start && adb reverse tcp:3000 tcp:3000" so you don't have to always type that

## Backend

Please checkout the backend guide at [backend/README.md](./backend/README.md)
