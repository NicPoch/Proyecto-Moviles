const axios = require('axios');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

const FORMS_SERVER="http://localhost:3100/forms/user/";
let server_token="";

const getServerToken=async()=>{
    axios.post(FORMS_SERVER+"token",{password:config.password})
    .then((response)=>{
        if(response.status===202)
        {
            console.log("Connection forms server");
            server_token=response.data.token;
        }
        else
        {
             throw new Error("Unable to gain access to forms server");
        };
    }).catch((err)=>{console.log(err)});
};

const genToken= async (data,callback)=>{
    const payload = {check:  true};
    const token = jwt.sign(payload, config.key);
    var resp={
        token:token,
        data:data
    };
    callback(202,resp);
};

const verifyToken=async (token,callback)=>{
    jwt.verify(token,config.key,async(err,decoded)=>{
        callback(err);
    });
};

const deleteForms=async (id,callback)=>{
    axios.delete(FORMS_SERVER+id,{headers:{'access-token':server_token}}).then((res)=>{
        (res.status !== 202) ? callback(false): callback(true);
    })
}
exports.genToken=genToken;
exports.verifyToken=verifyToken;
exports.getServerToken=getServerToken;
exports.deleteForms=deleteForms;