const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');




const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'facerecognition'
  }
});

db.select('*').from('users').then(data => {
	console.log(data);
});

const app = express();

// app.use(express.urlencoded({extended: false}))
app.use(express.json());

const database = {
	users: [
	{
		id: '123',
		name: 'jon',
		email: 'jon@gmail.com',
		password: 'orange',
		entries: 0,
		joined: new Date()
	},
	{
		id: '124',
		name: 'mike',
		email: 'mike@gmail.com',
		password: 'apple',
		entries: 0,
		joined: new Date()
	}

	],
	login: [
	{
		id: '911',
		hash: '',
		email: 'john@gmail.com'

	}

	]
}

app.use(cors())

app.get('/', (req, res) => {
	res.send(database.users);

})


app.post('/signin', (req, res) => {
	bcrypt.compare("", '$2a$10$2cE1.WZrsXzOuLVPWZOVpOnJNJWpdGhIiCSerjWELrc6hwwSUHZsm'
, function(err, res) {
    console.log('first guess', res)
});
bcrypt.compare("veggies", '$2a$10$2cE1.WZrsXzOuLVPWZOVpOnJNJWpdGhIiCSerjWELrc6hwwSUHZsm'
, function(err, res) {
    console.log('seconds guess', res)
});
	if (req.body.email === database.users[0].email &&
	 req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	} else {
	res.json('wrong info mofo');
}
	
})

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	
	db('users')
		.returning('*')
		.insert({
		email: email,
		name: name,
		joined: new Date()
	}).then(user => {
		res.json(user[0]);
	})
		.catch(err => res.status(400).json('sorry unable to register'))
})

app.get('/profile/:id', (req, res) => {
	let found = false;
	const { id } = req.params;
	database.users.forEach(user => {
		if (user.id === id) {
			return res.json(user);
		} 
	})
	if (!found) {
		res.status(404).json('the fked up on id');
	}
})

app.put('/image', (req, res) => {
		let found = false;
	const { id } = req.body;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++
			return res.json(user.entries);
		} 
	})
	if (!found) {
		res.status(404).json('the fked up on id');
	}
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


app.listen(3001, ()=> {

	console.log('app is running on this shit');
})