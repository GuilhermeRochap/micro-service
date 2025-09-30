const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Dados Mock
let products = [
  { id: 1, name: 'Notebook', price: 1999.99, category: 'Eletrônicos' },
  { id: 2, name: 'Celular Smartphone', price: 1499.99, category: 'Eletrônicos' },
  { id: 3, name: 'Fones de ouvido Bluetooth', price: 299.99, category: 'Áudio' }
];

// Rotas
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    data: products,
    total: products.length
  });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Produto não encontrado'
    });
  }
  
  res.json({
    success: true,
    data: product
  });
});

app.post('/api/products', (req, res) => {
  const { name, price, category } = req.body;
  
  if (!name || !price || !category) {
    return res.status(400).json({
      success: false,
      message: 'Nome, preço e categoria faltando'
    });
  }
  
  const newProduct = {
    id: products.length + 1,
    name,
    price: parseFloat(price),
    category
  };
  
  products.push(newProduct);
  
  res.status(201).json({
    success: true,
    data: newProduct
  });
});

// Health Check
app.get('/health', (req, res) => {
  res.json({ 
    service: 'Serviço de produtos',
    status: 'Rodando',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Serviço de produtos rodando na porta: ${PORT}`);
});