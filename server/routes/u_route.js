const express = require('express');
const u_route = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/config').secretorkey;
const passport = require('passport');

//validation functions
const validateRegisterInput = require('../validations/registeration');

//users model
var users = require('../models/users');


u_route.post('/signup',(req,res)=>{

    const { errors,isvalid } = validateRegisterInput(req.body);

    if(!isvalid){
        return res.status(400).json(errors);
    }


    users.findOne({email:req.body.email})
    .then(user=>{
        if(user){
          return  res.status(400).json({email: 'Email Already Exists.'});
        }

        const newuser = new users({
            name : req.body.name,
            age:req.body.age,
            email:req.body.email,
            password:req.body.password
        });

        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newuser.password,salt,(err,hash)=>{
                if(err) throw err;
                newuser.password = hash;
                newuser.save()
                .then(user=>{
                    res.json(user);
                })
                .catch(err=>{
                    console.log(err.data);
                });
            });
        });
    });
});


u_route.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    users.findOne({email})
    .then(user=>{
        if(!user){
            return res.status(400).json({email:'User not found.'});
        }

        bcrypt.compare(password,user.password)
        .then(ismatch=>{
            if(ismatch){
                const payload={id:user.id, name:user.name};


                jwt.sign(
                    payload,
                    keys,
                    {expiresIn:3600},
                    (err,token)=>{
                        res.json({
                            success:true,
                            token:'Bearer '+token
                        });
                    }
                );
            }else{
                return res.status(400).json({password:'Password incorrect.'})
            }
        });

    });
});

u_route.get('/current',passport.authenticate('jwt',{ session : false}),(req,res)=>{
    // res.json({msg : 'Success'});
     res.json(req.user);
 });

module.exports = u_route;