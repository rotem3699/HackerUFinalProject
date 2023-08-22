import { LogOut, checkAuth, signUp } from "../controllers/authControllers";
import { Request, Response } from "express";
const { signIn } = require("../controllers/authControllers.ts");
const routesExpress = require("express");

const router = routesExpress.Router();

router.post("/signin", (req: Request, res: Response) => {
  signIn(req, res);
});
router.post("/signup", (req: Request, res: Response) => {
  signUp(req, res);
});

router.get("/check-auth", (req: Request, res: Response) => {
  checkAuth(req, res);
});

router.post("/log-out", (req: Request, res: Response) => {
  LogOut(req, res);
});

module.exports = router;
