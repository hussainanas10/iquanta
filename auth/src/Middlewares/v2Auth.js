import { jwtAuthVerifyV2 } from '../Helpers/Common';
import Logger from '../Helpers/Logger';

export default async function v2Auth(request, response, next) {
    try {
      request.context = {
        user: null,
        account: null,
      };
    
      const jwtToken = request.headers['x-refresh-token'] || request.headers['x-access-token'];
      if (!jwtToken) {
        console.log('jwt token not found', request.context);
        next();
        return; // Return to prevent further execution
      }
  
      try {
        const responseBody = await jwtAuthVerifyV2Async(jwtToken); // Assuming jwtAuthVerifyV2 is asynchronous
        request.context = responseBody;
      } catch (err) {
        request.context = { error: err };
        Logger.error(`Error in jwt Verify Token: ${err}`);
      }
    } catch (error) {
      Logger.error(error);
    } finally {
      next();
    }
  }
  