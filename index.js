const express=require('express')
require('dotenv').config()
const app=express();
const port=process.env.PORT||5003;
const db=require('./db/config')
const route=require('./routes/route')
const body_parser=require('body-parser')

app.use(body_parser.urlencoded({extended:false}))
app.use('/api',route)
app.use('/views/img',express.static('./views/img'))

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})