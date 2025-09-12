import { sendDelete, sendGet, sendPost, sendPut } from './internal/httpHelpers';
import * as Urls from '../urls';
import {
    ListTranscodersSortOptions,
    ListTranscodersInstancesSortOptions,
    ListTranscodersProfilesSortOptions,
    Transcoder,
    TranscoderProfile,
    TranscoderInstance,
    CreateTranscoderRequest,
    UpdateTranscoderRequest,
} from './types/transcoders';

/**
 * Lists all transcoders.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/transcoder-list-transcoders/}
 *
 * @remarks Cloud transcoder is not currently available for general usage.
 * If you would like to opt in, please contact our Sales team.
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param options Options to sort the response.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of {@link Transcoder} objects.
 */
export const listTranscoders = async (apiSecret: string, options: ListTranscodersSortOptions): Promise<Transcoder[]> => {
    const params = {
        sortBy: options.sortBy,
        page: options.page.toString(),
        itemsOnPage: options.itemsOnPage.toString(),
        isDescending: (options.isDescending ?? false).toString(),
    };

    if (options.status) {
        params['status'] = options.status;
    }

    if (options.cluster) {
        params['cluster'] = options.cluster;
    }

    if (options.transcoderName) {
        params['transcoderName'] = options.transcoderName;
    }

    const queryOptions = {
        hostname: Urls.getRtsHostname(),
        path: '/api/transcoders',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<Transcoder[]>(queryOptions);
};

/**
 * Gets the specified cloud transcoder.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/transcoder-get-transcoder/}
 *
 * @remarks Cloud transcoder is not currently available for general usage.
 * If you would like to opt in, please contact our Sales team.
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param transcoderId Identifier of the cloud transcoder to retrieve.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link Transcoder} object.
 */
export const getTranscoder = async (apiSecret: string, transcoderId: string): Promise<Transcoder> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/transcoders/${transcoderId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<Transcoder>(options);
};

/**
 * Deletes the specified cloud transcoder.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/transcoder-delete-transcoder/}
 *
 * @remarks Cloud transcoder is not currently available for general usage.
 * If you would like to opt in, please contact our Sales team.
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param transcoderId Identifier of the cloud transcoder to delete.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a flag to indicate if the operation succeeded or not.
 */
export const deleteTranscoder = async (apiSecret: string, transcoderId: number): Promise<boolean> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/transcoders/${transcoderId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendDelete<boolean>(options);
};

/**
 * ## Creates a cloud transcoder.
 *
 * Create a Cloud Transcoder to enable Adaptive Bitrate (ABR) Simulcast streams without requiring multiple broadcast contribution sources.
 *
 * A Transcoder represents the configuration of your bitrate ladder from a pre-defined profile or by setting the maximum height and frameRate you'd like to target.
 * See the 'List Transcoder Profiles' endpoint to find available Transcoder profiles. If you specify both a profile id and height/frameRate settings only the profile will be used.
 *
 * You should update any broadcast encoders to use this new origin server as configured by the DNS of the Transcoder which can be found in the response data.
 *
 * @remarks There are additional charges for a Transcoder so you should use
 * the {@link stopTranscoder | Stop Transcoder} and {@link startTranscoder | Start Transcoder} capabilities
 * to enable cloud transcoding only when you need to broadcast.
 *
 * Cloud transcoder is not currently available for general usage.
 * If you would like to opt in, please contact our Sales team.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/transcoder-create-transcoder/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param transcoder Information about the new cloud transcoder.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link Transcoder} object.
 */
export const createTranscoder = async (apiSecret: string, transcoder: CreateTranscoderRequest): Promise<Transcoder> => {
    if (transcoder.startNow == null) {
        transcoder.startNow = false;
    }
    if (transcoder.passThrough == null) {
        transcoder.passThrough = false;
    }
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/transcoders/',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(transcoder),
    };

    return await sendPost<Transcoder>(options);
};

/**
 * ## Configures an existing Transcoder.
 *
 * Make changes to the configuration of an existing Transcoder.
 * Changes should take effect without requiring a server restart except for DNS prefix and cluster,
 * which can only be updated when the transcoder is in a shutdown state.
 *
 * Changing the profile will require either a profile id or the height, frameRate, and passThrough.
 * If you specify both, only the profile will be used.
 * See the {@link listTranscoders | List Transcoder Profiles} to find available Transcoder profiles.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/transcoder-update-transcoder/}
 *
 * @remarks Cloud transcoder is not currently available for general usage.
 * If you would like to opt in, please contact our Sales team.
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param transcoderId Identifier of the cloud transcoder to update.
 * @param transcoder Settings of the cloud transcoder to update.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link Transcoder} object.
 */
