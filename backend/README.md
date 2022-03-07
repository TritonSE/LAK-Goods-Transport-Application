# Setup

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

# Overview 

We are using a mongoDB database named "LAK" hosted on MongoDB Atlas. Please ping Assaf to get yourself added to the database so that you can start working on the backend. 

Our backend is structured into two layers - 
1. Services layer - Which performs the logic of all requests (interacts with the DB)
2. Routes layer - Which uses the appropriate service and performs a requests (interacts with the client)

Here is the backend repo structure

```bash
├── README.md
├── models/* (DB models to interact with the database)
├── services/* (Methods that utilizes models to perform operations on DB. Logic of the backend )
├── routes/* (Exposes the various services to the clients using endpoints)
├── tests/* (Please add tests for your routes here)
└── index.js (Main script to run the server and use routes)
```

# Error handling

Error handling is especially important in backend programming because you cannot let the server exit because of an unhandled exception. Therefore, our error handling uses ES6 classes to classify between different types of errors (mainly client facing and internal errors)

**Errors**
- Client facing errors
    - Validation Errors (errors detected while validating user requests)
    - Service Errors (errors detected while processing requests, eg. perimssion denied)
- Internal Errors (not relevant to users)

Please look at [errors.js](./errors.js) to see how ES6 classes are used to classify all these errors. 

For any errors, the following are the attributes required:
- Error Code: Unique error identification for a particular type (For internal identification only )
- Status Code: Status sent in the response to the client
- message: Message to be sent to the client if this error occurs

Inspired from Go lang, our error class is designed to allow addition of context which could be important especially to deal with internal errors. You can use `addContext(error | string)` to add context to an error which will be displayed internally for debugging. 

For example:
`throw InternalError.DOCUMENT_UPLOAD_ERROR.addContext(e.stack)`
This throws an internal error of type `DOCUMENT_UPLOAD_ERROR` with the `e` stack added for context.

**Error display**
Messages for all client facing errors should be sent to user as response in the format:
```json
{
    "message" : "<YOUR MESSAGE GOES HERE>",
    "error": true
}
```
Using the examples in [errors.js](./errors.js), you can see how to create new errors that can be used in your code. An error should be created appropriately derving from the base error class. Such errors can be thrown anywhere in the backend synchronously as the handler middleware at the end will catch all errors and display it to client (as response) or to server's logs (for internal errors).

Don't hesitate to ask if you have any questions!

# Logging

We don't have proper logging setup yet, but the current practice is to log each service initation using `console.debug` and log each route initiation using `console.info`. All the logs will be live on the shell running the server. 

In addition, the internal errors mentioned above will also be logged here with their context (if any) so be on the lookout for that in case an internal error occurs.