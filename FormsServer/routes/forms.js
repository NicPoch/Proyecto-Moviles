var express = require('express');
var FormsController= require("../controller/controller");
var router = express.Router();

router.get('/user/:id',async (req,res,next)=>{
    FormsController.getFormsUser(req.headers["access-token"],req.params.id,async(status,ans)=>{
        res.status(status).send(ans);
    });
});
router.delete('/user/:id',async (req,res,next)=>{
    FormsController.deleteFormsUser(req.headers["access-token"],req.params.id,async(status,ans)=>{
        res.status(status).send(ans);
    });
});
router.post('/user/token',async (req,res,next)=>{
    FormsController.authenticateServer(req.body,async(status,ans)=>{
        res.status(status).send(ans);
    });
});
router.post('/',async (req,res,next)=>{
    FormsController.createForm(req.headers["access-token"],req.body,async(status,ans)=>{
        res.status(status).send(ans);
    });
});
router.get('/:id',async (req,res,next)=>{
    FormsController.getForm(req.headers["access-token"],req.params.id,async(status,ans)=>{
        res.status(status).send(ans);
    });
});
router.put('/:id',async (req,res,next)=>{
    FormsController.updateForm(req.headers["access-token"],req.params.id,req.body,async(status,ans)=>{
        res.status(status).send(ans);
    });
});
router.delete('/:id',async (req,res,next)=>{
    FormsController.deleteForm(req.headers["access-token"],req.params.id,async(status,ans)=>{
        res.status(status).send(ans);
    });
});
module.exports = router;
