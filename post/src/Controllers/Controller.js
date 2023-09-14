// const Logger = require('../Helpers/Logger.js');
export default class Controller {
   constructor(response) {
      this.response = response;
   }


  /**
   * validate params
   * @param {} request 
   * @param {} validationSchema
   * @param {} withAccountUser
   */

  /**
   * common method for sending success response
   * @param {*} data 
   */
  sendResponse(data) {
    this.response.status(200).json({ data });
  }

  /**
   * method for handling exceptions 
   * @param {*} error 
   */
  handleException(error) {
   
    //masking db exceptions
    if (error.sql) {
      error.name = 'DbException';
    }

    switch (error.name) {
      case 'GeneralException':
        this.response.status(501).json({ error: error.message });
        // Logger.error(new Error(error));
        break;
      case 'UnauthorizedException':
        // Logger.error('UnauthorizedException: %s', error.message);
        this.response.status(401).json({ error: error.message });
        break;
      case 'NotFoundException':
        // Logger.error('NotFoundException: %s', error.message);
        this.response.status(404).json({ error: error.message });
        break;
      case 'ConflictException':
        // Logger.error('ConflictException: %s', error.message);
        this.response.status(409).json({ error: error.message });
        break;
      case 'ValidationException':
        // Logger.error('ValidationException: %s', error.message);
        this.response.status(422).json({ error: error.message });
        break;
      case 'ForbiddenException':
        // Logger.error('ForbiddenException: %s', error.message);
        this.response.status(403).json({ error: error.message });
        break;
      case 'BadRequestException':
        // Logger.error('BadRequestException: %s', error.message);
        this.response.status(400).json({ error: error.message });
        break;
      case 'PermissionDeniedException':
        // Logger.error('PermissionDeniedException: %s', error.message);
        this.response.status(403).json({ error: error.message });
        break;
      default:
        // Logger.error(new Error(error));
        this.response.status(501).json({ error: 'unable to process request!, please try later' });
        break;
    }
  }
}