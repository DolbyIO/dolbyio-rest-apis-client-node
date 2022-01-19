import { sendGet } from '../../internal/httpHelpers';
import { getAll } from '../internal/httpHelpers';
import JwtToken from '../types/jwtToken';
import {
    ListConferencesOptions,
    ListAllConferencesOptions,
    ListConferencesResponse,
    Conference,
    Statistics,
    ListParticipantsOptions,
    ListAllParticipantsOptions,
    ParticipantsResponse,
    Participant,
} from '../types/conferences';
import { PagedResponse } from '../types/core';

/**
 * Get a list of conferences that were started in a specific time range, including ongoing conferences.
 *
 * **Note:** Only terminated conferences include a complete summary.
 * The summary of ongoing conferences includes the following fields in the response: `confId`, `alias`, `region`, `dolbyVoice`, `start`, `live`, `owner`.
 *
 * @link https://docs.dolby.io/communications-apis/reference/getconferences
 *
 * @param accessToken Access token to use for authentication.
 * @param options Options to request the conferences.
 *
 * @returns A `ListConferencesResponse` object through a `Promise`.
 */
export const listConferences = async (accessToken: JwtToken, options: ListConferencesOptions): Promise<ListConferencesResponse> => {
    const optionsDefault: ListConferencesOptions = {
        from: 0,
        to: 9999999999999,
        max: 100,
        active: false,
        livestats: false,
    };

    const opts = Object.assign(optionsDefault, options);

    const params = {
        from: opts.from.toString(),
        to: opts.to.toString(),
        max: opts.max.toString(),
        active: opts.active.toString(),
        livestats: opts.livestats.toString(),
    };

    if (opts.start) {
        params['start'] = opts.start;
    }
    if (opts.alias) {
        params['alias'] = opts.alias;
    }
    if (opts.exid) {
        params['exid'] = opts.exid;
    }

    const requestOptions = {
        hostname: 'api.voxeet.com',
        path: '/v1/monitor/conferences',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    const response = await sendGet(requestOptions);
    return response as ListConferencesResponse;
};

/**
 * Get a list of all the conferences that were started in a specific time range, including ongoing conferences.
 *
 * **Note:** Only terminated conferences include a complete summary.
 * The summary of ongoing conferences includes the following fields in the response: `confId`, `alias`, `region`, `dolbyVoice`, `start`, `live`, `owner`.
 *
 * @link https://docs.dolby.io/communications-apis/reference/getconferences
 *
 * @param accessToken Access token to use for authentication.
 * @param options Options to request the conferences.
 *
 * @returns An array of `Conference` objects through a `Promise`.
 */
export const listAllConferences = async (accessToken: JwtToken, options: ListAllConferencesOptions): Promise<Array<Conference>> => {
    const optionsDefault: ListAllConferencesOptions = {
        from: 0,
        to: 9999999999999,
        page_size: 100,
        active: false,
        livestats: false,
    };

    const opts = Object.assign(optionsDefault, options);

    const params = {
        from: opts.from.toString(),
        to: opts.to.toString(),
        max: opts.page_size.toString(),
        active: opts.active.toString(),
        livestats: opts.livestats.toString(),
    };

    if (opts.alias) {
        params['alias'] = opts.alias;
    }
    if (opts.exid) {
        params['exid'] = opts.exid;
    }

    const requestOptions = {
        hostname: 'api.voxeet.com',
        path: '/v1/monitor/conferences',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    return await getAll<Conference>(requestOptions, 'conferences');
};

/**
 * Get a summary of a conference.
 *
 * **Note:** Only terminated conferences include a complete summary.
 * The summary of ongoing conferences includes the following fields in the response: `confId`, `alias`, `region`, `dolbyVoice`, `start`, `live`, `owner`.
 *
 * @link https://docs.dolby.io/communications-apis/reference/getconferencesummary
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId The identifier of the conference.
 * @param livestats For live conferences, the number of `user`, `listener`, and `pstn` participants.
 *
 * @returns A `Conference` object through a `Promise`.
 */
export const getConference = async (accessToken: JwtToken, conferenceId: string, livestats: boolean = false): Promise<Conference> => {
    const options = {
        hostname: 'api.voxeet.com',
        path: `v1/monitor/conferences/${conferenceId}?livestats=${livestats}`,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    const response = await sendGet(options);
    return response as Conference;
};

/**
 * Get statistics of a terminated conference. The statistics include the maximum number of participants present during a conference and the maximum number of the transmitted and received packets, bytes, and streams.
 *
 * **Note:** Only terminated conferences include a complete summary.
 *
 * @link https://docs.dolby.io/communications-apis/reference/getconferencestatistics
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId The identifier of the conference.
 *
 * @returns A `Statistics` object through a `Promise`.
 */
export const getConferenceStatistics = async (accessToken: JwtToken, conferenceId: string): Promise<Statistics> => {
    const options = {
        hostname: 'api.voxeet.com',
        path: `/v1/monitor/conferences/${conferenceId}/statistics`,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    const response = await sendGet(options);
    return response as Statistics;
};

/**
 * Get statistics and connection details of all participants in a conference. Optionally limit the search result with a specific time range.
 *
 * @link https://docs.dolby.io/communications-apis/reference/getconferenceparticipants
 *
 * @param accessToken Access token to use for authentication.
 * @param options Options to request the participants.
 *
 * @returns A `ParticipantsResponse` object through a `Promise`.
 */
export const getConferenceParticipants = async (accessToken: JwtToken, options: ListParticipantsOptions): Promise<ParticipantsResponse> => {
    const optionsDefault: ListParticipantsOptions = {
        confId: options.confId,
        from: 0,
        to: 9999999999999,
        max: 100,
    };

    const opts = Object.assign(optionsDefault, options);

    let path = `/v1/monitor/conferences/${opts.confId}/participants`;
    if (opts.userId) {
        path += `/${opts.userId}`;
    }

    const params = {
        from: opts.from.toString(),
        to: opts.to.toString(),
        max: opts.max.toString(),
    };

    if (opts.start) {
        params['start'] = opts.start;
    }
    if (opts.type) {
        params['type'] = opts.type;
    }

    const requestOptions = {
        hostname: 'api.voxeet.com',
        path: path,
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    const response = await sendGet(requestOptions);
    return response as ParticipantsResponse;
};

/**
 * Get statistics and connection details of all participants in a conference. Optionally limit the search result with a specific time range.
 *
 * @link https://docs.dolby.io/communications-apis/reference/getconferenceparticipants
 *
 * @param accessToken Access token to use for authentication.
 * @param options Options to request the participants.
 *
 * @returns A dictionary of `Participant` object through a `Promise`.
 */
export const getAllConferenceParticipants = async (accessToken: JwtToken, options: ListAllParticipantsOptions): Promise<NodeJS.Dict<Participant>> => {
    const optionsDefault: ListAllParticipantsOptions = {
        confId: options.confId,
        from: 0,
        to: 9999999999999,
        page_size: 100,
    };

    const opts = Object.assign(optionsDefault, options);

    let path = `/v1/monitor/conferences/${opts.confId}/participants`;
    if (opts.userId) {
        path += `/${opts.userId}`;
    }

    const params = {
        from: opts.from.toString(),
        to: opts.to.toString(),
        max: opts.page_size.toString(),
    };

    if (opts.type) {
        params['type'] = opts.type;
    }

    const requestOptions = {
        hostname: 'api.voxeet.com',
        path: path,
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    const result = {};

    do {
        const response = await sendGet(requestOptions);

        if (response.hasOwnProperty('participants')) {
            const dico = response['participants'];
            for (var key in dico) {
                if (dico.hasOwnProperty(key)) {
                    result[key] = dico[key];
                }
            }
        }

        const pagedResponse = response as PagedResponse;
        if (!pagedResponse.next || pagedResponse.next.length <= 0) {
            break;
        }

        requestOptions.params['start'] = pagedResponse.next;
    } while (true);

    return result;
};
