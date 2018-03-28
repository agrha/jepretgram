var express = require('express');
var router = express.Router();
const Photos = require('../controllers/photos')
const Auth = require('../middleware/auth')

router.get('/',Auth.login,Auth.user,Photos.read)
router.post('/',Auth.login,Auth.user,Photos.create)
router.put('/:id',Auth.login,Auth.user,Photos.update)
router.delete('/:id',Auth.login,Auth.user, Photos.delete)
router.put('/:id/like',Auth.login,Auth.user,Photos.like)

module.exports = router;
