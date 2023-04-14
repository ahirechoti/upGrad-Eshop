const mongoose = require('mongoose');

const shippingSchema = mongoose.Schema({
    city:{type:String, required:true},
    landmark:{type:String},
    name:{type:String, required:true},
    contactNumber:{type:String, match: [/^[0-9]{10}$/, 'Invalid contact number!']},
    state:{type:String, required:true},
    street:{type:String, required:true},
    zipcode:{type:String, match: [/^[0-9]{6}$/, 'Invalid zip code!']},
    user_id:[{type:mongoose.Types.ObjectId, ref:'eshop-user'}],
    created_date:{type:Date, immutable:true,default: ()=>{ return Date.now() }},
    created_by:{type:String, immutable:true},
    modified_date:{type:Date},
    modified_by:{type:String}
});
module.exports =  mongoose.model("eshop-shipping-address", shippingSchema, "ADDRESSES");