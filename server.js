
const express=require("express");
const productsRouter=require("./routes/productrouter");
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();
const cors=require("cors");
const app=express();
const port =800;

app.use(cors()); 
app.use(express.json());
app.listen(port , ()=>{
    console.log(`server is running on port ${port}`);
})

app.use("/api", productsRouter);

