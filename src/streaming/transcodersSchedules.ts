import { sendDelete, sendGet, sendPost, sendPut } from './internal/httpHelpers';
import * as Urls from '../urls';
import {
    CreateTranscoderScheduleRequest,
    TranscoderSchedule,
    UpdateTranscoderScheduleRequest,
    ListTranscoderSchedulesSortOptions,
} from './types/transcodersSchedules';

/**
 * Creates a Schedule for Transcoders specified.
 *
 * @remarks Cloud transcoder is not currently available for general usage.
 * If you would like to opt in, please contact our Sales team.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/transcoder-scheduler-create-schedule/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param schedule Information about the new cloud transcoder.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link TranscoderSchedule} object.
 */
export const createSchedule = async (apiSecret: string, schedule: CreateTranscoderScheduleRequest): Promise<TranscoderSchedule> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/transcoders/schedule',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(schedule),
    };

    return await sendPost<TranscoderSchedule>(options);
};

/**
 * ## Delete Transcoder Schedule
 *
 * Deletes a Transcoder schedule by its Schedule ID. Schedule ID can be found from {@link createSchedule | Create}/{@link getSchedule | Get} Transcoder Schedule response.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/transcoder-scheduler-delete-schedule/}
 *
 * @remarks Cloud transcoder is not currently available for general usage.
 * If you would like to opt in, please contact our Sales team.
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param scheduleId Identifier of the cloud transcoder schedule to delete.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a flag to indicate if the operation succeeded or not.
 */
export const deleteTranscoder = async (apiSecret: string, scheduleId: string): Promise<boolean> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/transcoders/schedule/${scheduleId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendDelete<boolean>(options);
};

/**
 * Updates a Transcoder Schedule by its Schedule ID.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/transcoder-scheduler-update-schedule/}
 *
 * @remarks Cloud transcoder is not currently available for general usage.
 * If you would like to opt in, please contact our Sales team.
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param scheduleId Identifier of the cloud transcoder schedule to retrieve.
 * @param schedule Settings of the cloud transcoder schedule to update.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link TranscoderSchedule} object.
 */
export const updateSchedule = async (apiSecret: string, scheduleId: string, schedule: UpdateTranscoderScheduleRequest): Promise<TranscoderSchedule> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/transcoders/schedule/${scheduleId}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(schedule),
    };

    return await sendPut<TranscoderSchedule>(options);
};

/**
 * Gets the specified cloud transcoder schedule.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/transcoder-scheduler-get-schedule-by-schedule-id/}
 *
 * @remarks Cloud transcoder is not currently available for general usage.
 * If you would like to opt in, please contact our Sales team.
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param scheduleId Identifier of the cloud transcoder schedule to retrieve.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link TranscoderSchedule} object.
 */
export const getSchedule = async (apiSecret: string, scheduleId: string): Promise<TranscoderSchedule> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/transcoders/schedule/${scheduleId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<TranscoderSchedule>(options);
};

/**
 * ## Lists all Transcoder Schedules.
 *
 * Sort by Created Date by default. Able to be filtered by Schedule Status.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/transcoder-scheduler-list-all-schedules/}
 *
 * @remarks Cloud transcoder is not currently available for general usage.
 * If you would like to opt in, please contact our Sales team.
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param options Options to sort the response.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of {@link TranscoderSchedule} objects.
 */
export const listSchedules = async (apiSecret: string, options: ListTranscoderSchedulesSortOptions): Promise<TranscoderSchedule[]> => {
    const params = {
        sortBy: options.sortBy,
        page: options.page.toString(),
        itemsOnPage: options.itemsOnPage.toString(),
        isDescending: (options.isDescending ?? false).toString(),
    };

    if (options.status) {
        params['status'] = options.status;
    }

    const queryOptions = {
        hostname: Urls.getRtsHostname(),
        path: '/api/transcoders/schedule/list',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<TranscoderSchedule[]>(queryOptions);
};

/**
 * ## Lists all Transcoder Schedules.
 *
 * Sort by Created Date by default. Able to be filtered by Schedule Status.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/transcoder-scheduler-get-schedules-for-transcoder/}
 *
 * @remarks Cloud transcoder is not currently available for general usage.
 * If you would like to opt in, please contact our Sales team.
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param transcoderId Identifier of the transcoder to search the scheduled for.
 * @param options Options to sort the response.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of {@link TranscoderSchedule} objects.
 */
export const listSchedulesByTranscoder = async (
    apiSecret: string,
    transcoderId: string,
    options: ListTranscoderSchedulesSortOptions
): Promise<TranscoderSchedule[]> => {
    const params = {
        sortBy: options.sortBy,
        page: options.page.toString(),
        itemsOnPage: options.itemsOnPage.toString(),
        isDescending: (options.isDescending ?? false).toString(),
    };

    if (options.status) {
        params['status'] = options.status;
    }

    const queryOptions = {
        hostname: Urls.getRtsHostname(),
        path: `/api/transcoders/${transcoderId}/schedule/list`,
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<TranscoderSchedule[]>(queryOptions);
};
