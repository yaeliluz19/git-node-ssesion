const Basket = require("../models/Basket")
const Sweets = require("../models/Sweets")

const addNewProd = async (req, res) => {
    if (req.user.permission != 'client') {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const { sweetId } = req.params
    if (!sweetId) {
        return res.status(400).json({ message: 'missing field!' })
    }


    const ifExist = await Basket.findOne({ sweetId: sweetId }).populate("sweetId", { price: 1 })

    if (ifExist) {
        ifExist.quantity = ifExist.quantity + 1
        ifExist.price = ifExist.sweetId.price * ifExist.quantity
        await ifExist.save()
        res.status(201).json({ message: 'new item added-quantity+1' })
    }

    if (!ifExist) {
        const pro = await Sweets.findOne({ _id: sweetId }).lean()
        const newProd = await Basket.create({ clientId: req.user._id, sweetId: sweetId, price: pro.price })

        if (newProd) {

            return res.status(201).json({ message: 'new item added' })
        }
        else {
            return res.status(400).json({ message: 'invalid item' })
        }
    }
}

const getAllCart = async (req, res) => {
    const products = await Basket.find({ clientId: req.user._id }).lean().populate("sweetId", { name: 1 })
    if (!products?.length) {
        return res.status(400).json({ message: "No products found :(" })
    }
    //const sweets = await Sweets.find().lean()
    res.json(products)

}

const deleteProduct = async (req, res) => {
    const { id } = req.body
    const prod = await Basket.findById(id).exec()
    if (!prod) {
        return res.status(400).json({ message: 'prod not found!' })
    }
    await prod.deleteOne()
    const reply = `Product ${prod.name} ID ${prod._id} deleted successfuly!`
    res.json(reply)
}

const updateQuantityOfProduct = async (req, res) => {

    const { id, quantity } = req.body
    console.log(id);
    console.log(quantity);

    if (!id || !quantity)
    {
        console.log("!id || !quantity"); 
        return res.status(400).json({ message: 'missing field' });
    } 
    

    const prod = await Basket.findById(id).populate("sweetId", { price: 1 })

    console.log("prod",prod); 
    if (!prod) {
    console.log("!prod"); 
        
        return res.status(400).json({ message: 'prod not found!' })
    }

    if (quantity == 0)
        await prod.deleteOne()

    prod.quantity = quantity
    prod.price = prod.sweetId.price * prod.quantity

    await prod.save()

    const reply = `Product ${prod.name} ID ${prod._id} deleted successfuly!`
    res.json(reply)
}


module.exports = {
    addNewProd,
    getAllCart,
    deleteProduct,
    updateQuantityOfProduct
}