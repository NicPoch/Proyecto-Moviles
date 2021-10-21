var jwt = require('jsonwebtoken');
var config = require('../config/config');
var axios=require('axios');

const ML_Server="";

const genToken= async (callback)=>{
    const payload = {check:  true};
    const token = jwt.sign(payload, config.key);
    var resp={
        token:token
    };
    callback(202,resp);
};

const verifyToken=async (token,callback)=>{
    jwt.verify(token,config.key,async(err,decoded)=>{
        callback(err);
    });
};

const verifyPassword=async(password,callback)=>{
    (config.password==password) ? callback(true):callback(false);
};

const getPrediction=async(form,callback)=>{
    axios.post(ML_Server,form).then(ans=>callback(ans.status,ans.data)).catch(err=>callback(500,"Server Error"));
};

exports.genToken=genToken;
exports.verifyToken=verifyToken;
exports.verifyPassword=verifyPassword;
exports.getPrediction=getPrediction;