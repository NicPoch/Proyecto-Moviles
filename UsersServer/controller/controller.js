var DBA=require('../database/Sqlite/sqliteAccess');
var services=require('../services/services');
const Joi = require('joi');

const authenticateUser =async (login,callback)=>{
    try {
        var username=login.username;
        var password=login.password;
        DBA.findByLogin(username,password,async (status,ans)=>{
            if(status!==404)
            {
                services.genToken(ans,callback);
            }
            else
            {
                callback(status,ans);
            }
        });

    } catch (error) {
        callback(404,"Incomplete information");
    }
};
const createUser= async (user,callback)=>{
    const { error } = schema.validate(user);
    (error) ? callback(404,error.message) : DBA.createUser(user,callback);
};
const findUser= async (id,token,callback)=>{
    try 
    {
        if(token)
        {
            services.verifyToken(token,async (err)=>{
                (err) ? callback(404,"Invalid Token") : DBA.findUser(id,callback);
            });
        }
        else
        {
            callback(404,"No token");
        }
        
    } 
    catch (error) 
    {
        callback(500,"Error");
    }
};
const updateUser= async (id,user,token,callback)=>{
    try 
    {
        if(token)
        {
            services.verifyToken(token,async (err)=>{
                if(err)
                {
                    callback(404,"Invalid Token")
                }
                else
                {
                    let temp_user=user;
                    delete temp_user.id;
                    const { error } = schema.validate(temp_user);  
                    (error) ? callback(404,error.message) : DBA.updateUser(id,user,callback);  
                }
            });
        }
        else
        {
            callback(404,"No token");
        }

    } 
    catch (error) 
    {
        callback(500,"Error");
    }
};
const deleteUser = async (id,token,callback)=>{
    try 
    {
        if(token)
        {
            services.verifyToken(token,async (err)=>{
                if(err)
                {
                    callback(404,"Invalid Token");
                }
                else
                {
                    services.deleteForms(id,async(success)=>{
                        (success) ? DBA.deleteUser(id,callback):callback(500,"Error Deleting forms");
                    });
                }
            });
        }
        else
        {
            callback(404,"No token");
        }

    } 
    catch (error) 
    {
        callback(500,"Error");
    }
};


const schema = Joi.object({
    firstName: Joi.string().regex(/([A-Z a-z \s])+/).required(),
    lastNames: Joi.string().regex(/([A-Z a-z \s])+/).required(),
    email: Joi.string().email().required(),
    username: Joi.string().regex(/([A-Z a-z \s])+/).required(),
    phone: Joi.number().required(),
    password: Joi.string().regex(/([A-Z a-z \s])+/).required(),
    institution: Joi.string().regex(/([A-Z a-z \s])+/).required(),
});

exports.authenticateUser=authenticateUser;
exports.createUser=createUser;
exports.findUser=findUser;
exports.updateUser=updateUser;
exports.deleteUser=deleteUser;