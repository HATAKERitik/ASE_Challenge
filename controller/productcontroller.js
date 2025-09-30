const { response } = require('express');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

//endpoint GET ==> api/products
const getProducts=async (req,res)=>{
    try{
        //console.log(req.body);
        const products = await prisma.products.findMany();

        return res.status(200).json ({
        Status :"Succesfully fetched all Products",
        Length:products.length,
        Data:products
        })
    }catch(error){
    
        console.error("Error fetching products:", error);

        return res.status(500).json({
            status: "Error",
            message: "Failed to fetch products",
            error: error.message || "Unknown error"
        });
    
    }
  
}

//endpoint GET==> api/product/id
const getproduct=async (req,res)=>{

 try{
       if(!req.params.id){
       return res.status(400).json({
            Status:"Failed",
            Message:"There is no id in th URL"
        })
    }else
    {
        const productId=req.params.id*1;
        const newProduct= await prisma.products.findUnique({
            where:
            {
                id:productId
            }
    })
    if(!newProduct){
        return res.status(404).json({
                status: "Failed",
                message: `No product found with ID: ${productId}`
            });
    }else{
        res.status(200).json({
            Status:"Sucessfull",
            data:newProduct
        })
    }
}
 }catch(Error){
        res.status(500).json({
            status: "Error",
            message: "Failed to fetch product",
            error: error.message || "Unknown error"
        });
 }
   
}

//endpoint POST==> api/product
const createProducts = async (req,res)=>{
    try  {
            console.log(req.body);
            const product=await prisma.products.create({
            data: req.body
            })
        res.status(201).json({
        Status:"Sucessfully created the product",
        Data:product
    })    

}catch(error){
            res.status(500).json({
            status: "Error",
            message: "Failed to create product",
            error: error.message || "Unknown error"
        });
    }
}

//endpoint DELETE api/product/id
const deleteProducts=async (req,res)=>{
    try{
        if(!req.params.id){
            return res.status(400).json({
                status: "Failed",
                message: "Invalid product ID"
            });
        }
        else{
        const productid = parseInt(req.params.id);
        const product= await prisma.products.delete({
        where:{
            id:productid
        },
    })
    res.status(200).json({
        Status:`Sucesfully Deleted Product with id ${req.params.id}` 
    })

    }

    }catch(error){
            res.status(500).json({
            status: "Error",
            message: "Failed to delete product",
            error: error.message || "Unknown error"
        });

    }
}

//endPoint PUT api/products/increase/:id/:stock_quantity
const increaseStockQuantity=async (req,res)=>{
   
    const productId=req.params.id *1 ;
    const increasedQuantity =req.params.stock_quantity * 1;
    const product=await prisma.products.findUnique({
        where:{
            id:productId
        }
    })

    if(!product){
        res.status(500).json({
            Status:"no product is available with this id if you want to see product list go to prismsa studio "
        })
    }else{
        const updatesProduct =await prisma.products.update({
            where:{
                id:productId
            },
            data:{
                stock_quntity:product.stock_quntity + increasedQuantity
            },
        })
        res.status(200).json({
            Status : `prodcut ${productId} Quantity increased by ${increasedQuantity}` ,
            updatesProduct:updatesProduct
        })
    }
    
    
}

//endpoint PUT api/product/decrease/:id/:stock_quantity
const decreaseStockQuantity=async (req,res)=>{
    const productId=req.params.id * 1;
    const decreasedQuantity=req.params.stock_quantity *1;

    const product= await prisma.products.findUnique({
        where:{
            id:productId
        }
    })

    if(!product){
        res.status(400).json({
            Status:"Failed",
            Message:"No product is available with this id please check prisma studio"
        })
    }else if((product.stock_quntity - decreasedQuantity ) <0){
            res.status(400).json({
                Status:"failed",
                Message:`You can not decrease this amount of stock from quantity cause the reaminig stock available is ${product.stock_quntity}`
            })
    }else{
        const updatedProduct= await prisma.products.update({
            where:{
                id:productId
            },
            data:{
                stock_quntity: product.stock_quntity -decreasedQuantity
            }
        })
        res.status(200).json({
            Status:"Succesfull",
            updatedProduct:updatedProduct
        })
    }
}

const getProductsUnderthreshold = async (req,res)=>{
    
    if(!req.params.threshold){
        const threshold = 10;

        const products = await prisma.products.findMany({
            where:{
                stock_quntity:{
                    lt:threshold
                }
            }
        }) 
        res.status(200).json({
            Status:"Sucessfull",
            Data:products
        })
    }
    else{
        const threshold=req.params.threshold*1;
         const products = await prisma.products.findMany({
            where:{
                stock_quntity:{
                    lt:threshold
                }
            }
        }) 
        if(products.length ==0){
            res.status(400).json({
                Status:"Failed",
                Message:`there are no products below the quantity of ${threshold}` 
            })
        }
        else{
            res.status(200).json({
                Status:"Sucessfull",
                Products:products
            })
        }
    }
}



module.exports = {
    getProducts,
    decreaseStockQuantity,
    increaseStockQuantity,
    deleteProducts,
    createProducts,
    getproduct,
    getProductsUnderthreshold
}