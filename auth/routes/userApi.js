import express from "express";
import UserController from "../src/Controllers/UserController.js";

const UserRouter = express.Router();

UserRouter.post("/register", (request, response) => {
    const userController = new UserController(response);
    userController.register(request);
});

UserRouter.post('/v1/login',(request, response)=>{
    const userContoller = new UserController(response)
    userContoller.login(request)
});

UserRouter.post('/verifyToken',(request, response)=>{
    const userContoller = new UserController(response)
    userContoller.verifyToken(request)
});




export default UserRouter;

