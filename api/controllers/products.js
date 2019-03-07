const Product = require('../models/product');
const mongoose = require('mongoose');

exports.Get_all_products =  async (req, res, next) => {
    let ProdDetials = await Product.find().select('name price _id productImage');
    return res.status(200).json({
        count: ProdDetials.length,
        ProdDetials: ProdDetials.map(ProdDetials => {
            return {
                name: ProdDetials.name,
                price: ProdDetials.price,
                _id: ProdDetials.id,
                request: {
                    type: "GET",
                    URL: "http/localHost/5000/Products" + ProdDetials.id
                },
                productImage: ProdDetials.productImage
            }
        })


    });

};


exports.Products_create_product =  async (req, res, next) => {
    try{
    console.log(req.userData.email);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });

    let newProd = await Product.create(product);
    return res.status(201).json({
        message: "The Product Created Successfuly",
        name: newProd.name,
        price: newProd.price,
        _id: newProd.id,
        request: {
            type: "POST",
            URL: "http/localHost/5000/Products" + newProd.id
        }
    });
}
catch(err){
    next();
}
};

exports.products_get_product =  async (req, res, next) => {
    const id = req.params.productID;
    if (!(ObjectId.isValid(id))) {
        return res.status(400).send({
            "meesage": "id is invalid id"
        })
    }


    let ProdDetial = await Product.findById(id).select('name price _id productImage');
    console.log('from your db', ProdDetial);



    if (ProdDetial) {
        return res.status(200).json({
            ProdDetial: ProdDetial,
            request: {
                type: "GET",
                URL: "http/localHost/5000/Products" + ProdDetial.id
            }
        });
    } else {
        return res.status(404).end();
    }
};

exports.products_update_product =  async (req, res, next) => {
    const id = req.params.productID;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    };
    let productUpda = await Product.update({ _id: id }, { $set: { updateOps } });
    return res.status(200).json({
        message: "Update made successfully",
        productUpda: productUpda,
        request: {
            type: "GET",
            URL: "http/localHost/5000/Products" + productUpda.id
        }
    });

};


exports.products_delete_product =  async (req, res, next) => {
    const id = req.params.productID;
    let productDelete = await Product.remove({ _id: id });
    return res.status(200).json({
        message: "delete product",
        productDelete: productDelete,
        request: {
            type: "Post",
            URL: "http/localHost/5000/Products"
        }
    });

};