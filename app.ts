import express, { Express, Request, Response } from 'express';

const app = express();
const path = require('path');
const methodOverride = require('method-override');



// Sample initial users data
var data: { id: number, role: string, name: string }[] = [
   {
      id: 1,
      role: 'CEO',
      name: 'John Doe'
   },

   {
      id: 2,
      role: 'CTO',
      name: 'Jane Doe'
   },
   {
      id: 3,
      role: 'Business Analyst',
      name: 'Jonathan Doe'
   },

];

// settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// usages
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// start listening
app.listen(9000, () => {
   console.log('NOW LISTENING');
})


/********************************************** 
    
      CRUD ROUTES FOR API(POSTMAN PREFERABLE)
   
***********************************************/

// get all users
app.get('/api/users', (req, res) => {
   let users = data;
   res.json({ users });
   console.log('Sent all User data');
})


// create new user
/* Add parameters {name} and {role} to the request payload */
app.post('/api/users/new', (req, res) => {
   const { id: lastId } = data[data.length - 1]; //
   const id = lastId + 1; // new ID
   const { name, role } = req.body;

   data.push({
      id: id,
      role: role,
      name: name
   })
   res.send("User added successfully")
})



// get a particular user's details
app.get('/api/users/:id', (req, res) => {
   const { id } = req.params;
   const user = data.find((elem) => elem.id === parseInt(id));
   if (!user) {
      res.status(400).send(`Sorry. No user with ID: ${id} was found.`);
   }

   res.json({ user });

})


// delete particular user

app.delete('/api/users/:id', (req, res) => {
   const { id } = req.params;
   if (!data.find((elem) => elem.id === parseInt(id))) {

      res.status(400).send(`Sorry. No user with ID: ${id} was found.`);
   }
   data = data.filter((person) => person.id !== parseInt(id));
   res.send(`User with id ${id} has been deleted successfully`);
})


// update particular user
/* Add parameters {name} and {role} to the request payload */
app.patch('/api/users/:id', (req, res) => {
   const { id } = req.params;
   if (!data.find((elem) => elem.id === parseInt(id))) {
      res.status(400).send(`Sorry. No user with ID: ${id} was found.`);
   }
   const { name, role } = req.body;
   let person: any = data.find((person) => person.id === parseInt(id));
   person.name = name;
   person.role = role;
   res.send(`User with id ${id} has been updated successfully`);
})




/*****************************
    
   CRUD RIUTES FOR BROWSER

*****************************/

// Homepage(Show all users)
app.get('/users', (req, res) => {

   res.render('show', {
      title: 'Homepage',
      data: data,
   });


});

// Create New User
app.get('/users/new', (req, res) => {
   res.render('new', { title: 'Create New User' });
})

// post request to actually do the updating
app.post('/users/new', (req, res) => {
   const { id: lastId } = data[data.length - 1]; // get last ID
   const id = lastId + 1; // new ID
   const { name, role } = req.body;

   data.push({
      id: id,
      role: role,
      name: name
   })
   res.redirect('/users');

})



// Show a particular user's details
app.get('/users/:id', (req, res) => {
   const id = req.params.id;

   const person = data.find((elem) => elem.id === parseInt(id))
   if (person) {
      res.render('edit', { person: person });
   }

   else {
      res.send('User Not found');
   }

})



// Update user details
app.patch('/users/:id', (req, res) => {
   const { id } = req.params;
   const { name, role } = req.body;
   let person: any = data.find((elem) => elem.id === parseInt(id))
   person.name = name;
   person.role = role;

   res.redirect('/users');

});


// Delete User Details
app.delete('/users/:id', (req, res) => {
   const { id } = req.params;
   data = data.filter((person) =>
      person.id !== parseInt(id));
   res.redirect('/users');

});
