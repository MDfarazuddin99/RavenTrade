const express = require("express");
const {DocumentStore, PointField} = require("ravendb");
const fs = require('fs');
const path = require('path');

// Get the parent directory of the current directory
const parentDir = path.dirname(__dirname);

// Define the target directory for images within the parent directory
const imagesDir = path.join(parentDir, 'images');

// Check if the images directory exists, if not, create it
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

const router = express.Router()

router.post('/createItem', async (req, res) => {
    try {
        session = req.store.openSession();
        let file_names = req.files.file.map((image) => image.name)
        item = {
            images: file_names,
            user_id: req.body.user_id,
            listing_date: req.body.listing_date,
            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zipcode: req.body.zipcode,
                location: {
                    lat: req.body.lat,
                    long: req.body.long
                }
            },
            name: req.body.name,
            description: req.body.description,
            collection: req.body.collection,
            is_active: true,
            is_gift: req.body.is_gift
        }
        console.log('Item', item)
        await session.store(item)
        await session.saveChanges();
        res.status(201).json({id: item.id, message: 'Item created successfully.'});

        req.files.file.forEach((image) => {
            // Define the target path for each image
            let item_dir = path.join(imagesDir, item.id);
            fs.mkdirSync(item_dir, { recursive: true });
            const targetPath = path.join(item_dir, image.name);
            // Move each image to the target path
            image.mv(targetPath, (err) => {
                if (err) {
                    console.error(`Failed to move file: ${image.name}`, err);
                } else {
                    console.log(`File moved successfully: ${image.name}`);
                }
            });
        });
    } catch (error) {
        console.log("Error Occurred While Creating Item", error)
    }
})

router.post('/get/:collection', async (req, res) => {

    try {
        session = req.store.openSession();
        lat = req.body.lat
        long = req.body.long
        radius = req.body.radius
        const itemsWithinRadius = await session
            .query({collection: req.params.collection})
            .spatial(
                new PointField("address.location.lat", "address.location.long"),
                criteria => criteria.withinRadius(radius, lat, long, 'Miles'))
            .orderByDistance(
                new PointField("address.location.lat", "address.location.long")
                    .roundTo(0.1),
                lat, long)
            .all();
        res.status(201).json({items: itemsWithinRadius});
    } catch (error) {
        console.log("Error getting Items:", error)
    }

})

router.delete('/deleteItem', async (req, res) => {
    try {
        session = req.store.openSession();
        await session.delete(req.body.itemId);
        await session.saveChanges();
        res.status(201).json({success: true});
    } catch (error) {
        console.log("Error deleting Item: ", req.body.itemId)
    }
})


router.put('/updateItem', async (req, res) => {
    try {
        session = req.store.openSession();
        let item = await session.load(req.body.id);
        if (item) {
            Object.assign(item, req.body);
            await session.saveChanges();
            console.log('Document updated successfully.');
        } else {
            console.log('Document not found.');
        }
        await session.saveChanges();
        res.status(201).json({success: true});
    } catch (error) {
        console.log("Error Updating Item: ", req.body.itemId);
    }
})

module.exports = router
