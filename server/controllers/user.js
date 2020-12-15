const bcrypt = require('bcryptjs')
const session = require('express-session')

module.exports={
    register: async (req,res)=>{
        const {username,password}=req.body
        const db= req.app.get('db')
        const [userFound]= await db.user.find_user_by_username(username)
        if(userFound) return res.status(409).send("username exists already")
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)
        const pic=`https://robohash.org/${username}.png`
        const [newUser] = await db.user.create_user(username,hash,pic)
       
        req.session.user=newUser
        
        res.status(201).send(req.session.user)
    },
    login: async (req,res)=>{
        const {username,password}=req.body        
        const db= req.app.get('db')
        const [userFound]= await db.user.find_user_by_username(username)
        if(!userFound)return res.status(404).send('No user by that name here')       
        const isAuth= bcrypt.compareSync(password, userFound.password)
        if(!isAuth) return res.status(403).send('password is incorrect')        
        req.session.user=userFound        
        res.status(200).send(req.session.user)
        
    },
    logout:  (req,res)=>{          
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser:(req,res)=>{      
        console.log(req.session)          
        if(req.session) return res.status(200).send(req.session.user)        
        res.status(404).send('No session found')

      
    },
}