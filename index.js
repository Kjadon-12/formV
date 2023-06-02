const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./dbConnect')
const cors = require('cors')
dotenv.config();
const app = express();
const PORT =  5002;
const User  = require('./userFormModel')
app.use(express.json())
dbConnect();
const Countrys = require('./countryModel')
const States = require('./stateModel')
const Cities = require('./cityModel')
app.use(cors())
// get country list 

app.get('/get-countryList' , async (req,res)=>{
    try {
        const countryList =  await Countrys.find({})
        res.json(countryList)
    } catch (error) {
        res.json(error.message)
    }
})


// get state list 

app.get('/get-stateList' , async (req,res)=>{
    
    try {
        if(!req.query.countryCode){
            throw new Error("Please select a country")
        }
        else {
            const stateList =  await States.find({countryCode: req.query.countryCode})
            //console.log(stateList)
            res.json(stateList)
         }
        
    } catch (error) {
        res.json(error.message)
    }
})

// get city list 

app.get('/get-cityList' , async (req,res)=>{
    console.log(req.query)
    try {
        if(!req.query.countryCode || !req.query.stateCode){
            throw new Error("Please Select country and state")
        }
        else {
            const cityList =  await Cities.find({countryCode: req.query.countryCode,stateCode: req.query.stateCode})
            res.json(cityList)
         }
        
    } catch (error) {
        res.json(error.message)
    }
})




//saver user data /register user
app.post('/user-data', async (req, res) =>{

    try {

        const userExists = await User.findOne({email:req.body.email});
        if(userExists){
            throw new Error("User already exists")
        }
        else{
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            gender: req.body.gender,
            dob: new Date(req.body.dob),
            age: Number(req.body.age) 
        })
    
        res.json(user)
    }
    } 
    
    catch (error) {
       res.json(error.message) 
    }
})





app.listen(PORT, console.log(`Using this port ${PORT}`));