const express = require("express");
const mongoose = require("mongoose")
const app = express();
app.use(express.json())
require("dotenv").config();

const userRoter = require("./Routes/userRoutes");

app.use( '/user', userRoter)


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected')
}).catch((err)=>{
    console.log(err)
})


app.listen(process.env.PORT||3000 , ()=>{
    console.log(`App Listning at Port ${process.env.PORT}`)
})


