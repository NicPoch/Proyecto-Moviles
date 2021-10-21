const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("bson"); 
var assert = require("assert");

const url = "mongodb://localhost:27017";
const dbName = "Biocheck";
let db=null;
const client = new MongoClient(url, { useUnifiedTopology: true });


const connect=async()=>{
    db=await(await client.connect()).db(dbName);    
    console.log("Connection to :"+db.databaseName);
}
const findUserForms=async(id,callback)=>{
    db.collection("forms").find({user_id:Number(id)}).toArray((err,ans)=>{
        if(err)
        {
            callback(500,"Server error");
        }
        else
        {
            callback(202,ans);
        }
    });
};
const deleteUserForms=async(id,callback)=>{
    db.collection("forms").deleteMany({user_id:Number(id)},(err,ans)=>{
        (err) ? callback(500,"Server error") : callback(202,ans.matchedCount);
    });
};
const createForm=async(form,callback)=>{
    db.collection("forms").insertOne(form,(err,ans)=>{
        console.log(ans.insertedId.toString());
        (err) ? callback(500,"Server Error") : getForm(ans.insertedId.toString(),callback);
    });
};
const getForm=async(id,callback)=>{
    db.collection("forms").findOne({_id:new ObjectId(id)},(err,res)=>{
        assert.equal(err, null);
        if (res === null) {
          callback(404, "Such element doesn´t exist");
        } else {
          callback(200, res);
        }
    });
};
const updateForm=async(id,form,callback)=>{
    db.collection("forms").updateOne({_id:new ObjectId(id)},{ $set: form}).then((res)=>{
        (res.matchedCount !== 1) ? callback(500,"Server Error") : getForm(id,callback);
    });
};
const deleteForm=async(id,callback)=>{
    db.collection("forms").deleteOne({_id:new ObjectId(id)},(err,result)=>{
        assert.equal(err, null);
        if (result.deletedCount !== 1) {
          callback(404, "The form to delete doesn´t exist");
        } else {
          callback(202, "Successfully deleted");
        }
    });
};


exports.connect=connect;
exports.findUserForms=findUserForms;
exports.deleteUserForms=deleteUserForms;
exports.createForm=createForm;
exports.getForm=getForm;
exports.updateForm=updateForm;
exports.deleteForm=deleteForm;