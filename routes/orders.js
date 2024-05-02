const express = require('express');
const router = express.Router();
const Order = require('../models/ordersModel');

// Handle order creation
router.post('/', async (req, res) => {
  try {
    // Create a new order
    const order = new Order(req.body);
    await order.save(); // Save the order to the database

    // Write to the database
    const savedOrder = await order.save(); // Save the order to the database
    console.log('Order saved successfully:', savedOrder);
    res.status(201).json({ 
      message: "Order saved successfully",
      order: savedOrder
    }); 
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Handle fetching order history
router.get('/', async (req, res) => {
  try {
    // Fetch order history from the database
    const orders = await Order.find(); 
    res.json({ orders });
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ error: 'Failed to fetch order history' });
  }
});

module.exports = router;