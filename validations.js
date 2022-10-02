import {body} from "express-validator";

export const registerValidation = [
  body('email').isEmail(),
  body('password').isLength({min: 5}),
  body('fullName').isLength({min: 3}),
  body('avatarUrl').optional().isURL(),
]


export const loginValidation = [
  body('email').isEmail(),
  body('password').isLength({min: 5}),
]


export const messageCreateValidation = [
  body('text', 'Введите сообщение').isLength({min: 1}).isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString()
]