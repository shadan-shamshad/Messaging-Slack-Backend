import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/serverConfig.js'
import userRepository from '../repositories/userRepository.js'
import { 
    customErrorResponse,
    internalErrorResponse 
} from  '../utils/common/responseObjects.js';

export const isAuthenticated = async (req, res, next) => {
    try{
          const token = req.headers['x-access-token'];
        
          // If token is not present
        if(!token){
                return res.status(StatusCodes.FORBIDDEN).json(
                    customErrorResponse({
                      message: "No auth token provided"
                    })
                );
          }
          // If token is present
        const response = jwt.verify(token, JWT_SECRET);

        //If token response is not working fine
        if(!response){
            return res.status(StatusCodes.FORBIDDEN).json(
                customErrorResponse({
                    explanation: "Invalid data sent from the client",
                    message: "Invalid auth token provided"
                })
            );
      }
      // if token is valid
    const user = await userRepository.getById(response.id);
    req.user = user.id;
    next();
          
    }catch(error){
        console.log('Auth middleware error', error);
        if(error.name === 'jsonWebTokenError'){
            return res.status(StatusCodes.FORBIDDEN).json(
                customErrorResponse({
                        explanation: "Invalid data sent from the client",
                        message: "Invalid auth token provided"
                })
            );
        }

        // if the error is coming of something else
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            internalErrorResponse(error)
        );
    }
}

