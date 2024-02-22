const express = require("express");
const {DocumentStore, PointField} = require("ravendb");


const router = express.Router()

router.post('/createItem', async (req, res) => {
    try {

        session = req.store.openSession();
        item = {
            images: req.body.images,
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
    } catch (error) {
        console.log("Error Occurred While Creating Item", error)
    }
})

router.get('/get/:collection', async (req, res) => {

    try {
        session = req.store.openSession();
        lat = req.body.lat
        long = req.body.long
        radius = req.body.radius
        const itemsWithinRadius = await session
            .query({collection: req.params.collection})
            .spatial(
                new PointField("address.location.lat", "address.location.long"),
                criteria => criteria.withinRadius(radius, lat, long,'Miles'))
            .orderByDistance(
                new PointField("address.location.lat", "address.location.long")
                    .roundTo(0.1),
                lat, long)
            .all();
        res.status(201).json({items: itemsWithinRadius});
    } catch (error) {
        console.log("Error Occurred While Creating Item", error)
    }

})

module.exports = router
