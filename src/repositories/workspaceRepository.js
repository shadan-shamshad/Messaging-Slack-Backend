import { StatusCodes } from 'http-status-codes';

import User from '../schema/user.js';
import Workspace from '../schema/workspace.js';
import ClientError from '../utils/errors/clientError.js';
import channelRepository from './channelRepository.js';
import crudRepository from './crudRepository.js';

const workspaceRepository = {
    ...crudRepository(Workspace),
   
    getWorkspaceByName: async function (workspaceName) {
        const workspace = await Workspace.findOne({name: workspaceName});
        
        // if not found workspace
        if(!workspace){
            throw new ClientError({
                explanation: "Invalid data sent from the Client",
                message: 'Workspace not found',
                statusCode: StatusCodes.NOT_FOUND
            });
        }
        return workspace;
    },

    getWorkspaceByJoinCode: async function (joinCode){
        const workspace = await Workspace.findOne({joinCode});
        
        // if not found workspace
        if(!workspace){
            throw new ClientError({
                explanation: "Invalid data sent from the Client",
                message: 'Workspace not found',
                statusCode: StatusCodes.NOT_FOUND
            });
        }
        return workspace;
    },

    addMemberToWorkspace: async function (workspaceId, memberId, role){
        const workspace = await Workspace.findById({workspaceId});

        if(!workspace){
            throw new ClientError({
                explanation: "Invalid data sent from the Client",
                message: 'Workspace not found',
                statusCode: StatusCodes.NOT_FOUND
            });
        }

        const isValidUser = await User.findById(memberId);
        if(!isValidUser){
            throw new ClientError({
                explanation: "Invalid data sent from the Client",
                message: 'User not found',
                statusCode: StatusCodes.NOT_FOUND
            });
        }

        const isMemberAlreadyPartOfWorkspace = workspace.members.find(
            (member) => member.memberId == memberId
        );

        if(isMemberAlreadyPartOfWorkspace){
            throw new ClientError({
                explanation: "Invalid data sent from the Client",
                message: 'User already part of workspace',
                statusCode: StatusCodes.FORBIDDEN
            });
        }
        workspace.members.push({
            memberId,
            role
        });

        await  workspace.save();

        return workspace;
    },

    addChannelToWorkspace: async function (workspaceId, channelName){
        const workspace = await Workspace.findById(workspaceId).populate('channels');

        if(!workspace){
            throw new ClientError({
                explanation: "Invalid data sent from the Client",
                message: 'Workspace not found',
                statusCode: StatusCodes.NOT_FOUND
            });
        }

        const isChannelAlreadyPartOfWorkspace = workspace.channels.find(
            (channel) => channel.name === channelName
        );

        if(isChannelAlreadyPartOfWorkspace){
            throw new ClientError({
                explanation: "Invalid data sent from Client",
                message: 'Channel already part of workspace',
                statusCode: StatusCodes.FORBIDDEN
            });
        }
       
        const channel = await channelRepository.create({
            name: channelName,
            workspaceId: workspaceId    
        });

        workspace.channels.push(channel);
        await  workspace.save();

        return workspace;
    },

    fetchAllWorkspaceByMemberId: async function (memberId){
        const workspaces = await Workspace.find({
            'members.memberId': memberId
        }).populate('members.memberId', 'username email avatar');

        return workspaces;
    }
};

export default workspaceRepository;