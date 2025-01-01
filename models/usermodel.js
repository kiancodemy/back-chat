import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

// User Schema
const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "https://avatar.iran.liara.run/public", // Replace with your desired default picture URL
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

// Pre-save middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.method("comparePassword", async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
});

const User = model("User", userSchema);

export default User;
