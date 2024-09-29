const jsonServer = require('json-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret';

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom route for signup
server.post('/signup', (req, res) => {
	const { username, password } = req.body;

	const db = router.db; // Lowdb instance
	const userExists = db.get('users').find({ username }).value();

	if (userExists) {
		return res.status(400).json({ error: 'User already exists' });
	}

	// Hash the password
	const hashedPassword = bcrypt.hashSync(password, 10);

	// Create a new user and store in db.json
	const newUser = { id: Date.now(), username, password: hashedPassword };
	db.get('users').push(newUser).write();

	// Generate a JWT token
	const token = jwt.sign({ id: newUser.id, username: newUser.username }, JWT_SECRET, { expiresIn: '10h' });
	db.get('tokens').push(token).write();

	res.status(201).json({ token });
});

// Custom route for login
server.post('/login', (req, res) => {
	const { username, password } = req.body;

	const db = router.db; // Lowdb instance
	const user = db.get('users').find({ username }).value();

	if (!user) {
		return res.status(400).json({ error: 'Invalid credentials' });
	}

	// Compare password
	const isPasswordValid = bcrypt.compareSync(password, user.password);
	if (!isPasswordValid) {
		return res.status(400).json({ error: 'Invalid credentials' });
	}

	// Generate a JWT token
	const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '10h' });
	db.get('tokens').push(token).write();
	res.status(200).json({ token });
});

// Use default json-server router
server.use(router);

// Start the server on port 3000
server.listen(3000, () => {
	console.log('JSON Server is running at 3000');
});
