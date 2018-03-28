const jwt = require ('jsonwebtoken')

class Auth {
  static login(req,res,next){
    let token = req.headers.token
    jwt.verify(token, 'secret key', (err, decoded) => {
      if(err){
        res.status(403).json({
          message: 'acces denied'
        })
      }else{
        req.decoded = decoded
        next()
      }
    })
  }
  
  static user(req,res,next){
    if (!req.decoded.id) {
      return res.status(403).json({
        message: 'access denied'
      })
    }
    if(req.decoded.id == req.params.id || req.decoded.role == 'admin') {
      return next()
    } else {
      res.status(403).json({
        message: 'you not authorize to this user'
      })
    }
  }
}

module.exports = Auth