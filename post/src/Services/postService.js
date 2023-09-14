import * as Exceptions from "../Exceptions/Exceptions.js";
import postRepository from "../Repositories/postRepository.js";
import Hash from "../Helpers/Hash.js";

export default class PostService {
   constructor() {
      this.postRepo = new postRepository();
   }

   async createPost(args) {
      try {
         const newPost = await this.postRepo.create({
              userid: args.user.userId,
              title: args.body.title,
              content: args.body.content,
              tags: args.body.tags,
          });
      
          return newPost;
         
      } catch (error) {
         console.log("logerr", error);
         throw error;
      }
   }

   async getPost(request) {
      try {
         let where = {};
         if (request.query.search) {
            where.OR = [
               {
                  title: {
                     contains: request.query.search,
                     mode: "insensitive",
                  },
               },
               {
                  content: {
                     contains: request.query.search,
                     mode: "insensitive",
                  },
               },
               {
                  tags: {
                     contains: request.query.search,
                     mode: "insensitive",
                  },
               },
            ];
         }
         console.log(where);
         // const user = await prisma.posts.findMany(obj);
         const posts = await this.postRepo.findAll({
            where,
         });
   
         return posts;
      } catch (error) {
         console.log("logerr", error);
         throw error;
      }
   }
   

   async getPostById(args) {
      try {
         let post=await this.postRepo.find({id:args.query.id})
         if(!post){
               throw new Exceptions.NotFoundException();
         }
         return post;
      } catch (error) {
         console.log("logerr", error);
         throw error;
      }
   }

   async updatePost(args) {
      try {
         let post=await this.postRepo.find({id:args.query.id})
         if(!post){
               throw new Exceptions.NotFoundException();
         }
         const updatedPost = await this.postRepo.update(args.query.id, {
              title: args.body.title || post.title,
              content: args.body.content || post.content,
              tags: args.body.tags || post.tags,
          });
      
          return updatedPost;
         
      } catch (error) {
         console.log("logerr", error);
         throw error;
      }
   }

   async deletePost(args) {
      try {
         let params=args.query 
         let post=await this.postRepo.find({id:params.postId})
         if(!post){
               throw new Exceptions.NotFoundException();
         }
         const deletedPost = await this.postRepo.delete(params.postId);
         if(deletedPost){
            return "deleted";
         }
         return "Cannot delete"
      } catch (error) {
         console.log("logerr", error);
         throw error;
      }
   }

   
   async feed(interestToMatch){
      try {
         const feed = await this.postRepo.feed(interestToMatch.query.search)
         if(!feed){
            throw new Exceptions.NotFoundException();
         }
        return feed
       } catch (error) {
         console.error('Error fetching users by interest:', error);
         throw error;
       } 
   }
}
