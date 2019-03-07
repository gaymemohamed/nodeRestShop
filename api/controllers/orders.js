const mongoose = require('mongoose');
const Order = require('../models/order');
const product = require('../models/product')

exports.Orders_Get_all_orders =  async (req , res , next)=>{
    console.log(req.userData._id);
    console.log('dd')
    let getOrds = await Order.find({}).select('_id product quantity').populate('product', 'id name price');
    return res.status(200).json({
        count:getOrds.length,
        orders : getOrds.map(getOrds=>{
            return{
                _id : getOrds.id,
                product:getOrds.product,
                quantity:getOrds.quantity,
                request :{
                    type:"GET",
                    url :"http://localhost:5000/orders/"+getOrds.id
                }
            }
        }
            
        )
        

    })
};

exports.Orders_Create_Order = async (req , res , next)=>{ 
    const order = new Order({
    _id : mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    product : req.body.productId
});
let newOrder = await Order.create(order);
 return res.status(201).json({
    message : "orders are created",
    order : {
        _id:newOrder.id,
        quantity:newOrder.quantity,
        product:newOrder.product
    },
    request :{
        type:"POST",
        url :"http://localhost:5000/orders/"+newOrder.id
    }

});
};

exports.Orders_get_single_order = async (req , res , next)=>{
    const id = req.params.orderID;
    let orderDetial = await Order.findById(id).select('quantity product _id').populate('product', 'id name price');
        return res.status(200).json({
            orderDetial: orderDetial,
            request:{
                type : "GET",
                URL : "http/localHost/5000/Products"+orderDetial.id
            }   
        });
};


exports.Orders_delete_order = async (req , res , next)=>{
    const id = req.params.orderID;
    let orderDelete = await Order.remove({_id:id});
    return res.status(200).json({
        message: "Order Deleted",
        orderDelete :orderDelete,
        request:{
            type : "Post",
            URL : "http/localHost/5000/Products"
        }
})
};