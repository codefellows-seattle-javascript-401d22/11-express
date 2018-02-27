## Express Server Routes

The purpose of this app is to impliment server routes using Express through Node.js. The app utilizes express, bluebird, body-parser, debug, http-errors, morgan, uuid-v4, and also has eslint, jest, and superagent installed as developer dependencies.

The app creates and stores items in objects based on their schema, and writes them to files on your file system. For example, this app specifically has instances of plant objects. Each plant object must be instantiated with 3 properties in order to run (species, color, flower).

In order to use this app, the server must be started up. In order to utilize the debug middleware, you must run the server from the terminal using the command ```npm run start```.

Once the server has started up, you should see the message "server up: ${PORT}" with the port that your server is running on. 

### POST /api/plant/

To make a POST request, in the terminal type:
```http POST :3000/api/plant species={species} color={color} flower={flower}```

with the flower being a true or false value. 

The ID will auto-generate and be attached to the object for you. If a valid request is made, the server will respond with a __200__ and the response body.
- If an invalid request body is provided, the server will respond with a __400__ or 'bad request' error. 

### GET /api/plant/id?={id}

To make a GET request for a specific plant, in the terminal type:

``` http :3000/api/plant id={id} ``` or ```http:3000/api/plant/id=?{id}```

with the specific ID for the plant you would like to retrieve. When the plant has been retrieved, the server will respond with a status of __200__ and the response body.
- If no ID is provided, the server will respond with a __400__ or 'bad request' error.
- If an invalid ID is provided, the server will respond with a __404__ or 'not found' error.

### DELETE /api/plant/id?={id}

To make a DELETE request for a specific plant, in the terminal type:
``` http :3000/api/plant id={id}``` or ```http:3000/api/plant/id=?{id}```

with the specific ID of the plant you would like to delete. When the plant is deleted, the server will respond with a __204__ status code, meaning the plant has been successfully deleted.
- If an invalid ID is provided, the server will respond with a __400__ or 'bad request' error.