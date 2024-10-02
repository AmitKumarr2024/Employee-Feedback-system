import express from "express";
import {
  allUser,
  deleteUser,
  login,
  logout,
  signUpUser,
  userOne,
  userUpdate,
} from "./user.controller.js";
import jwtAuth from "../../middleware/jwtAuth.js";

const routes = new express.Router();
// user
routes.post("/signup", signUpUser);
routes.post("/login", login);
routes.get("/single-user/:id", userOne);
routes.post("/logout", jwtAuth, logout);

// admin
routes.get("/all-user", allUser);
routes.post("/user-update/:id", userUpdate);
routes.delete("/delete/:id", deleteUser);

export default routes;
