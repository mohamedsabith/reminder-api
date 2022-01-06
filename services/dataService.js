const jwt = require('jsonwebtoken')
const database = require('../model/db')
const register = (email,username,userid,password)=>{
    return database.User.findOne({userid})
    .then(user=>{
        if(user){
            return{
                status:false,
                statusCode:401,
                message:"ACCOUNT ALREADY EXIST... PLEASE LOGIN!!"
            }
        }else{
            const newUser=new database.User({email,username,userid,password,event:[]})
            newUser.save()
            return{
                status:true,
                statusCode:200,
                message:"ACCOUNT CREATED SUCCESSFULLY CREATED!!"
            }
        }
    })
}

const login = (userid,password) =>{
    return database.User.findOne({userid,password})
    .then (user =>{

        if(user){
          currentUsername=user.username

        //token generate
        const token=jwt.sign({
            currentUserid:userid
        },'supersecretkey123456')

        return{
            status:true,
            statusCode:200,
            message:"LOGIN SUCCESSFULLY!!",
            currentUsername:currentUsername,
            currentUserid:userid,
            token
        }
        }else{
            return{
                status:false,
                statusCode:401,
                message:"INCORRECT USERID OR PASSWORD!!"
            }
        }
    })

}

const addEvent = (req,userid,tittle,date,event) =>{
   return database.User.findOne({userid})
   .then(user=>{
       if(req.currentUid != userid){
        return{
            status:false,
            statusCode:401,
            message:"ACCESS DENIED!!"
        }
       }

       if(!user){
        return{
            status:false,
            statusCode:401,
            message:"USER NOT FOUND!!"
        } 
       }
       user.event.push({
           tittle:tittle,
           date:date,
           event:event
       })
       user.save()
       return{
        status:true,
        statusCode:200,
        message: event +" ADDED SUCCESSFULLY!!"
    }
   })
}

const showEvent = (userid) =>{
      return database.User.findOne({userid})
      .then(user=>{
          if(!user){
            return{
                status:false,
                statusCode:401,
                message:"USER NOT FOUND!!"
            }
          }
          return{
              status:true,
              statusCode:200,
              event:user.event
          }
      })
}

module.exports={
    register,
    login,
    addEvent,
    showEvent
}