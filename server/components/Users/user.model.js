import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (email) {
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          return emailRegex.test(email);
        },
        message: (props) => `${props.value} is not a valid email format!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["ADMIN", "EMPLOYEE"], // Changed roles to ADMIN and EMPLOYEE
      required: true, // Making it required so every user has a role
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
