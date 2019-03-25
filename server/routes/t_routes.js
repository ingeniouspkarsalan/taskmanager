const express = require('express');
const t_route = express();
const passport = require('passport');

//task model
var task = require('../models/task');


t_route.get('/alltask',passport.authenticate('jwt',{ session : false}),(req,res)=>{
    task.find({user_id:req.user._id})
    .then(tasks=>{
        if(!tasks){
            return res.status(400).json({err:'not found'});
        }else{
            return res.json(tasks);
        }
    })
    .catch(err=>res.status(400).json(err.data));
 });


t_route.post('/addtask',(req,res)=>{
    const newtask = new task({
        description:req.body.description,
        user_id:req.body.id
    });

        newtask.save()
        .then(task=>{
            res.json({success:true})
            //mongoose.disconnect();
        })
        .catch(err=>err.data)
});

module.exports = t_route;