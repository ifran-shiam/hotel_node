const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// POST route to add a MenuItem
router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const newMenuItem = new MenuItem(data);

        const response = await newMenuItem.save();
        console.log('Data Saved');
        res.status(200).json(response);

    }
    catch (error) {
        console.log('Error creating Menu Item:', error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
})

// GET method to get the MenuItem
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('Data fetched');
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste;
        if (taste == sweet || taste == spicy || taste == sour) {
            const response = MenuItem.find({ taste: taste });
            console.log('Data fatched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid taste' });
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });

    }
})

// Update
router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const updatedMenuData = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true,
            runValidators: true,
        })
        if (!response) {
            return res.status(404).json({ error: 'Menu Item not found' });
        }

        console.log('Data Updated');
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }

})

// Delete
router.delete('/:id', async(req, res) => {
    try {
        const menuId = req.params.id;

        const response = await MenuItem.findByIdAndDelete(menuId);
        if (!response) {
            return res.status(404).json({ error: 'Menu Item not found' });
        }

        console.log('Data Deleted');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;