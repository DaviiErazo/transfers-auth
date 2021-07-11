import { Router, Request, Response } from "express";
import { UserLoginController } from "../controllers/UserLoginController";
import { UserPutController } from "../controllers/UserPutController";
import container from "../dependency-injection";

export const register = (router: Router) => {
  const userPutController: UserPutController = container.get("User.controllers.UserPutController");
  router.post("/user/register", (req: Request, res: Response) => userPutController.run(req, res));

  const userLoginUserController: UserLoginController = container.get("User.controllers.UserLoginController");
  router.post("/user/login", (req: Request, res: Response) => userLoginUserController.run(req, res));
};
