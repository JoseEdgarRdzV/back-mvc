const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { createUser: createUserModel, findUserByEmail: findUserByEmailModel } = require('../models/userModel') // Cambio de nombres de funciones importadas
require('dotenv').config()

exports.createUser = async (userData) => { 
    try {
        const createUserResult = await createUserModel(userData) // Cambio de nombre de la función llamada
        if (createUserResult) {
            return {
                success: true
            }
        } 
        return {
            success: false,
            message: 'Error al Registrar'
        }
    } catch (error) {
        return {
            success: false,
            error: error.message
        }
    }
}

exports.findUserByEmail = async (email) => { 
    try {
        const found = await findUserByEmailModel(email) 
        if (found.success) {
            return {
                success: true,
                user: found.user
            }
        } 
        return {
            success: false,
            message: 'Usuario no Encontrado'
        }
    } catch (error) {
        return {
            success: false,
            error: error.message
        }
    }
}

exports.comparePassword = async (plainPassword, hashedPassword) => { 
    try {
        const verifyPassword = await bcrypt.compare(plainPassword, hashedPassword)
        return verifyPassword
    } catch (error) {
        throw new Error('Error al comparar Password')
    }
}

exports.generateToken = async (user) => { 
    try {
        const token = jwt.sign({
            email: user.email,
            userId: user.id
        },
        process.env.TOP_SECRET,
        { expiresIn: '1h' }
        )    
        return token; 
    } catch (error) {
        throw new Error('Error al generar el token')
    }
}
