import { v2 as  cloudinary } from "cloudinary";
import dotenv from 'dotenv';
import { json } from "express";

import productModel from "../models/productModel.js";



// function for add product
const addProduct = async (req,resp) => {
     try {
        const {name,description,price,category,subCategory,sizes,bestseller} = req.body;

        let parsedSizes = [];
        try {
            parsedSizes = sizes?.trim() ? JSON.parse(sizes) : [];
        } catch (error) {
            console.log('error parsing Sizes:',error.message);
            return resp.status(400).json({success:false,message:'invalid  sizes'})
            
        }
        const image1 =req.files.image1 && req.files.image1[0]
        const image2 =req.files.image2 && req.files.image2[0]
        const image3 =req.files.image3 && req.files.image3[0]
        const image4 =req.files.image4 && req.files.image4[0]
        
        const images = [image1,image2,image3,image4].filter((item) => item !== undefined )
        
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )


        const productData = {
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestSeller: bestseller === "true" ? true : false ,
            sizes:parsedSizes,
            image:imagesUrl,
            date:Date.now()
        }
        console.log(productData);

        const product = new productModel(productData);
        await product.save()
        
        resp.json({success:true,message:"Product Added"})
     } catch (error) {
        console.log(error);
        
        resp.json({success:false,message:error.message})
     }
} 



//  function for list producct

const listProduct = async (req,resp) => {

    try {
        const products = await productModel.find({});
        resp.json({success:true,products})
    } catch (error) {
        console.log(error);
        resp.json({success:false,message:error.message})
        
    }

}


// fuction for remove product

const removeProduct = async (req,resp) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        resp.json({success:true,message:"Product Removed"})
    } catch (error) {
        console.log(error);
        resp.json({success:false,message:error.message})
        
    }

}


// function for sngle product info

const singleProduct = async (req,resp) => {
    try {
        const{productId} = req.body
        const product = await productModel.findById(productId)
        resp.json({success:true, product})
    } catch (error) {
         console.log(error);
        resp.json({success:false,message:error.message})
    }

}


export {listProduct,addProduct,removeProduct,singleProduct}