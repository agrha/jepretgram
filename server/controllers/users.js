const userSchema = require('../models/Users')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const jwt = require('jsonwebtoken')

class User {
  static viewAll(req,res){
    userSchema.find()
    .then(data=>{
      res.status(200).json({
        message:'list user:',
        data
      })
    })
    .catch(err=>{
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  }
  static create(req,res){
    let password = bcrypt.hashSync(req.body.password,salt)
    let obj = {
      username: req.body.username,
      password: password
    }
    userSchema.create(obj)
    .then(data=>{
      res.status(200).json({
        message:'create successfull',
        data
      })
    })
    .catch(err=>{
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  }
  static update(req,res){
    let password = bcrypt.hashSync(req.body.password,salt)
    let target = {
      _id: req.params.id
    }
    userSchema.findOne(target)
    .then(data=>{
      data.username = req.body.username || data.username,
      data.password = password || data.password,
      data.save()
      .then(result=>{
        res.status(200).json({
          message:'update successfull',
          result
        })
      })
      .catch(err=>{
        res.status(500).json({
          message:'something went wrong',
          err
        })
      })
    })
  }
  static delete(req,res){
    let target = {
      _id:req.params.id
    }
    userSchema.findOneAndRemove(target)
    .then(data=>{
      res.status(200).json({
        message:'delete success',
        data
      })
    })
    .catch(err=>{
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  }

  static signin(req,res){
    let password = req.body.password
    let target = {
      username:req.body.username
    }
    userSchema.findOne(target)
    .then(user=>{
      if(user){
        let clarify = bcrypt.compareSync(password,user.password)
        if(clarify){
          let payload = {
            _id:user._id,
            name:user.username,
            role:user.role
          }
          jwt.sign(payload,'secret key',(err,token)=>{
            if(err){
              res.status(500).json({
                message:'something went wrong',
                err
              })
            } else {
              res.status(200).json({
                message:'berhasil signin',
                token:token,
                id:payload._id,
                role:payload.role,
                username:payload.name
              })
            }
          })
        } else {
          res.status(403).json({
            message:'your password is wrong'
          })
        }
      } else {
        res.status(500).json({
          message:'user is not found'
        })
      }
    })
  }
}

module.exports = User