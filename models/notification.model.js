const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
},
    { timestamps: true }

);

module.exports = mongoose.model('notification', NotificationSchema);
