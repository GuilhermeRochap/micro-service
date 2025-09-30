const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Dados Mock
let orders = [
  { 
    id: 1, 
    userId: 1, 
    products: [1, 2], 
    total: 3499.98,
    status: 'concluida',
    createdAt: new Date('2025-09-29')
  },
  { 
    id: 2, 
    userId: 2, 
    products: [3], 
    total: 1799.98,
    status: 'pendente',
    createdAt: new Date('2025-09-30')
  }
];

// Rotas
app.get('/api/orders', (req, res) => {
  res.json({
    success: true,
    data: orders,
    total: orders.length
  });
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'OC não encontrada'
    });
  }
  
  res.json({
    success: true,
    data: order
  });
});

app.post('/api/orders', (req, res) => {
  const { userId, products, total } = req.body;
  
  if (!userId || !products || !total) {
    return res.status(400).json({
      success: false,
      message: 'Id do usuario produto são necessarios'
    });
  }
  
  const newOrder = {
    id: orders.length + 1,
    userId: parseInt(userId),
    products,
    total: parseFloat(total),
    status: 'pendente',
    createdAt: new Date()
  };
  
  orders.push(newOrder);
  
  res.status(201).json({
    success: true,
    data: newOrder
  });
});

// Health Check
app.get('/health', (req, res) => {
  res.json({ 
    service: 'Orders Service',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Serviço de Ordem de Compra rodando na porta: ${PORT}`);
});