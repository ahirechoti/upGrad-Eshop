const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  amount: { type: Number, required: true },
  orderDate: { type: Date, default: () => { return Date.now() }},
  productId: [
    { type: mongoose.SchemaTypes.ObjectId, ref: 'eshop-product' }
  ],
  addressId: [
    { type: mongoose.SchemaTypes.ObjectId, ref: 'eshop-shipping-address' }
  ],
  userId: [
    { type: mongoose.SchemaTypes.ObjectId, ref: 'eshop-user' }
  ],
  created_date: { type: Date, immutable: true, default: () => { return Date.now() } },
  created_by: { type: String, immutable: true, default: 'SYSTEM' },
  modified_date: { type: Date, default: ()=> {return Date.now()} },
  modified_by: { type: String }
});
module.exports =  mongoose.model("eshop-order", orderSchema, "ORDERS");