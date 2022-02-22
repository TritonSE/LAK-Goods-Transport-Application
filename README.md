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

The app will be live at http://localhost:19002.

## Backend setup

Required:
- [NodeJS](https://nodejs.org/en/download/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

Recommended:
- [MongoDB Compass](https://www.mongodb.com/products/compass) - To view and work directly with your database
- [Postman](https://www.postman.com/) 
    - Can use it to test your API endpoints manually. 
    - [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/18831621-c8abd2e1-57b9-47df-9e51-2e2c76d4a031?action=collection%2Ffork&collection-url=entityId%3D18831621-c8abd2e1-57b9-47df-9e51-2e2c76d4a031%26entityType%3Dcollection%26workspaceId%3Daf8d3bf7-ac26-4763-8491-bfd7d6f04ae9)
    - Please reach out to Aman if you want edit access to the postman collection

To get started use a terminal, cd into the backend directory, install packages
```
cd backend
npm install
```

Next, you can start the server in one of the two ways
1. Running live development server: `npm run dev` (Recommended)
2. Start the server without live refresh: `npm start`

Location at which server will be hosted will be displayed on terminal. By default, it will be live at http://localhost:3000.

We are using a mongoDB database named "LAK" hosted on MongoDB Atlas. Please ping Assaf to get yourself added to the database so that you can start working on the backend. 

Here is the backend repo structure

```bash
├── README.md
├── models/* (DB models to interact with the database)
├── services/* (Methods that utilizes models to perform operations on DB. Logic of the backend )
├── routes/* (Exposes the various services to the clients using endpoints)
├── tests/* (Please add tests for your routes here)
└── index.js (Main script to run the server and use routes)
```

