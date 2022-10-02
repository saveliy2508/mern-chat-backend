import express from 'express'
import mongoose from "mongoose";
import {registerValidation} from "./validations/auth.js";

import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";

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


app.post('/auth/register', registerValidation, UserController.register)

app.post('/auth/login', UserController.login)

app.get('/auth/me', checkAuth, UserController.getMe)
