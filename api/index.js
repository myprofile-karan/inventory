const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./models/userSchema');
const productModel = require('./models/productSchema');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/user");

app.post('/product', (req, res)=> {
  productModel.create(req.body)
  .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((err) =>res.json(err));
})

app.get('/api/products', async (req, res)=> {
  const productsData = await productModel.find()
  res.status(200).json({productsData})
})


    //  delete product
app.delete('/api/products/delete/:id', async (req, res) => {
  try {
    const result = await productModel.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 1) {
      res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


app.get('/api/signup', async (req, res)=> {
  const myData = await userModel.find()
  res.status(200).json({myData})
})


app.post('/signup', (req, res)=> {
  userModel.create(req.body)
  .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((err) =>res.json(err));
})

app.post('/login', (req, res) => {
  const {email, password} = req.body
  userModel.findOne({email})
  .then((user) => {
    if(user){
      if(user.password === password){
        return res.status(200).json({message:"login successful"});             
      }
      else{
        return res.json({message: "Invalid password"})
      }
    }
    else{
      return res.json({message: "user not found"})
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
