const { findById } = require('../models/userModel');

async function checkUserRole(userId) {
    try {
        console.log('Buscando usuario con ID:', userId);
        const user = await findById(userId);
        
        if (!user) {
            console.error('Usuario no encontrado con ID:', userId);
            throw new Error('User not found');
        }
        
        console.log('Usuario encontrado. Rol:', user.rol);
        return user.rol;
    } catch (error) {
        console.error('Error en checkUserRole:', error);
        throw error;
    }
}

module.exports = { checkUserRole }; // Cambiado a CommonJS