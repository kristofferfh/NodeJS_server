# Assignment: NodeJS server
A server written in javascript using nodejs, express and mongoDB to manage and deliver webpages and handle users with a database.


Requirments:
* [NodeJS](https://nodejs.org/en)
* [MongoDB (local or cloud)](https://www.mongodb.com/)



To test this server clone repo to folder, remember to create an .env file in root containing
```
ACCES_TOKEN_SECRET = *INT64*
REFRESH_TOKEN_SECRET = *INT64*
DATABASE_URI = *MONGODB_URI*
```
then run the command `npm install` in the root folder

## Running the server
You can either run the server with `npm start` or `npm run dev` if you want to use a demon