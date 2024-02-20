const express = require("express");
const router = express.Router()
module.exports = router;
router.get('/getAll', async (req, res) => {
    try {
       session = req.store.openSession();
    //query
       await session.saveChanges();

    } catch (error) {

    }
})
