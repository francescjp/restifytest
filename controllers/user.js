var helpers= require("../config/helper.js");
var UserModel= require("../models/UserModel.js");

module.exports= function (server) {

  server.get("/", function(req, res, next) {
    UserModel.find({}, function (err, users) {
        if(err){
          console.log(err);
          helpers.failure(res,next,'Error saving user to mongodb', 500);
        }
        helpers.success(res, next, users);
    });
  });

  server.get("/user/:id", function(req, res, next) {
    req.assert("id", "id requires and").notEmpty();
    var errors= req.validationErrors();
    if(errors){
      helpers.failure(res,next,errors[0], 400);
      return;
    }
    UserModel.findOne({_id:req.params.id}, function (err, user) {
      if(user === null) {
        helpers.failure(res,next,"user not found", 404);
        return;
      } else if(err){
        console.log(err);
        helpers.failure(res,next,'Error saving user to mongodb', 500);
      } else {
        helpers.success(res,next, user);
      }
    });
  });

  server.post("/user", function(req, res, next) {
    //req.body.assert("name", "id requires and").notEmpty();
    //req.body.assert("lastname", "id requires and").notEmpty();
    //req.body.assert("email", "id requires and").notEmpty().isEmail();
  	var user = req.body;
    var user= new UserModel();
    user.firstName= req.body.name;
    user.lastName= req.body.lastname;
    user.email= req.body.email;
    user.save(function(err){
      console.log("end");
      if(err) {
        console.log(err);
        helpers.failure(res,next,'Error saving user to mongodb', 500);
      } else {
        helpers.success(res,next, user);
      }
    });
  });

  server.put("/user/:id", function(req, res, next) {
    var errors= req.validationErrors();
    if(errors){
      helpers.failure(res,next,errors, 400);
      return;
    }
    UserModel.findOne({_id:req.params.id}, function (err, user) {
      if(user === null) {
        helpers.failure(res,next,"user not found", 404);
        return;
      } else if(err){
        console.log(err);
        helpers.failure(res,next,'Error saving user to mongodb', 500);
      } else {
        var updates= req.body;
        delete updates.id;
        for(var field in updates){
          user[field] =updates[field];
        }
        user.save(function(err){
          console.log("end");
          if(err) {
            console.log(err);
            helpers.failure(res,next,'Error saving user to mongodb', 500);
          } else {
            helpers.success(res,next, user);
          }
        });
      }
    });
  });

  server.del("/user/:id", function(req, res, next) {
    UserModel.findOne({_id:req.params.id}, function (err, user) {
      if(user === null) {
        helpers.failure(res,next,"user not found", 404);
        return;
      } else if(err){
        console.log(err);
        helpers.failure(res,next,'Error saving user to mongodb', 500);
      } else {
        user.remove(function(err){
          if(err) {
            console.log(err);
            helpers.failure(res,next,'Error removing user to mongodb', 500);
          } else {
            helpers.success(res,next, user);
          }
        });
      }
    });
  });
}
