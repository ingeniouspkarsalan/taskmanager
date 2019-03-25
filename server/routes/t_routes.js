const express = require('express');
const t_route = express();

//task model
var task = require('../models/task');

t_route.get('/alltask',(req,res)=>{
    
});

module.exports = t_route;