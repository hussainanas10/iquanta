import express from "express";
import PostController from "../src/Controllers/PostController.js";

const postsRouter = express.Router();

postsRouter.post("/createPost", (request, response) => {
    const postController = new PostController(response);
    postController.createPost(request);
});

postsRouter.get('/get',(request, response)=>{
    const postController = new PostController(response)
    postController.getPost(request)
});

postsRouter.patch('/update',(request, response)=>{
    const postController = new PostController(response)
    postController.updatePost(request)
});

postsRouter.delete('/delete',(request, response)=>{
    const postController = new PostController(response)
    postController.deletePost(request)
});

postsRouter.get('/feed',(request, response)=>{
    const postController = new PostController(response)
    postController.feed(request)
});






export default postsRouter;

