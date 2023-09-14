import { prisma } from "../../Db/prisma.service.js";

export default class UserRepository {
   async find(userObj = {}) {
      try {
         const user = await prisma.user.findUnique({
            where: {
               email: userObj.email,
            },
         });
         return user;
      } catch (error) {
         // throw new Error
         console.log(error);
      }
   }

   async findAll(userObj = {}) {
      try {
         const user = await prisma.user.findMany({
               where: userObj,
            
         });
         return user;
      } catch (error) {
         console.log(error);
      }
   }

   async create(userObj) {
    try {
        console.log(userObj);
       const newUser = await prisma.user.create({
          data: {
             firstName: userObj?.firstName,
             lastName: userObj?.lastName,
             userName: userObj?.userName,
             password:userObj?.password,
             dob: userObj?.dob,
             bio: userObj?.bio,
             interest: userObj.interest,
             email:userObj?.email,
             refreshToken:userObj?.refreshToken
          },
       });
       return newUser;
    } catch (error) {
       throw error;
    }
 }
 

  
   async update(userObj) {
      try {
         const updatedUser = await prisma.user.update({
            where: { id: userObj.id },
            data:{
               refreshToken:userObj?.refreshToken
            },
         });
         return updatedUser;
      } catch (error) {
         throw error;
      }
   }
}
