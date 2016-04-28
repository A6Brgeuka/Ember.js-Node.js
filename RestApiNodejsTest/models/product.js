var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    title:{
        type: String,
        unique: true,
        required: true
    },
    description:{
        type: String
    },
    path: {
        type: String,
        required: true
    }
});

schema.statics.getProducts = function (callback) {
    var Product = this;

    Product.find({}, function (err, products) {
      if(err) return callback(err);
        
      callback(null, products);
    });
};

schema.statics.getProduct = function (productId, callback) {
    var Product = this;

    Product.findOne({_id: productId}, function (err, product) {
        if(err) return callback(err);

        callback(null, product);
    });

};

schema.statics.createProduct = function (title, desc, path, callback) {

    var Product = this;

    Product.findOne({title: title}, function (err, product) {
        if(err) return callback(err);
        
        if(!product){
            var newProduct = new Product({
                title: title,
                description: desc,
                path: path
            });

            newProduct.save(function (err, product, affected) {
                if(err) return callback(err);
                console.log("save new");
                return callback(null, product);
            })
        } else {
            console.log("Title exists");
            callback(new Error("Title exists"));
        }
    });
};

schema.statics.editProduct = function (id, title, description, path, callback) {
    var Product = this;

    Product.findOne({title: title}, function (err, product) {
        if(err) return callback(err);

        if(product){
            if(product._id == id){
                saveEdit();
            } else {
                callback(new Error("Title exists"));
            }
        } else {
            saveEdit();
        }
    });

    function saveEdit() {
        Product.update(
            {
                _id: id
            },
            {
                title: title,
                description: description,
                path: path
            }, function (err, product) {
                if(err) return callback(err);
                console.log("save edit");
                callback(null, product);
            }
        )
    }
};

const fs = require('fs');

schema.statics.deleteProduct = function (id, callback) {
    const Product = this;

    Product.findOne({_id: id}, (err, product) => {
        if(err) return callback(err);

        fs.unlink('public' + product.path, (err) => {
            if(err) return callback(err);

            Product.remove({_id: id}, (err) => {
                if(err) return callback(err);

                console.log("delete");
                callback(null);
            });
        })
    });
};

exports.Product = mongoose.model('Product', schema);