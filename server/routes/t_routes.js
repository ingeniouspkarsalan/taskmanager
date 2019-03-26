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


t_route.post('/addtask',passport.authenticate('jwt',{ session : false}),(req,res)=>{
    const newtask = new task({
        description:req.body.description,
        user_id:req.user._id
    });

        newtask.save()
        .then(task=>{
            if(task){
               return res.json({success:true})
            }else{
                return res.status(400).json({success:false})
            }
           
        })
        .catch(err=>err.data);
        
});

t_route.post('/updatetask/:id',passport.authenticate('jwt',{ session : false}),(req,res)=>{
    task.findByIdAndUpdate({_id:req.param.id},{$set:{
        completed:true
    }})
    .then(tasks=>{
        if(tasks){
            return res.json({success:true});
        }
    })
    .catch(err=>{
        res.status(400).json({updateerror:err.res});
    });
});

t_route.delete('/deletetask/:id',passport.authenticate('jwt',{ session : false}),(req,res)=>{
    task.findByIdAndDelete({_id:req.param.id})
    .then(tasks=>{
        if(tasks){
            return res.json({success:true});
        }
    })
    .catch(err=>{
        res.status(400).json({error:err.res});
    });
});

module.exports = t_route;