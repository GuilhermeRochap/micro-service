const express =require('express');
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')

const app = express()

const PORT = 3000;

app.use(cors());
app.use(express.json());

const services = {
    users: 'http://localhost:3001',
    products: 'http://localhost:3002',
    orders: 'http://localhost:3003',
};

// Proxy para usuarios
app.use('/api/users', createProxyMiddleware({
    target: services.users,
    changeOrigin: true,
    pathRewrite: {
        '^/api/users' : '/api'
    }
}));

// Proxy para produtos
app.use('/api/products', createProxyMiddleware({
    target: services.products,
    changeOrigin: true,
    pathRewrite: {
        '^/api/products' : '/api'
    }
}));

// Proxy para ordens

app.use('/api/orders', createProxyMiddleware({
    target: services.orders,
    changeOrigin: true,
    pathRewrite: {
        '^/api/orders' : '/api'
    }
}));

//  Um health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Gateway rodando',
    timestamp: new Date().toISOString()
  });
});

// Rota padrão
app.get('/', (req, res) => {
  res.json({
    message: 'API Gateway - Microservices',
    endpoints: {
      users: '/api/users',
      products: '/api/products',
      orders: '/api/orders'
    }
  });
});

app.listen(PORT, () => {
  console.log(`GATEWAY RODANDO NA PORTA :${PORT}`);
});