const express = require('express');
const { assetCreate, assetList, assetDelete, assetMaintance } = require('../controllers/assets.controller');

const router = express.Router();

router.get('/list', assetList);
router.get('/list/:name', assetList);
router.get('/list/:type', assetList);

router.post('/create', assetCreate);

router.delete('/delete', assetDelete);

router.patch('/update', assetMaintance);


module.exports = {
    assetRouter: router,
}