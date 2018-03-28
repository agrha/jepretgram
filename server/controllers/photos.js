const photoSchema = require ('../models/Photos')

class Photos {
  static read(req,res){
    photoSchema.find()
    .populate('love')
    .then(data => {
      res.status(200).json({
        message:'this is list of photos',
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

  static create(req,res) {
    let obj = {
      userId: req.body.userId,
      imageurl: req.body.imageurl,
      description: req.body.description,
      love:[], 
    }
    photoSchema.create(obj)
    .then(data=>{
      res.status(200).json({
        message:'create success',
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
    let target = {
      _id:req.params.id
    }
    let obj = {
      userId: req.decoded.id,
      imageurl: req.body.imageurl,
      description: req.body.description,
      love:[],
    }
    photoSchema.findOneAndUpdate(target,obj)
    .then(data=>{
      res.status(200).json({
        message:'update success',
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

  static delete (req,res){
    let target = {
      _id: req.params.id
    }
    photoSchema.findOneAndRemove(target)
    .then(data=>{
      res.status(200).json({
        message:'delete success'
      })
    })
    .catch(err=>{
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  }

  static like(req,res){
    let target = {
      _id: req.params.id
    }
    photoSchema.findOne(target)
    .then(photo=>{
      if(userId !== req.decoded.id){
        photo.love.push(req.decoded.id)
        photo.save()
        .then(result=>{
          res.status(200).json({
            message:'kamu berhasil like'
          })
        })
        .catch(err=>{
          message:'something went wrong'
        })
      } else {
        res.status(500).json({
          message:'kamu tidak bisa like'
        })
      }
    })
  }
}

module.exports = Photos