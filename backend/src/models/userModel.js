const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// USER DATA THAT BOTH WORKERS AND RECRUITERS HAVE

let schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  type: { // USER TYPE
    type: String,
    enum: ["employer", "worker"]
  },
  salt: {
    type: String
  },
  address: {
    type: String
  }
}, { collection: 'Users' });

// Password hashing
schema.pre("save", function(next){
  let user = this;
  // if the data is not modified
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.hash(user.password, user.salt, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model("User", schema);
