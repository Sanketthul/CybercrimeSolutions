const mongoose = require("mongoose");

const statusHistorySchema = new mongoose.Schema({
  status: { type: String, required: true },
  changedBy: { type: String, required: true },
  note: { type: String, maxlength: 500, default: "" },
}, { timestamps: true, _id: false });

const otherCrimeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254, index: true },
  message: { type: String, required: true, trim: true, maxlength: 5000 },
  category: { type: String, default: "Other cybercrime", trim: true, maxlength: 100 },
  trackingId: { type: String, unique: true, index: true },
  status: { type: String, enum: ["Submitted", "Under Review", "In Progress", "Resolved", "Closed"], default: "Submitted", index: true },
  statusHistory: { type: [statusHistorySchema], default: function () { return [{ status: "Submitted", changedBy: "system", note: "Report received" }]; } },
}, { timestamps: true });

module.exports = mongoose.model("OtherCrime", otherCrimeSchema);
