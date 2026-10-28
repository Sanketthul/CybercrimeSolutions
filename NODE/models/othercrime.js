const mongoose = require("mongoose");

const REPORT_STATUSES = [
  "Submitted",
  "Under Review",
  "In Progress",
  "Verified",
  "Rejected",
  "Guidance provided",
  "Resolved",
  "Closed",

  // Compatibility with existing backend routes
  "Under review",
];

const statusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: REPORT_STATUSES,
      required: true,
    },
    changedBy: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      maxlength: 500,
      default: "",
    },
  },
  {
    timestamps: true,
    _id: false,
  },
);

const otherCrimeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
      index: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    category: {
      type: String,
      default: "Other cybercrime",
      trim: true,
      maxlength: 100,
    },
    trackingId: {
      type: String,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      enum: REPORT_STATUSES,
      default: "Submitted",
      index: true,
    },
    statusHistory: {
      type: [statusHistorySchema],
      default: function () {
        return [
          {
            status: "Submitted",
            changedBy: "system",
            note: "Report received",
          },
        ];
      },
    },
    adminResponse: {
      type: String,
      default: "",
      maxlength: 1000,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserInfo",
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("OtherCrime", otherCrimeSchema);
