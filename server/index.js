const express = require('express');
const app = express();
var mongoose = require('mongoose');
const body = require('body-parser');
const passport = require('passport');

//bodyparser for middleware
app.use(body.urlencoded({extended:true}));
app.use(body.json());

//passport middleware   
app.use(passport.initialize());
//passport config
require('./config/passport')(passport);

//db connection
const db = require('./config/config').mongoURI;

mongoose.connect(db,{useNewUrlParser:true})
.then(()=>{
    console.log('Connect');
})
.catch((err)=>{
    console.log(`error ${err}`);
});

app.get('/',(req,res)=>{
    res.send('Hello world');
});

var routes = require('./routes/u_route');
app.use('/api',routes);

var PORT = process.env.PORT || 3005;

app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`);
});