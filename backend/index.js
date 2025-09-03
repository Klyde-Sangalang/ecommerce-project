const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { type } = require('os');

app.use(express.json());
app.use(cors());

// Database connection With MongoDB
mongoose.connect('mongodb+srv://syzejr:Klyde2675!@cluster0.ftpiz7p.mongodb.net/portfolio-ecommerce')

// API Creation

app.get("/",(req,res)=>{
    res.send("Express Server is running");
})



// Image Storage Engine

const storage = multer.diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb)=> {
        return cb(null, `${file.fieldname}_${Date.now()}${Date.now()+Date.now()}${path.extname(file.originalname)}`);
    }
})

const uploads = multer ({storage:storage})

// Creating Upload Endpoint for Images
app.use('/images', express.static('uploads/images'))

app.post("/uploads",uploads.single('product'),(req, res)=>{
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})


// Schema for Creating Products

const Product = mongoose.model('Product', {
    id: {
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    availability: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
    },
    category_desc: {
        type: String,
    },
    tags: {
        type: String,
    },
    stock: {
        type: Number,
        default: 0,
    },
    reviews: {
        type: Array,
        default: []
    },
    size: {
        type: Array,
        default: []
    },
    visits: {
        type: Number,
        default: 0
    },
})

// Schema for Review Model
const Review = mongoose.model('Review', {
    image: {
        type: String,
        required: true,
    },
    user: {
        type: Number,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
    },
})


app.post('/addproduct', async(req,res)=> {
    let products = await Product.find({});
    let id;
    if (products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id=1;
    }

    const product= new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        date: req.body.date,
        availability: req.body.availability,
        description: req.body.description??"",
        category_desc: req.body.category_desc??"",
        tags: req.body.tags??"",
        stock: req.body.stock??0,
        reviews: req.body.reviews??[],
        size: req.body.sizes??[],
        visits: req.body.visits??0
    });
    console.log(product);
    await product.save();
    console.log("Product Added");
    res.json({
        success: 1,
        product: req.body.name
    })
})

// Creating API for Deleting Products
app.post('/removeproduct', async(req, res)=> {
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed Product : " + req.body.name);

    res.json({
        success: 1,
        name: req.body.name
    })
})

// Add feature to update visits of product when visited
app.post('/updatevisits', async(req,res)=> {
    let product = await Product.findOne({id:req.body.id});
    product.visits = product.visits + 1;
    await product.save();
    console.log("Product Visits Updated");
    res.json({
        success: 1,
        name: req.body.name
    })
})

// Add feature to update stock of product when visited

// Add feature for review of product
app.post('/addreview', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.body.id });
    if (!product) {
      return res.status(404).json({ success: 0, message: "Product not found" });
    }

    // keep username as a single string inside user object
    const review = {
      image: req.body.image,
      user: {
        username: req.body.user   // string, not array
      },
      rating: req.body.rating,
      comment: req.body.comment,
    };

    product.reviews.push(review);
    await product.save();

    res.json({
      success: 1,
      message: "Review added successfully",
      review
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: 0, message: "Server error" });
  }
});


// Creating API for getting All Products

app.get('/allproducts', async(req,res)=> {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

// Schema Creating for User Model

const Users = mongoose.model('Users', {
    username : {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now,
    }
})


// Creating Endpoints for registering Users

app.post('/signup', async(req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if (check) {
        return res.status(400).json({success:false,errors:"Email Already Exists"});
    } 
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });

    await user.save();

    const data = {
        user:{
            id: user.id,
        }
    }

    const token = jwt.sign(data, 'secret_ecomKEY');
    res.json({success:true,token:token});
})


// Creating Endpoints for Login

app.post('/login', async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id,
                }
            }
            const token = jwt.sign(data, 'secret_ecomKEY');
            res.json({success:true,token});
        }
        else {
            return res.status(400).json({success:false,errors:"Invalid Credentials"});
        }
    }
    else {
        return res.status(400).json({success:false,errors:"Invalid Credentials"});
    }
})

app.listen(port,(error)=>{
    if (!error) {
        console.log(`Server is running on port ${port}`);
    } else {
        console.log("Error : " +error);
    }
})