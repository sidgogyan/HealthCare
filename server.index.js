const express=require("express");
const app=express();
const ejs=require("ejs");
const path=require('path');
const expressLayout=require("express-ejs-layouts");
const fetch=require('node-fetch');
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const {register,login}=require("./src/controllers/authController");
const flash=require('express-flash');
const session=require('express-session');
const MongoDbStore=require('connect-mongo');
const passport=require("passport");








//middleware
app.use(bodyParser());
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');

//db connection
mongoose.connect('mongodb://localhost:27017/HealthCare', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("db connected");
}).catch((e)=>{
    console.log(e);
});

//session config
app.use(session({
   secret:"ThisisMySecret",
   resave:false,
   saveUninitialized:false,
   store: new MongoDbStore({
      mongoUrl: "mongodb://localhost:27017/HealthCare",
      collection:'sessions',
    }),
   cookie:{maxAge:1000*60*60*24}  //24houres
}));



//passport config
const passportInit =require('./src/controllers/passport')
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

//session config middleware
app.use(flash());
app.use((req,res,next)=>{
    res.locals.session=req.session;
    res.locals.user=req.user;
    next();
 })
 






//routes
app.get("/",(req,res)=>{
res.render("index");
})

app.get("/trackstatus",(req,res)=>{
    res.render("trackstatus");
    })

app.get("/coviddata",async(req,res)=>{   
async function getCovidata(){
   
    const data=await fetch("https://api.covid19api.com/summary");
   
    return await data.json();


}


 const jsdata=await getCovidata();
 const mydata=jsdata.Countries[76];


   res.render("coviddata",{mydata});
})


app.get("/addstatus",(req,res)=>{
    res.render("addstatus");
})



app.get("/login",(req,res)=>{
    res.render("login");
})



app.get("/register",(req,res)=>{
 res.render("register");
})

app.post("/register",register);

app.post("/login",login);




//listen server
const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`server is listen at port ${PORT}`)
})