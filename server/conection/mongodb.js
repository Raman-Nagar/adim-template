const mongoose = require('mongoose');

const connectToDatabase = async () => await mongoose.connect("mongodb://localhost:27017/myweb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connectToDatabase;