const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// PUT endpoint to update user profile
server.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  const user = router.db.get('users').find({ id }).value();

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Update user data
  user.username = username || user.username;
  user.email = email || user.email;
  user.password = password || user.password;

  router.db.write();

  res.status(200).json(user);
});

server.use(router);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
