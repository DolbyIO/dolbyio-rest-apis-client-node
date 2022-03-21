import { sendDelete, sendPost, sendPut } from '../internal/httpHelpers';
import { CreateConferenceOptions, Conference, UserTokens } from './types/conference';
import { SpatialEnvironment, SpatialListener, SpatialUsers } from './types/spatialAudio';
import JwtToken from './types/jwtToken';
import Participant from './types/participant';
import { RTCPMode } from './types/rtcpMode';

/**
 * Creates a conference.
 *
 * @link https://docs.dolby.io/communications-apis/reference/create-conference
 *
 * @param accessToken Access token to use for authentication.
 * @param ownerExternalId External ID of the owner of the conference.
 * @param options Options to create the conference.
 *
 * @returns A `Conference` object through a `Promise`.
 */
export const createConference = async (accessToken: JwtToken, options: CreateConferenceOptions): Promise<Conference> => {
    const parameters = {
        dolbyVoice: options.dolbyVoice ? options.dolbyVoice : true,
        liveRecording: options.liveRecording ? options.liveRecording : false,
        rtcpMode: options.rtcpMode ? options.rtcpMode : RTCPMode.Average,
    };

    if (options.pinCode) parameters['pincode'] = options.pinCode;
    if (options.ttl) parameters['ttl'] = options.ttl;
    if (options.videoCodec) parameters['videoCodec'] = options.videoCodec;

    const body = {
        ownerExternalId: options.ownerExternalId,
        parameters: parameters,
    };
    if (options.alias) body['alias'] = options.alias;

    if (options.participants) {
        const obj_participants = {};
        for (let index = 0; index < options.participants.length; index++) {
            const participant = options.participants[index];
            obj_participants[participant.externalId] = {
                permissions: participant.permissions,
                notification: participant.notify,
            };
        }
        body['participants'] = obj_participants;
    }

    const strBody = JSON.stringify(body);

    const requestOptions = {
        hostname: 'api.voxeet.com',
        path: '/v2/conferences/create',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
        body: strBody,
    };

    const response = await sendPost(requestOptions);
    return response as Conference;
};

/**
 * Invites participants to an ongoing conference. This API can also be used to generate new conference access tokens for an ongoing conference. If the invite request includes participants that are already in the conference, a new conference access token is not generated and an invitation is not sent.
 *
 * @link https://docs.dolby.io/communications-apis/reference/invite-to-conference
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 * @param participants List of participants to invite to the conference.
 *
 * @returns The list of user tokens for each participants.
 */
export const invite = async (accessToken: JwtToken, conferenceId: string, participants: Array<Participant>): Promise<UserTokens> => {
    const obj_participants = {};
    for (let index = 0; index < participants.length; index++) {
        const participant = participants[index];
        obj_participants[participant.externalId] = {
            permissions: participant.permissions,
            notification: participant.notify,
        };
    }

    const body = JSON.stringify({
        participants: obj_participants,
    });

    const options = {
        hostname: 'api.voxeet.com',
        path: `/v2/conferences/${conferenceId}/invite`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
        body,
    };

    const response = await sendPost(options);
    return response as UserTokens;
};

/**
 * Kicks participants from an ongoing conference.
 *
 * @link https://docs.dolby.io/communications-apis/reference/kick-from-conference
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 * @param externalIds External identifiers of the participants to kick our of the conference.
 */
export const kick = async (accessToken: JwtToken, conferenceId: string, externalIds: Array<string>): Promise<void> => {
    const body = JSON.stringify({
        externalIds: externalIds,
    });

    const options = {
        hostname: 'api.voxeet.com',
        path: `/v2/conferences/${conferenceId}/kick`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
        body,
    };

    await sendPost(options);
};

/**
 * Sends a message to some or all participants in a conference.
 *
 * @link https://docs.dolby.io/communications-apis/reference/send-message
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 * @param fromExternalId The external ID of the author of the message.
 * @param toExternalIds A list of external IDs that will receive the message. If empty, the message will be broadcasted to all participants in the conference.
 * @param message The message to send.
 */
