const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nanoid = require("nanoid");

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: async function(value) {
          if (!this.isModified("username")) return true;
          const user = await User.findOne({ username: value });
          if (user) throw new Error("Path `username` is alredy registred");
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          if (!this.isModified("password")) return true;
          if (value.length < 3 || value.length > 15)
            throw new Error("Path `password` must be 3-15 characters long");
        }
      }
    },
    token: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
);

UserSchema.methods.generateToken = function() {
  this.token = nanoid();
};

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  next();
});

UserSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
