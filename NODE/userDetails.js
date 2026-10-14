const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema({
  fname: { type: String, required: true, trim: true, maxlength: 80 },
  lname: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 254, index: true },
  password: { type: String, required: true, select: true },
  userType: { type: String, enum: ["User", "Admin"], default: "User", required: true },
}, { collection: "UserInfo", timestamps: true });

mongoose.model("UserInfo", UserDetailsSchema);
