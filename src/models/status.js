const mongoose=require("mongoose");
  const statusSchema=new mongoose.Schema({
      name:{
          type:String,
          required:true,
      },
     age:{
          type:Number,
          required:true
      },
     day:{
          type:Number,
          required:true
      },
      gender:{
          type:String,
          required:true,
      },
      healthstatus:{
        type:String,
          required:true,   
      },
      summary:{
        type:String,
        required:true,   
      },
      report:{
        type:String,
      },
      userid:{
        type:String,
      }
  })

  module.exports=mongoose.model("Status",statusSchema);