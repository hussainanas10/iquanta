import dotenv from 'dotenv';

dotenv.config();

export default function () {
   process.iquanta = {
      app: {
         key: process.env.APP_KEY || "my_app_key",
         env: process.env.APP_ENV || "development",
         name: process.env.APP_NAME || "my site",
      },
      hash: {
        salt_round: 10,
        otp: 600,
        token: 600,
        refresh_token_expire: '90d',
        access_token_expire: '90d',
        hash_algorithm: '', // Ensure this is defined with a valid value.
        encrypt_algorithm: 'aes-256-gcm',
      },
     
   };
}
