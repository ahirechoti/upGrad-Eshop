import {Schema, model} from 'mongoose';

const orderSchema = Schema({
    id: { type: Number, unique: true, min : 1, required: true},
    amount:{type:Number, required:true},
    order_date:{type:Date, default: ()=>{ return Date.now() }, required:true},
    product_id:[
        {type: Schema.Types.ObjectId, ref: 'eshop-product'}
      ],
    shipping_address_id:[
        {type: Schema.Types.ObjectId, ref: 'eshop-shipping-address'}
      ],
    user_id:[
        {type: Schema.Types.ObjectId, ref: 'eshop-user'}
      ],
    created_date:{type:Date, immutable:true,default: ()=>{ return Date.now() }},
    created_by:{type:String, immutable:true},
    modified_date:{type:Date},
    modified_by:{type:String}
},
{
    collection: "ECOMMERCE"
});
export default model("eshop-order", orderSchema);