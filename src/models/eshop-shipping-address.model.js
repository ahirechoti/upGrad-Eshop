const { Schema, model } = require('mongoose');

const shippingSchema = Schema({
    id: { type: Number, unique: true, min : 1, required: true},
    city:{type:String, required:true},
    landmark:{type:String},
    name:{type:String, required:true},
    phone:{type:String, match: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/},
    state:{type:String, required:true},
    street:{type:String, required:true},
    zipcode:{type:String, match: /^[1-9][0-9]{5}$/},
    user_id:[{type:mongoose.Types.ObjectId, ref:'eshop-user'}],
    created_date:{type:Date, immutable:true,default: ()=>{ return Date.now() }},
    created_by:{type:String, immutable:true},
    modified_date:{type:Date},
    modified_by:{type:String}
});
module.exports =  model("eshop-shipping-address", shippingSchema, "ADDRESSES");