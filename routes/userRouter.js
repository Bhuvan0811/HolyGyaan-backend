const express = require("express");
const {User} = require("../db");
const router = express.Router();
const zod = require("zod");
const JWT_secret = require("../config");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware.js");

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})

router.post("/signup", async (req, res)=>{

    const {success} = signupBody.safeParse(req.body);
    if(!success){
        res.status(401).json({
            msg: "email already taken/ incorrect inputs"
        });
        return;
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        res.status(411).json({
            msg: "Username already exists."
        });
        return;
    }

    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    const user = await User.create({
        username: username,
        password: password,
        firstName: firstname,
        lastName: lastname,
    })
    const userId = user._id;

    const token = jwt.sign({user}, JWT_secret)
    return res.status(200).json({
        msg: "User created",
        token: token
    });
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res)=>{
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            msg: "User does not exist"
        })
    }
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username: username,
        password: password
    })

    if(!user) {
       res.status(411).json({
        msg: "User not found"
       });
       return;
    }
    else{ 
        res.status(200).json({
        token: jwt.sign({user}, JWT_secret)
        })
        return;
    }
});

const updateBody = zod.object({
    firstName: zod.string().min(1).optional(),
    lastName: zod.string().min(1).optional(),
    password: zod.string().length(6).optional()
});
router.put("/", authMiddleware,  async (req, res)=>{

    const {success} = updateBody.safeParse(req.body);

    if(!success) {
        res.status(411).json({
            msg: "Wrong information"
        })
    }

    await User.updateOne({_id : req.userId}, req.body,   
    (err, result)=>{
        if(err){
            res.status(411).json({
                msg: "Error while updating"
            })
            return;
        }
        else{
            res.json(200).json({
                msg: "Information successfully updated"
            })
        }
    })
})


module.exports = router;
