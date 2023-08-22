import {
  UpdateCocktails,
  deleteUser,
  getAllUsers,
  updateUserRole,
} from "../controllers/UserController";
import { Request, Response } from "express";

const routesExpress = require("express");

const router = routesExpress.Router();

router.post("/update-cocktails", (req: Request, res: Response) => {
  UpdateCocktails(req, res);
});
router.get("/get-all-users", (req: Request, res: Response) => {
  getAllUsers(req, res);
});

router.delete("/delete-user", deleteUser);

router.put("/update-user-role", updateUserRole);

module.exports = router;
