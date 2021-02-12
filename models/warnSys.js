const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    GuildID: String,
    UserID: String,
    Punishements: Array
});

module.exports = mongoose.model('Moderation', Schema);