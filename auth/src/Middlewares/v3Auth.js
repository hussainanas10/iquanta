import { jwtAuthVerifyV3, oAuthVerifyV3 } from '../Helpers/Common';
import Validator from '../Validators/Validator';
import * as Exceptions from '../Exceptions/Exceptions';
import * as constants from '../constants/constants';

import Logger from '../Helpers/Logger';

async function validateJwtToken(request) {
    try {
      const jwtToken = request.headers['x-refresh-token'] || request.headers['x-access-token'];
  
      if (!jwtToken) {
        throw new Exceptions.UnauthorizedException("Please provide a valid jwt token");
      }
  
      const responseBody = await jwtAuthVerifyV3Async(jwtToken); // Assuming jwtAuthVerifyV3 is asynchronous
      return responseBody;
    } catch (error) {
      throw new Error(`Error in validateJwtToken: ${error.message}`);
    }
  }
  
  function validateAccountPermission(providedAccountIds, providedMappedAccountIds, accounts) {
    try {
      const accountIds = accounts.map(account => account.id);
  
      for (const currentAccountId of providedAccountIds) {
        if (!accountIds.includes(currentAccountId)) {
          throw new Exceptions.ValidationException(`You don't have access to accountId: ${currentAccountId}`);
        }
      }
  
      const mappedAccountIds = accounts
        .filter(account => providedAccountIds.includes(account.id) && account.info?.mappedAccounts)
        .map(account => account.info.mappedAccounts)
        .flat();
  
      for (const mappedAccountId of providedMappedAccountIds) {
        if (!mappedAccountIds.includes(mappedAccountId)) {
          throw new Exceptions.ValidationException(`You don't have access to browse mapped accountId: ${mappedAccountId}`);
        }
      }
  
      return true;
    } catch (error) {
      throw new Error(`Error in validateAccountPermission: ${error.message}`);
    }
  }

  function validateSchema(validationSchema, header) {
    try {
      const { error, value } = validationSchema.validate(header);
  
      if (error) {
        throw new Exceptions.ValidationException(error.details[0].message);
      }
  
      return value;
    } catch (error) {
      throw new Error(`Error in validateSchema: ${error.message}`);
    }
  }
  
  export default async function v3Auth(request, response, next) {
    try {
      request.context = {
        user: null,
        accountIds: null,
        mappedAccountIds: null,
        permissions: null
      };
  
      const internalToken = request.headers['x-internal-token'];
      const xAccountIds = JSON.parse(request.headers['x-account-ids'] || '[]');
      const xMappedAccountIds = JSON.parse(request.headers['x-mapped-account-ids'] || '[]');
      
      let accountIds = validateSchema(Validator.accountIds, { header_x_account_ids: xAccountIds })['header_x_account_ids'];
      let mappedAccountIds = validateSchema(Validator.mappedAccountIds, { header_x_mapped_account_ids: xMappedAccountIds })['header_x_mapped_account_ids'];
  
      let validated = false;
      let user = null;
      let permissions = null;
  
      if (internalToken && internalToken === process.enso.auth.internal_token) {
        user = {
          id: 0,
          name: 'Internal',
          email: 'internal@ensologic.com',
          type: 'internal'
        };
        permissions = [
          {
            id: 0,
            name: constants.INTERNAL_PERMISSION,
            is_active: 1,
            created_at: '2019-11-14T12:10:34.000Z',
            updated_at: '2019-11-14T12:10:34.000Z',
            deleted_at: null,
            created_by: null
          }
        ];
        validated = true;
      } else {
        const responseJson = await validateJwtToken(request);
        user = responseJson.user;
        permissions = responseJson.permissions;
        validateAccountPermission(accountIds, mappedAccountIds, responseJson.accounts);
        permissions = responseJson.permissions;
        validated = true;
      }
  
      if (validated) {
        request.context.accountIds = accountIds;
        request.context.mappedAccountIds = mappedAccountIds;
        request.context.user = user;
        request.context.permissions = permissions;
      }
    } catch (error) {
      request.context.error = error;
    }
    next();
  }
  
