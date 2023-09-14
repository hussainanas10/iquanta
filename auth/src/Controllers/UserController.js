
import AuthService from "../Services/AuthService.js";
import Controller from "./Controller.js";

// const Logger = require('../Helpers/Logger.js');

export default class UserController extends Controller {
    constructor(response) {
        super(response)
        this.authService = new AuthService()
    }

    //login

    login(request) {
        try {
            const userPromise = this.authService.login(request.body);
            userPromise.then((user) => {
                this.sendResponse(user);
            }).catch((error) => {
                this.handleException(error)
            })
        } catch (error) {
            this.handleException(error)
        }
    }

    //register

    register(request) {
        try {
            const userPromise = this.authService.register(request.body)
            userPromise.then((user) => {
                this.sendResponse(user)
            }).catch((error) => {
                this.handleException(error)
            })
        } catch (error) {
            this.handleException(error)
        }
    }

    verifyToken(request) {
        try {
            const userPromise = this.authService.verifyToken(request.body)
            userPromise.then((user) => {
                this.sendResponse(user)
            }).catch((error) => {
                this.handleException(error)
            })
        } catch (error) {
            this.handleException(error)
        }
    }

    
   
}