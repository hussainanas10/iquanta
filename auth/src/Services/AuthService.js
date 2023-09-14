import * as Exceptions from "../Exceptions/Exceptions.js";
import UserRepository from "../Repositories/UserRepository.js";
import Hash from "../Helpers/Hash.js";

export default class AuthService {
   constructor() {
      this.userRepo = new UserRepository();
   }

   async login(args) {
      try {
         const user = await this.userRepo.find({ email: args.email });
         if (!user) {
            throw new Exceptions.NotFoundException();
         }

         const passwordMatch = await Hash.compareHash(user.password, args.password);
         if (!passwordMatch) {
            throw new Exceptions.NotFoundException("Invalid username or password");
         }
         const encryptedEmail = await Hash.encrypt(user.email);
         const accessToken = await Hash.generateToken({ email: encryptedEmail,userId:user.id }, process.iquanta.hash.access_token_expire);

         let refreshToken = user.refreshToken;
         try {
            await Hash.verifyToken(refreshToken);
         } catch (error) {
          console.log(error);
            refreshToken = await Hash.generateToken({ email: encryptedEmail,userId:user.id }, process.iquanta.hash.refresh_token_expire);
            // user.set("refresh_token", refreshToken);
            user.refreshToken = refreshToken;
         }
         await this.userRepo.update(user);
         user['accesstoken']=accessToken
         return user;
      } catch (error) {
         console.log("logerr", error);
         throw error;
      }
   }


   //register

   async register(args) {
      try {
         const user = await this.userRepo.find({ email: args.email });
         if (user) {
            throw new Exceptions.ConflictException();
         }
         const encryptedEmail = await Hash.encrypt(args.email);

         const hashedPassword = await Hash.generateHash(args.password);


         const refreshToken = await Hash.generateToken({ email: encryptedEmail }, process.iquanta.hash.refresh_token_expire);
         let newUser = await this.userRepo.create({
          firstName: args.firstName,
          lastName: args.lastName,
          email:args.email,
          password:hashedPassword,
          userName: args.userName,
          dob: args.dob,
          bio: args.bio,
          interest: args.interest ? args.interest.split(',').map((item) => item.trim()) : [],
          refreshToken:refreshToken
       });
       const accessToken = await Hash.generateToken({ email: encryptedEmail ,userId:newUser.id}, process.iquanta.hash.access_token_expire);

       newUser['accessToken']=accessToken
         return newUser;
      } catch (error) {
        console.log(error);
         throw error;
      }
   }

   async verifyToken(args) {
      try {
         const user = await this.userRepo.find({ email: args.email });
         if (user) {
            throw new Exceptions.ConflictException();
         }
         const encryptedEmail = await Hash.encrypt(args.email);

         const hashedPassword = await Hash.generateHash(args.password);


         const refreshToken = await Hash.generateToken({ email: encryptedEmail }, process.iquanta.hash.refresh_token_expire);
         let newUser = await this.userRepo.create({
          firstName: args.firstName,
          lastName: args.lastName,
          email:args.email,
          password:hashedPassword,
          userName: args.userName,
          dob: args.dob,
          bio: args.bio,
          interest: args.interest ? args.interest.split(',').map((item) => item.trim()) : [],
          refreshToken:refreshToken
       });
       const accessToken = await Hash.generateToken({ email: encryptedEmail ,userId:newUser.id}, process.iquanta.hash.access_token_expire);

       newUser['accessToken']=accessToken
         return newUser;
      } catch (error) {
        console.log(error);
         throw error;
      }
   }

    
}
