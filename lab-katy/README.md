##Installation
1. download this repo to your machine. cd into the directory
2. run the command </npm i> in your terminal to install all the necessary dependencies for this application
3. run the command </npm run start> to being your server connection

##Endpoints
GET requests: 
//with a proper weed id
localhost:3000/api/weed/:weedId

POST requests:
//with a valid strain and type
localhost:3000/api/weed

DELETE requests:
//delete weed with valid weed id
localhost:3000/api/weed/:weedId