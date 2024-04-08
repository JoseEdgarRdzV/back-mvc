const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const { createUser, findUserByEmail } = require('../models/userService')

exports.signup = async (req, res) => {
    try {
        //codigo para registrar
        const  { email, password }  = req.body
        const existingUser = await findUserByEmail(email)
        if (existingUser.sucess) {
            return res.status(400).json ({
                message: 'El usuario ya esta registrado'
            })
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt(password, saltRounds)

        const newUser = {
            email: email,
            password: hashedPassword
            //agregar otros campos
        }

        const userResult = await createUser(newUser)
        if (userResult.sucess) {
            res.status(201).json({
                message: 'Usuario Registrado Satisfactoriamente'
            }) 
        } else {
            res.status(201).json({
                message: 'Usuario Registrado Satisfactoriamente'
            })
        }
    } catch (error) {
        res.status(500).json ({
            message: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        //codigo para loggearnos
        const { email, password } = req.body 
        const findEmail = await findUserByEmail(email)
        
        if (!findEmail.sucess) {
                res.status(401).json ({
                    message: 'usuario no encontrado'
                })
        }
        const user = findEmail.user
        const findPassword = await bcrypt.compare(password, user.password)

        if (!findEmail.sucess) {
            res.status(401).json ({
                message: 'Password Incorrecto'
            })
    }

    const token = jsonwebtoken.sign({
        email: user.email,
        userId: user.id
    }, process.env.TOP_SECRET, {
        expiresIn: '1h'
    })

    res.status(200).json({
        token: token
    })
    } catch (error) {
        res.status(500).json ({
            message: error.message
        })
    }
}