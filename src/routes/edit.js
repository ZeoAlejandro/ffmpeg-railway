const express = require('express');
const cors = require('cors')
const editController = require('../controllers/editController/editController')
const { upload } = require('../middleware/multerConfig')
const router = express.Router();

//GET podcast
router.get('/', editController.getPodcast);

//POST insert podcast in DB
router.post('/insertPodcastDB', cors(), upload.single('file'), editController.insertPodcastNow);

module.exports = router;
