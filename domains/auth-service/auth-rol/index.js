require('dotenv').config({ silent: true });
const express = require('express');
const cors = require('cors');
const { checkUserRole } = require('./controllers/rolController');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware de logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

app.use(cors());
app.use(express.json());

app.post('/check-role', async (req, res) => {
    console.log('\n=== Nueva petición /check-role ===');
    
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Token required' });
        }

        const token = authHeader.split(' ')[1];
        console.log('Token recibido:', token.substring(0, 20) + '...');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decodificado:', decoded);
        
        // Verificación adicional del payload
        if (!decoded.id) {
            return res.status(401).json({ error: 'Token missing user ID' });
        }
        
        const rol = await checkUserRole(decoded.id);
        return res.json({ rol });
        
    } catch (error) {
        console.error('Error en /check-role:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        
        if (error.message === 'User not found') {
            return res.status(404).json({ error: error.message });
        }
        
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.use((req, res) => {
    console.error(`[${new Date().toISOString()}] Route not found: ${req.method} ${req.path}`);
    res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
    console.error('Unhandled error:', {
        message: err.message,
        stack: err.stack,
        url: req.originalUrl
    });
    res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5032;
app.listen(PORT, () => {
    console.log(`\n🔒 Auth-rol service running on port ${PORT}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});