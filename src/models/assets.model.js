const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['Vehicle', 'Equipment', 'Building', 'IT', 'Other']
    },
    name: {
        type: String,
        required: true
    },
    identifier: {
        type: Number,
        required: true,
        unique: true
    },
    location: {
        type: String
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    value: {
        type: Number,
        required: true,
        min: 0
    },
    condition: {
        type: String,
        enum: ['Excellent', 'Good', 'Fair', 'Poor'],
        default: 'Good'
    },
    status: {
        type: String,
        enum: ['In Use', 'In Storage', 'In Maintenance', 'Retired'],
        default: 'In Use'
    },
    lastMaintenanceDate: {
        type: Date,
        default: Date.now
    },
});

const Asset = mongoose.model.Asset || mongoose.model('asset', assetSchema);

module.exports = Asset;