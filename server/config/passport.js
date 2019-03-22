const   JwtStrategy = require('passport-jwt').Strategy;
const   ExtractJwt = require('passport-jwt').ExtractJwt;
var   users = require('../models/users');
const   keys = require('./config').secretorkey;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts,(jwt_payloads,done)=>{
            users.findById(jwt_payloads.id)
            .then(user=>{
                if(user){
                    return done(null,user);
                }else{
                    return done(null,false);
                }
            })
            .catch(err => console.log(err));
        })
    );
};