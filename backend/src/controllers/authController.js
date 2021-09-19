const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

/** @return a user or null*/
/** Can be used to extract user from database or to verify if they exist */
const createUser = async (username, password, typ, address) =>{
    const newUser = {
        username: username,
        password: password,
        type: type,
        salt: await bcrypt.genSalt(),
        address: address,
    }
    const addUser = new userModel(newUser);
    await addUser.save();
    console.log("Added user to the database");
}

/** @return a user or null*/
/** Can be used to extract user from database or to verify if they exist */
const getUser = async (username) =>{
    return await userModel.findOne({username: username});
}

const getUserByID = async (id) =>{
    return await userModel.findOne({_id:id});
}

/** @return true/false*/
/** Is used to check if passwords are valid */
const checkPasswordEquality = async (user, password) =>{
    return await bcrypt.compare(password, user.password);;
}

/** @return an authentication token */
/** This function is used to grant the user an authentication token */
const createToken = (user) =>{
    return jwt.sign({user_id: user._id}, user.salt);
}

const verifyToken = (user, token) =>{
    return (jwt.verify(token, user.salt)).user_id === user._id;
}

module.exports = {createUser, getUser, getUserByID, checkPasswordEquality, createToken, verifyToken};