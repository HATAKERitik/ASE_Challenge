
const express=require("express");
const productsRouter=require("./routes/productrouter");
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();
const cors=require("cors");
const app=express();
const port =800;

app.use(cors({
  origin: ['http://localhost:3000', 'https://ase-challenge.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


app.use(express.static("public"));
app.use("/api", productsRouter);



app.use(express.json());
app.listen(port , ()=>{
    console.log(`server is running on port ${port}`);
})
