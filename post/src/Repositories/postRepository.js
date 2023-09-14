import { prisma } from "../../Db/prisma.service.js";

export default class UserRepository {
   async find(postObj = {}) {
      try {
         const posts = await prisma.posts.findUnique({
            where: {
               id: postObj.id,
            },
         });
         return posts;
      } catch (error) {
         // throw new Error
         console.log(error);
      }
   }

   async findAll(obj) {
      try {
         const user = await prisma.posts.findMany(obj);
         return user;
      } catch (error) {
         console.log(error);
      }
   }

   async create(postObj) {
    try {
       const newUser = await prisma.posts.create({
         data:{
            userid: postObj.userid,
              title: postObj.title,
              content: postObj.content,
              tags: postObj.tags,
         }
       });
       return newUser;
    } catch (error) {
       throw error;
    }
 }
 

  
 async update(postId, postData) {
   try {
      const updatedPost = await prisma.posts.update({
         where: { id: postId },
         data: postData,
      });
      return updatedPost;
   } catch (error) {
      throw error;
   }
}


   async delete(id) {
      try {
         const deletedPost = await prisma.posts.delete({
            where: {
              id:String(id),
            },
          });
         return deletedPost;
      } catch (error) {
         throw error;
      }
   }

   async feed(interestToMatch) {
      try {
         const usersWithInterest = await prisma.posts.findMany({
            where: {
               tags: {
                 contains: interestToMatch,
                 mode:"insensitive"
               },
             },
          });
      
          return usersWithInterest;
      } catch (error) {
         throw error;
      }
   }
  
   
}
