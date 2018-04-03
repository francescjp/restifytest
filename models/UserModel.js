const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
 id: ObjectId,
 firstName: String,
 lastName: String,
 email: String
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
