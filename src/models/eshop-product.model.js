const { Schema, model } = require('mongoose');

const productSchema = Schema({
    availableItems:{type:Number, min:0},
    category:{type:String, required:true},
    description:{type:String},
    imageUrl:{type:String, required:true},
    manufacturer:{type:String, required:true},
    name:{type:String, required:true},
    price:{type:Number, min:0},
    created_date:{type:Date, immutable:true,default: ()=>{ return Date.now() }},
    created_by:{type:String, immutable:true},
    modified_date:{type:Date, default: ()=> {return Date.now()}},
    modified_by:{type:String, default: 'ADMIN'}
});
module.exports =  model("eshop-product", productSchema, "PRODUCTS");