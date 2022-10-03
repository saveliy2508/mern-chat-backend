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

export const getAll = async (req, res) => {
  try {
    const messages = await MessageModel.find()
    
    res.json(messages)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось получить сообщения'
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const messageId = await req.params.id
    console.log(messageId)
    MessageModel.findById(messageId, (err, doc) => {
      if (err) {
        return res.status(500).json({
          message: 'Не удалось получить сообщение'
        })
      }
      
      if (!doc) {
        return res.status(404).json({
          message: 'Статья не найдена'
        })
      }
      res.json(doc)
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось получить сообщения'
    })
  }
}

export const remove = async (req, res) => {
  try {
    const messageId = await req.params.id
    
    MessageModel.findByIdAndDelete(messageId, (err, doc) => {
      if (err) {
        return res.status(500).json({
          message: 'Не удалось удалить сообщение'
        })
      }
      
      if (!doc) {
        return res.status(404).json({
          message: 'Статья не найдена'
        })
      }
      res.json({
        success: true,
      })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось получить сообщения'
    })
  }
}

export const update = async (req, res) => {
  try{
  const messageId = await req.params.id
    MessageModel.updateOne({
      _id: messageId
    },{
      text: req.body.text
    })
  }catch(err){
  
  }
}