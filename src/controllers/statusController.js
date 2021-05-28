const Status=require("../models/status")
const alert=require("alert");
const user = require("../models/user");
exports.addstatus= async(req,res)=>{
 const {userid}=req.user._id;
 const {name,age,day,gender,healthstatus,summary}=req.body;


 const mystatus=new Status({
     name,
    age,
    day,
    gender,
    healthstatus,
    summary,
    userid:req.user._id
    
    })

    data= await mystatus.save();
    if(data){
        req.flash('error','data saved sucessfully');
        return res.redirect("/addstatus");
    }
    else{
        req.flash('error','something went wrong');
        return res.redirect("/addstatus");  
    }

 
}


exports.trackstatus=async(req,res)=>{
    const {day}=req.body;
    const data=await Status.find({userid:req.user._id});
    if(data){
        for(let i=0;i<data.length;i++){
            if(data[i].day==day){
                req.flash('data',data);
                return res.redirect("trackstatus");
            }
        }
        req.flash('error',"no data");
        return  res.redirect("trackstatus"); 
    }

    else{
        req.flash('error',"no data");
        return  res.redirect("trackstatus"); 

    }
}