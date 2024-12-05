
import { StatusCodes } from "http-status-codes";

import { createWorkspaceService } from "../service/workspaceService.js";
import { getWorkspacesUserIsMemberOfService } from "../service/workspaceService.js";
import { deleteWorkspaceService ,getWorkspaceService } from "../service/workspaceService.js";
import { customErrorResponse, 
         internalErrorResponse, 
         successResponse 
    } from "../utils/common/responseObjects.js";

export const createWorkspaceController = async (req, res) => {
    try{
        const response = await createWorkspaceService({
            ...req.body,
            owner: req.user
        });

        return res.status(StatusCodes.CREATED).json(successResponse(response, 'Workspace created successfully'));

    }catch(error){
        console.log(error);

        if(error.statusCode){
            return res.status(error.statusCode).json(
              customErrorResponse(error)
            );
        }

        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalErrorResponse(error));
    }
};

export const getWorkspacesUserIsMemberOfController = async (req, res) => {
    try {
      const response = await getWorkspacesUserIsMemberOfService(req.user);
      return res
        .status(StatusCodes.OK)
        .json(successResponse(response, 'Workspaces fetched successfully'));
    } catch (error) {
      console.log(error);
      if (error.statusCode) {
        return res.status(error.statusCode).json(customErrorResponse(error));
      }
  
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalErrorResponse(error));
    }
  }; 

  export const deleteWorkspaceController = async (req, res) => {
    try {
      const response = await deleteWorkspaceService(
        req.params.workspaceId,
        req.user
      );
      return res
        .status(StatusCodes.OK)
        .json(successResponse(response, 'Workspace deleted successfully'));
    } catch (error) {
      console.log(error);
      if (error.statusCode) {
        return res.status(error.statusCode).json(customErrorResponse(error));
      }
  
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalErrorResponse(error));
    }
  };

  export const getWorkspaceController = async (req, res) => {
    try {
      const response = await getWorkspaceService(
        req.params.workspaceId,
        req.user
      );
      return res
        .status(StatusCodes.OK)
        .json(successResponse(response, 'Workspace deleted successfully'));
    } catch (error) {
      console.log(error);
      if (error.statusCode) {
        return res.status(error.statusCode).json(customErrorResponse(error));
      }
  
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalErrorResponse(error));
    }
  };

  