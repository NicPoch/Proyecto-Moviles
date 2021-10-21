const { Sequelize, DataTypes} = require('sequelize');


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './Biocheck.db'
});

const User=sequelize.define('User',{
    firstName: {type:DataTypes.STRING,allowNull:false},
    lastNames: {type:DataTypes.STRING,allowNull:false},
    email: {type:DataTypes.STRING,allowNull:false,unique:true},
    username: {type:DataTypes.STRING,allowNull:false},
    phone: {type:DataTypes.NUMBER,allowNull:false,unique:true},
    password: {type:DataTypes.STRING,allowNull:false},
    institution: {type:DataTypes.STRING,allowNull:false} 
});

const connect=async ()=>{
    try 
    {
        await sequelize.authenticate();
        User.sync({force:true});//{force:true}
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }    
};
const findByLogin=async (username,password,callback)=>{
    User.findOne({ where: { username: username,password:password } }).then((ans)=>{
        (ans===null) ? callback(404,"Error on parameters") : callback(202,ans.toJSON());
    }).catch(err=>callback(404,err));;
};
const createUser=async (user,callback)=>{    
    User.create(user).then((ans)=>{
        (ans===null) ? callback(404,"Doesn´t Exist Such User") : callback(202,ans.toJSON());
    }).catch(err=>callback(404,err));
};
const findUser=async (id,callback)=>{
    User.findByPk(id).then((ans)=>{
        (ans===null) ? callback(404,"Doesn´t Exist Such User") : callback(202,ans.toJSON());
    }
    ).catch(err=>callback(404,err));
};
const updateUser=async (id,user,callback)=>{
    User.update(user,{where:{id:id}}).then((ans)=>{
        (ans[0]===0) ? callback(404,"Doesn´t exist"):findUser(id,callback);
    }).catch(err=>callback(404,err));
};
const deleteUser=async (id,callback)=>{
    User.destroy({where:{id:id}}).then((ans)=>{
        console.log(ans);
        (ans===0) ? callback(404,"Nothing to delete") : callback(202,"Success");
    }).catch(err=>callback(500,err));
};

exports.findByLogin=findByLogin;
exports.createUser=createUser;
exports.findUser=findUser;
exports.updateUser=updateUser;
exports.deleteUser=deleteUser;
exports.connect=connect;