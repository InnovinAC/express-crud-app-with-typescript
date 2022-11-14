- PORT is 9000
run ```npm install``` to install all node dependencies.
run ```nodemon app.ts``` to start server

# Browser Documentation
-  Visit 'localhost:9000/users'


# Api Documentation
- [GET] /users - Returns a list of all users
- [GET] /users/{id} - Returns a particular user's details
- [PATCH] /users/{id} - Updates user details(You would need to pass {name} and {role} parameters in request payload).

- [DELETE] /users/{id} - Delete a particular user.
- [POST] /users/new - Create new user(You would need to pass {name} and {role} parameters in request payload).
