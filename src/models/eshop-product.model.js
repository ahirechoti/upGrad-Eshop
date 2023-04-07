const { Schema, model } = require('mongoose');

const productSchema = Schema({
    product_id: { type: Number, unique: true, min : 1, required: true},
    available_items:{type:Number, min:0},
    category:{type:String},
    description:{type:String},
    image_url:{type:String},
    manufacturer:{type:String},
    name:{type:stringify, required:true},
    price:{type:Number, min:0},
    created_date:{type:Date, immutable:true,default: ()=>{ return Date.now() }},
    created_by:{type:String, immutable:true},
    modified_date:{type:Date},
    modified_by:{type:String}
});
module.exports =  model("eshop-product", productSchema, "PRODUCTS");