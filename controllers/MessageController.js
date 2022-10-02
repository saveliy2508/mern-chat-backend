import MessageModel from '../models/Message.js'

export const send = async (req, res) => {
  try {
    const doc = new MessageModel({
      text: req.body.text,
      avatarImg: req.body.text,
      user: req.userId
    })
    
    const message = await doc.save()
    
    res.json(message)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось отправить сообщение'
    })
  }
}