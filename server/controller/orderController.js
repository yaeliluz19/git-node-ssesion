const Orders = require("../models/Orders");

const getAllOrders = async (req, res) => {
    if(req.user.permission!='admin')
    {
        return res.status(401).json({message:'Unauthorized' })
    }
    const order = await Orders.find().lean()
    if (!order?.length) {
        return res.status(400).json({ message: 'erorr' })
    }
    res.json(order)
}

const getOrdersHistory = async (req, res) => {
    if(req.user.permission!='admin')
    {
        return res.status(401).json({message:'Unauthorized' })
    }
    const order = await Orders.find({status:"closed"}).lean()
    if (!order?.length) {
        return res.status(400).json({ message: 'erorr' })
    }
    res.json(order)
}

const getOrdersDone = async (req, res) => {
    if(req.user.permission!='admin')
    {
        return res.status(401).json({message:'Unauthorized' })
    }
    const order = await Orders.find({status:"done"}).lean()
    if (!order?.length) {
        return res.status(400).json({ message: 'erorr' })
    }
    res.json(order)
}

const getOrdersaccepted = async (req, res) => {
    if(req.user.permission!='admin' && req.user.permission!='shift manager' && req.user.permission!='worker')
    {
        return res.status(401).json({message:'Unauthorized' })
    }
    const order = await Orders.find({status:"accepted"}).lean()
    if (!order?.length) {
        return res.status(400).json({ message: 'erorr' })
    }
    res.json(order)
}

const getOrderByIdClient = async (req, res) => {

    if(req.user.permission!='client')
    {
        return res.status(401).json({message:'Unauthorized' })
    }

    const {idClient} = req.params
    
    const orders = await Orders.find({clientId:idClient}).lean()

    if (!orders.length) {
    return res.status(400).json({ message: 'No order found' })
    }
    
    res.json(orders)
}

const createOrder = async (req, res) => {

    if(req.user.permission!='client')
    {
        return res.status(401).json({message:'Unauthorized' })
    }

    const {clientId, branchId, name, sweets,address , status} = req.body
    if (!clientId || !branchId || !name || !sweets || !address) 
    {
        return res.status(400).json({ message: 'clientId, branchId, name, sweets, city, street, house are required' })
    }

    if(status != undefined && status != 'accepted' && status != 'done' && status != 'closed'){
        return res.status(400).json({ message: 'The status must be accepted, done or closed'})
    }

    const order = await Orders.create({clientId, branchId, name, sweets, address, status})
    if(order){
        return res.json(order)
    }
    else{
        return res.status(400).json({ message: 'Invalid order ' })
    }
}

const updateOrder = async (req, res) => {
    if(req.user.permission!='admin' && req.user.permission!='shift manager' && req.user.permission!='worker' && req.user.permission!='client')
    {
        return res.status(401).json({message:'Unauthorized' })
    }
    const{id}=req.params
    const {clientId, branchId, name, sweets, address}= req.body
   
    if (!id || !clientId || !branchId || !name || !sweets || !address) {
        return res.status(400).json({ message: "fields are required" })
    }

    if(status != 'accepted' && status != 'done' && status != 'closed' && status !='canceled' && status!=null ){
        return res.status(400).json({ message: 'The status must be accepted, done or closed'})
    }
    
    const order = await Orders.findById(id)

    if (order.status=='closed' || order.status=='canceled'){
        return res.status(400).json({ message: 'order is canceled / closed' })
    }

    if(!order){
        return res.status(400).json({ message: 'sweet not found' })
    }

    order.branchId = branchId
    order.name = name
    order.sweets = sweets
    order.address = address
  
    const updatedorder = await order.save()
    res.json(`${updatedorder.name} updated`)
}


const updateStatus = async (req, res) => {

    if(req.user.permission!='admin' && req.user.permission!='shift manager')
    {
        return res.status(401).json({message:'Unauthorized' })
    }
    const { id } = req.params
    const {status} = req.body

    const order = await Orders.findById(id)
    if (!order)
    {
        return res.status(400).json({ message: 'order not found' })
    }

    if(status != 'accepted' && status != 'done' && status != 'closed' && status !='canceled' && status!=null ){
        return res.status(400).json({ message: 'The status must be accepted, done or closed'})
    }

    order.status = status
    const updatedChecked = await order.save()
    res.json(`${updatedChecked.name}'s status updated`)
    }

module.exports = {
    getAllOrders,
    getOrdersHistory,
    getOrdersDone,
    getOrdersaccepted,
    getOrderByIdClient,
    createOrder,
    updateOrder,
    updateStatus
}