var services = require("../services/services");
var DB = require("../database/Mongo/mongoAccess");
const Joi = require('joi');

const getFormsUser=async(token,id,callback)=>{
    services.verifyToken(token,async(err)=>{
        (err) ? callback(404,"Illegal access") : DB.findUserForms(id,callback);
    }).catch(err=>callback(500,"Server error"));
};
const deleteFormsUser=async(token,id,callback)=>{
    services.verifyToken(token,async(err)=>{
        (err) ? callback(404,"Illegal access") : DB.deleteUserForms(id,callback);
    }).catch(err=>callback(500,"Server error"));
};
const authenticateServer =async (login,callback)=>{
    try 
    {
        var password=login.password;
        services.verifyPassword(password,async(valid)=>{
            (valid) ? services.genToken(callback): callback(404,"access not granted");
        }).catch(err=>callback(500,"Server error"));
    }
    catch (error)
    {
        callback(404,"Incomplete information");
    }
};
const createForm=async(token,form,callback)=>{
    services.verifyToken(token,async(err)=>{
        if(err)
        {
            callback(404,err);
        }
        else
        {
            const { error } = schema.validate(form);
            (error) ? callback(404,error.message) : DB.createForm(form,callback);
        }
    }).catch(err=>callback(500,"Server error"));
};
const getForm=async (token,id,callback)=>{
    services.verifyToken(token,async(err)=>{
        (err) ? callback(404,"Illegal Access") : DB.getForm(id,callback);
    }).catch(err=>callback(500,"Server error"));
};
const updateForm=async (token,id,form,callback)=>{
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
                    let temp_form=form;
                    delete temp_form._id;
                    const { error } = schema.validate(temp_form);  
                    (error) ? callback(404,error.message) : DB.updateForm(id,form,callback);  
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
const deleteForm=async (token,id,callback)=>{
    services.verifyToken(token,async(err)=>{
        (err) ? callback(404,"Illegal Access") : DB.deleteForm(id,callback);
    }).catch(err=>callback(500,"Server error"));
};

const schema=Joi.object({
    user_id:Joi.number().positive().required(),
    patient_firstName:Joi.string().regex(/([A-Z a-z \s])+/).required(),
    patient_lastName:Joi.string().regex(/([A-Z a-z \s])+/).required(),
    due_date:Joi.date().required(),
    information:Joi.object().required(),
    risk:Joi.object({
        predicted:Joi.number().max(100.0).min(0.0),
        real:Joi.number().max(100.0).min(0.0)
    }),
    difficulty:Joi.object({
        predicted:Joi.number().max(100.0).min(0.0),
        real:Joi.number().max(100.0).min(0.0)
    })
});

exports.getFormsUser=getFormsUser;
exports.authenticateServer=authenticateServer;
exports.createForm=createForm;
exports.getForm=getForm;
exports.updateForm=updateForm;
exports.deleteForm=deleteForm;
exports.deleteFormsUser=deleteFormsUser;