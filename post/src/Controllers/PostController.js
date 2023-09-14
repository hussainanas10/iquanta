
import PostService from "../Services/postService.js";
import Controller from "./Controller.js";

// const Logger = require('../Helpers/Logger.js');

export default class PostController extends Controller {
    constructor(response) {
        super(response)
        this.postService = new PostService()
    }

    createPost(request) {
        try {
            const postPromise = this.postService.createPost(request);
            postPromise.then((post) => {
                this.sendResponse(post);
            }).catch((error) => {
                this.handleException(error)
            })
        } catch (error) {
            this.handleException(error)
        }
    }

    getPost(request) {
        try {
            const postPromise = this.postService.getPost(request)
            postPromise.then((post) => {
                this.sendResponse(post)
            }).catch((error) => {
                this.handleException(error)
            })
        } catch (error) {
            this.handleException(error)
        }
    }

    updatePost(request) {
        try {
            const postPromise = this.postService.updatePost(request)
            postPromise.then((post) => {
                this.sendResponse(post)
            }).catch((error) => {
                this.handleException(error)
            })
        } catch (error) {
            this.handleException(error)
        }
    }


    deletePost(request) {
        try {
            const postPromise = this.postService.deletePost(request)
            postPromise.then((post) => {
                this.sendResponse(post)
            }).catch((error) => {
                this.handleException(error)
            })
        } catch (error) {
            this.handleException(error)
        }
    }

    feed(request) {
        try {
            const postPromise = this.postService.feed(request)
            postPromise.then((post) => {
                this.sendResponse(post)
            }).catch((error) => {
                this.handleException(error)
            })
        } catch (error) {
            this.handleException(error)
        }
    }

    
   
}