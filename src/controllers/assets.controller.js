const Joi = require('joi');

const Asset = require('../models/assets.model');

const assetSchema = Joi.object({
    type: Joi.string().valid('Vehicle', 'Equipment', 'Building', 'IT', 'Other').required(),
    name: Joi.string().min(3).max(30).required(),
    identifier: Joi.number().required(),
    location: Joi.string().min(3).max(30).required(),
    value: Joi.number().required(),
});

const assetCreate = async (req, res) => {
    try {


        const { name, type, identifier, location, value } = (req.body);

        const { error } = assetSchema.validate({ name, type, identifier, location, value });
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const newAsset = new Asset({
            name,
            type,
            identifier,
            location,
            value
        });

        await newAsset.save();

        return res.status(201).send(newAsset);

    } catch (err) {
        console.log(err);
        return res.status(400).send(err.message);
        // throw err;
    }
}

const assetList = async (req, res) => {

    const { type, name } = req.query;
    const filter = {};

    if (type) {
        console.log(type);
        filter.type = new RegExp(type, 'i'); // Case-insensitive regex search
    }

    if (name) {
        console.log(name);
        filter.name = new RegExp(name, 'i'); // Case-insensitive regex search
    }

    try {
        const assets = await Asset.find(filter);
        return res.status(200).json({
            assets,
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
}



module.exports = {
    assetCreate,
    assetList,
}