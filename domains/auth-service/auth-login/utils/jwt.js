const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'changeme';

function generateToken(payload) {
    return jwt.sign(payload, secret, { 
        expiresIn: '1h'
    });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error('Token verification failed:', error.message);
        throw new Error('Invalid token');
    }
}

module.exports = {
    generateToken,
    verifyToken
};