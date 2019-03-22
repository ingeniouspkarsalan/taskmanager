const isEmpty = require('./is-empty');
const validator = require('validator');


module.exports = function validateRegisterInput(data){
    let errors = {};

    if(!validator.isLength(data.name, {min:2 , max:30})){
        errors.name = 'Name must be between 2 and 30 characters';
    }
    if(validator.isEmpty(data.age) || !validator.isAlphanumeric(data.age)){
        errors.age='Insert age in numeric.';
    }
    if(!validator.isEmail(data.email)){
        errors.email='Insert valid email address';
    }
    if(!validator.isLength(data.password, {min:7 , max:30})){
        errors.pass = 'Password must be between 7 and 30 characters';
    }
    if(!validator.equals(data.password,data.repeat_password)){
        errors.pass='Password not matching';
    }

    return {
        errors,
        isvalid: isEmpty(errors)
    }
}