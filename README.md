## A simple crud app built with Node.js, Express.js, EJS and TypeScript.
- PORT is 9000
- run ```npm install``` to install all node dependencies.
- run ```nodemon app.ts``` to start server

# Browser Documentation
-  Visit **_localhost:9000/users_**


# Api Documentation
- **[GET]** /api/users - Returns a list of all users
- **[GET]** /api/users/{id} - Returns a particular user's details
- **[PATCH]** /api/users/{id} - Updates user details(You would need to pass {name} and {role} parameters in request payload).

- **[DELETE]** /api/users/{id} - Delete a particular user.
- **[POST]** /api/users/new - Create new user(You would need to pass {name} and {role} parameters in request payload).
