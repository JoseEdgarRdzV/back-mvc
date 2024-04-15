const firebase = require('../config/firebase')
const usersCollection = firebase.firestore().collection('users')
 
exports.createUser = async (userData) => {
    try {
        await usersCollection.doc(userData.id).set(userData)
        return{
            sucess: true
        }
    } catch (error) {
        return {
            sucess: false,
            error: error.message
        }
    }
}

exports.findUserById = async (userId) => {
    try {
        const userFound = await usersCollection.doc(userId). get()
        if (userFound.exists) {
            return {
                success: true,
                user: userDoc.data()
            }
        } else {
            return {
                success: false,
                user: 'User not Found'
            }
        }
    } catch (error) {
        return {
            sucess: false,
            error: error.message
        }
    }
}

exports.findUserByEmail = async (email) => {
    try {
        const userEmail = await usersCollection.where('email', '==', email).get()
        if (!userEmail.empty) {
            const userFound = userEmail.docs[0]
            return {
                sucess: true,
                user: userFound.data()
            }
        } else {
            return {
                sucess: false,
                error: 'User not Found'
            }
        }
    } catch (error) {
        return {
            sucess: false,
            error: error.message
        }
    }
}