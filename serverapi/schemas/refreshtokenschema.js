const mongoose = require('mongoose');
const { Schema } = mongoose;

const refreshtokenSchema = new Schema({
  token:  String, // String is shorthand for {type: String}
});

exports.refreshtokenSchema = refreshtokenSchema;