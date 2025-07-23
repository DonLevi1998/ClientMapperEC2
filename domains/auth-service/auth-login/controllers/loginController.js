const userModel = require('../models/userModel');  
const { comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');
const axios = require('axios');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(userModel);
    try {
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }

        const user = await userModel.findByEmail(email); 
        if (!user) return res.status(404).json({ message: "Email doesn't exist" });

        const valid = await comparePassword(password, user.password);
        if (!valid) return res.status(401).json({ message: 'Invalid password' });

        const token = generateToken({ 
            id: user.idusers, 
            email: user.email 
        });
        
        const roleResponse = await axios.post('http://localhost:5032/check-role', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        res.json({
            token,
            user: {
                id: user.idusers,
                email: user.email,
                rol: roleResponse.data.rol
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Login failed',
            error: error.message 
        });
    }
};