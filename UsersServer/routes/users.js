var express = require('express');
var UserController = require('../controller/controller');
var router = express.Router();

/**POST login user */
router.post('/login',async (req,res,next)=>{
  UserController.authenticateUser(req.body, async (status,ans)=>{
    res.status(status).send(ans);
  });
});
/**GET user detail information */
router.get('/:id',async (req,res,next)=>{
  UserController.findUser(req.params.id,req.headers['access-token'],async (status,ans)=>{
    res.status(status).send(ans);
  });
});
/**POST creates a user */
router.post('/',async (req,res,next)=>{
  UserController.createUser(req.body,async (status,ans)=>{
    res.status(status).send(ans);
  });
});
/**PUT updates a user */
router.put('/:id',async (req,res,next)=>{
  UserController.updateUser(req.params.id,req.body,req.headers["access-token"],async (status,ans)=>{
    res.status(status).send(ans);
  });
});
/**DELETE deletes a user */
router.delete('/:id',async (req,res,next)=>{
  UserController.deleteUser(req.params.id,req.headers["access-token"],async (status,ans)=>{
    res.status(status).send(ans);
  });
});

module.exports = router;
