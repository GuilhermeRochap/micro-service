const express = require('express');
const cors = require('cors');

const app = express()
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json())

// Dados Mock
let users = [
  { id: 1, name: 'Guilherme Rocha', email: 'guirpessanha@email.com' },
  { id: 2, name: 'Fulano de tal', email: 'fulano@email.com' },
  { id: 3, name: 'Beltrano de souza', email: 'beltrano@email.com' }
];

// Rotas
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    data: users,
    total: users.length
  });
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Usuario não encontrado'
    });
  }
  
  res.json({
    success: true,
    data: user
  });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'nome e e-mail são necessarios'
    });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  
  users.push(newUser);
  
  res.status(201).json({
    success: true,
    data: newUser
  });
});

// Health Check
app.get('/health', (req, res) => {
  res.json({ 
    service: 'Users Service',
    status: 'Rodando',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Serviço de Usuarios funcionado na porta ${PORT}`);
});