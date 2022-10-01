import express from 'express'
import mongoose from "mongoose";
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {registerValidation} from "./validations/auth.js";

import UserModel from './models/User.js'

mongoose
  .connect('mongodb+srv://admin:Qwerty1233@cluster0.mo1afw6.mongodb.net/blog?retryWrites=true&w=majority')
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err))


const app = express()

app.use(express.json())

app.listen(4444, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('Server OK')
})

app.get('/', (request, response) => {
  response.send('Hello world!!!')
})


app.post('/auth/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }
    
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    
    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash
    })
    
    const user = await doc.save()
    
    const token = jwt.sign({
      _id: user._id,
    }, 'secret123', {
      expiresIn: '30d'
    })
    
    res.json({
      user,
      token
    })
  } catch(e){
    console.log(e)
    res.status(500).json({
      message: 'Не удалось зарегистрироваться'
    })
  }
})