export const sendMessage = async (
    accessToken: JwtToken,
    conferenceId: string,
    fromExternalId: string,
    toExternalIds: Array<string>,
    message: string
): Promise<void> => {
    const body = {
        from: fromExternalId,
        message: message,
    };

    if (toExternalIds && toExternalIds.length > 0) {
        body['to'] = toExternalIds;
    }

    const options = {
        hostname: 'api.voxeet.com',
        path: `/v2/conferences/${conferenceId}/message`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
        body: JSON.stringify(body),
    };

    await sendPost(options);
};

/**
 * Sets the spatial audio scene for all listeners in an ongoing conference. This sets the spatial audio environment, the position and direction for all listeners with the spatialAudio flag enabled. The calls are not cumulative, and each call sets all the spatial listener values. Participants who do not have a position set are muted.
 *
 * @link https://docs.dolby.io/communications-apis/reference/set-spatial-listeners-audio
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 * @param environment The spatial environment of an application, so the audio renderer understands which directions the application considers forward, up, and right and which units it uses for distance.
 * @param listener The listener's audio position and direction, defined using Cartesian coordinates.
 * @param users The users' audio positions, defined using Cartesian coordinates.
 */
export const setSpatialListenersAudio = async (
    accessToken: JwtToken,
    conferenceId: string,
    environment: SpatialEnvironment,
    listener: SpatialListener,
    users: SpatialUsers
): Promise<void> => {
    const body = JSON.stringify({
        environment: environment,
        listener: listener,
        users: users,
    });

    const options = {
        hostname: 'api.voxeet.com',
        path: `/v2/conferences/${conferenceId}/spatial-listeners-audio`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
        body,
    };

    await sendPut(options);
};

/**
 * Update permissions for participants in a conference. When a participant's permissions are updated, the new token is sent directly to the SDK. The SDK automatically receives, stores, and manages the new token and a `permissionsUpdated` event is sent.
 *
 * @link https://docs.dolby.io/communications-apis/reference/update-permissions
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 * @param participants List of the participants with their new permissions.
 *
 * @returns The list of user tokens for each participants.
 */
export const updatePermissions = async (accessToken: JwtToken, conferenceId: string, participants: Array<Participant>): Promise<UserTokens> => {
    const obj_participants = {};
    for (let index = 0; index < participants.length; index++) {
        const participant = participants[index];
        obj_participants[participant.externalId] = {
            permissions: participant.permissions,
            notification: participant.notify,
        };
    }

    const body = JSON.stringify({
        participants: obj_participants,
    });

    const options = {
        hostname: 'api.voxeet.com',
        path: `/v2/conferences/${conferenceId}/invite`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
        body,
    };

    const response = await sendPost(options);
    return response as UserTokens;
};

/**
 * Terminates an ongoing conference and removes all remaining participants from the conference.
 *
 * @link https://docs.dolby.io/communications-apis/reference/terminate-conference
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 */
export const terminate = async (accessToken: JwtToken, conferenceId: string): Promise<void> => {
    const options = {
        hostname: 'api.voxeet.com',
        path: `/v2/conferences/${conferenceId}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    await sendDelete(options);
};

/**
 * @deprecated
 * Destroys an ongoing conference and removes all remaining participants from the conference.
 *
 * @link https://docs.dolby.io/communications-apis/reference/destroy-conference
 *
 * @param consumerKey Your Dolby.io Consumer Key.
 * @param consumerSecret Your Dolby.io Consumer Secret.
 * @param conferenceId Identifier of the conference.
 */
export const destroy = async (consumerKey: string, consumerSecret: string, conferenceId: string): Promise<void> => {
    const authz = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    const options = {
        hostname: 'session.voxeet.com',
        path: `/v1/conferences/${conferenceId}/destroy`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Basic ${authz}`,
        },
    };

    await sendPost(options);
};
