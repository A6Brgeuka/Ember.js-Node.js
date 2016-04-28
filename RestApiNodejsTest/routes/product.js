'use strict';
var fs = require('fs');

var express = require('express');
var router = express.Router();
var Product = require('models/product').Product;
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.get("/products", function (req, res, next) {
    Product.getProducts(function (err, products) {
        if(err){
            res.json({"errors": err});
        }
        res.json({"products": products});
    })
});

router.get("/products/:id", function (req, res, next) {
    //getSingle
});

router.post("/products", function (req, res, next) {

    var title = req.body.product.title;
    var description = req.body.product.description;
    var path = req.body.product.path;

    Product.createProduct(title, description, path, function (err, product) {
        if(err) return res.json({"errors": err});
        
        res.json({"product": product});
    });
});

router.put('/products/:id', function (req, res, next) {

    let title = req.body.product.title;
    let description = req.body.product.description;
    let path = req.body.product.path;
    let id = req.params.id;

    Product.editProduct(id, title, description, path, (err, product) => {
        if(err) return res.json({"errors": err});
        console.log(product);
        res.json();
    });
});

router.delete('/products/:id', function (req, res) {
    Product.deleteProduct(req.params.id, function (err) {
        if(err) return res.json({"errors": err});
        
        res.json({});
    });
    
});

router.post('/upload', multipartMiddleware,function (req, res, next) {

    var tmpPath = req.files.file.path;

    var imageName = Math.random().toString(36).substring(7);
    
    var ext = '.' + req.files.file.path.split('.')[1];

    var targetPath = '.' + '/public/images/' + imageName + req.files.file.name;

    var path = '/images/' + imageName + req.files.file.name;
    
    fs.rename(tmpPath, targetPath, function(err) {
        if (err) return res.json({"errors": err});

        res.json({"path": path});
    });
});

module.exports = router;