export const updateTranscoder = async (apiSecret: string, transcoderId: string, transcoder: UpdateTranscoderRequest): Promise<Transcoder> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/transcoders/${transcoderId}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(transcoder),
    };

    return await sendPut<Transcoder>(options);
};

/**
 * ## Starts the cloud transcoder.
 *
 * Enable a Transcoder by ID to accept incoming broadcast sources.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/transcoder-start-transcoder/}
 *
 * @remarks Cloud transcoder is not currently available for general usage.
 * If you would like to opt in, please contact our Sales team.
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param transcoderId Identifier of the cloud transcoder to start.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a flag to indicate if the operation succeeded or not.
 */
export const startTranscoder = async (apiSecret: string, transcoderId: string): Promise<boolean> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/transcoders/start/${transcoderId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendPut<boolean>(options);
};

/**
 * ## Stops the cloud transcoder.
 *
 * Disable a Transcoder by ID so that it will shutdown and no longer accept incoming broadcast sources.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/transcoder-stop-transcoder/}
 *
 * @remarks Cloud transcoder is not currently available for general usage.
 * If you would like to opt in, please contact our Sales team.
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param transcoderId Identifier of the cloud transcoder to stop.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a flag to indicate if the operation succeeded or not.
 */
export const stopTranscoder = async (apiSecret: string, transcoderId: string): Promise<boolean> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/transcoders/stop/${transcoderId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendPut<boolean>(options);
};

/**
 * Lists all transcoder instances.
 *
 * Information on each instance is available for up to 90 days from its end date.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/transcoder-list-transcoder-instances/}
 *
 * @remarks Cloud transcoder is not currently available for general usage.
 * If you would like to opt in, please contact our Sales team
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param options Options to sort the response.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of {@link TranscoderInstance} objects.
 */
export const listTranscoderInstances = async (apiSecret: string, options: ListTranscodersInstancesSortOptions): Promise<TranscoderInstance[]> => {
    const params = {
        sortBy: options.sortBy,
        page: options.page.toString(),
        itemsOnPage: options.itemsOnPage.toString(),
        isDescending: (options.isDescending ?? false).toString(),
    };

    if (options.status) {
        params['status'] = options.status;
    }
    if (options.transcoderId) {
        params['transcoderId'] = options.transcoderId;
    }
    if (options.startDate) {
        params['startDate'] = options.startDate;
    }
    if (options.endDate) {
        params['endDate'] = options.endDate;
    }

    const queryOptions = {
        hostname: Urls.getRtsHostname(),
        path: '/api/transcoders/instances',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<TranscoderInstance[]>(queryOptions);
};

/**
 * Gets the specified cloud transcoder instance.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/transcoder-get-transcoder-instance/}
 *
 * @remarks Cloud transcoder is not currently available for general usage.
 * If you would like to opt in, please contact our Sales team.
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param transcoderInstanceId Identifier of the cloud transcoder instance to retrieve.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link TranscoderInstance} object.
 */
export const getTranscoderInstance = async (apiSecret: string, transcoderInstanceId: string): Promise<TranscoderInstance> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/transcoders/instances/${transcoderInstanceId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<TranscoderInstance>(options);
};

/**
 * Lists all transcoder profiles.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/transcoder-list-transcoder-profiles/}
 *
 * @remarks Cloud transcoder is not currently available for general usage.
 * If you would like to opt in, please contact our Sales team.
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param options Options to sort the response.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of {@link TranscoderProfile} objects.
 */
export const listTranscoderProfiles = async (apiSecret: string, options: ListTranscodersProfilesSortOptions): Promise<TranscoderProfile[]> => {
    const params = {
        sortBy: options.sortBy,
        page: options.page.toString(),
        itemsOnPage: options.itemsOnPage.toString(),
        isDescending: (options.isDescending ?? false).toString(),
    };

    const queryOptions = {
        hostname: Urls.getRtsHostname(),
        path: '/api/transcoders/profiles',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<TranscoderProfile[]>(queryOptions);
};

/** APIs related to the transcoder schedulers. */
export * as scheduler from './transcodersSchedules';
