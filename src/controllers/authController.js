const User=require("../models/user");
const bcrypt=require("bcrypt");
const flash=require("express-flash");
const passport = require("passport");

exports.register=async(req,res)=>{
    const {name,email,password}=req.body;

    
   if(!email || !password ||!name){
       
    req.flash('error','All fields are required');
    console.log(req);
    return res.redirect('register');
 
}

 let user=await User.findOne({email:email})
   if(user){
    req.flash('error','Already registered please login');
     return  res.redirect("register");
   }

   const hashedPassword= await bcrypt.hash(password,10)

   const myuser=new User({
       name:name,
       email:email,
       password:hashedPassword
   })

   user= await myuser.save();

   if(user){
    return res.redirect('coviddata');
   }
   else{
    req.flash('error','something went wrong');
    return res.redirect('register');
   }




}

exports.login=(req,res,next)=>{
    passport.authenticate("local",(err,user,info)=>{
       if(err){
           req.flash('error',info.message);
           return next(err);
       }
       if(!user){
        req.flash('error',info.message);
        return res.redirect('/login');
       }
       req.logIn(user,(err)=>{
           if(err){
            req.flash('error',info.message);
            return next(err);
           }
           return res.redirect('/coviddata');
       })
    })(req,res,next)
}