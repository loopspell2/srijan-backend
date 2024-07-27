const express = require('express');
const { assetCreate, assetList, assetDelete } = require('../controllers/assets.controller');

const router = express.Router();

router.get('/list', assetList);
router.get('/list/:name', assetList);
router.get('/list/:type', assetList);

router.post('/create', assetCreate);



module.exports = {
    assetRouter: router,
}