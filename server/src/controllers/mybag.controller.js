const User = require('../models/user.model')

const getProducts = (async (req, res) => {
 const{id} = req.params;
 console.log("id",id)
 
let UserData
let productData;
try{
    UserData = await User.findById(id).populate("mybag").lean().exec()
    productData= UserData.mybag;
    return res.status(200).json({productData})
 
}catch(err){
return res.status(503).json({err:err.message})
 }

   
})

const addToWishlist = (async (req, res) => {
   
    const{id} = req.params
    const{productId} = req.body;

    let UserData
    let productData;
    try{
        UserData = await User.findByIdAndUpdate(id,{$push:{wishlist:productId}})
        productData= UserData.mybag;
        return res.status(200).json({productData})
     
    }catch(err){
    return res.status(501).json({err:err.message})
     }
    
})

const removeProduct = (async (req, res) => {
    const {id} = req.params
    const{productId} = req.body;

    let UserData
    let productData;
    try{
        UserData = await User.findById(id).populate("mybag").lean().exec();
        productData= UserData.mybag;
        productData = productData.filter((el)=> el._id!=productId )
        UserData = await User.findByIdAndUpdate(id, { $set: { "mybag": productData } })
        return res.status(200).json({productData})

    }catch(err){
    return res.status(501).json({err:err.message})
     }
})

const orderProduct = (async (req, res) => {
    const{id} =req.params
    const{productId} = req.body;

    let UserData
    let productData;
    try{
        UserData = await User.findByIdAndUpdate(id,{$push:{myorders:productId}})
        productData= UserData.myorders;
        return res.status(200).json({productData})
       
    }catch(err){
    return res.status(501).json({err:err.message})
     }
})

const changeQuantity = (async (req, res) => {
    const{id} = req.params
    const{productId,qty} = req.body;
    let UserData;
    let productData;
    try{
        UserData = await User.findById(id).populate("mybag").lean().exec();
        productData= UserData.mybag;
        productData = productData.map((el)=>{
            if(el._id==productId){
                el.qty=qty;
            }
           return el;
        })

        return res.status(200).json({productData})
     
    }catch(err){
    return res.status(500).json({err:err.message})
     }
    
   
})

module.exports = {
    getProducts,
    addToWishlist,
    removeProduct,
    orderProduct,
    changeQuantity
}