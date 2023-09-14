
import crypto from "crypto";
import jwt from "jsonwebtoken";
import hasher from "argon2";

export default class Hash {

   static generateHash(value) {
      return hasher.hash(value);
   }


   static compareHash(hash, value){
    return hasher.verify(hash, value);
   }

   

   static generateToken(obj, expireTime){
    return (expireTime) ? jwt.sign(obj, 'my_app_key', { expiresIn: expireTime }) : jwt.sign(obj, 'my_app_key');
    
   }

   static verifyToken(token) {
    console.log(token);
    return jwt.verify(token, 'my_app_key');
  }

   static encrypt(data) {
    const cipher = crypto.createCipher(
      'aes-256-gcm',
      'my_app_key',
    );
    let crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }


  static decrypt(encryptedData) {
    const decipher = crypto.createDecipher(
      process.iqunata.hash.encrypt_algorithm,
      'my_app_key',
    );
    let dec = decipher.update(encryptedData, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }
}
