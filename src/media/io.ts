import { sendPost, download, AuthRequestOptions } from './internal/httpHelpers';
import JwtToken from './types/jwtToken';

/**
 * Starts Media Input
 *
 * To use the Dolby provided temporary storage is a two step process.
 *
 * You start by declaring a dlb:// url that you can reference in any other Media API calls. The response will provide a url where you can put your media. This allows you to use the dlb:// url as a short-cut for a temporary storage location.
 *
 * You'll be returned a pre-signed url you can use to PUT and upload your media file. The temporary storage should allow you to read and write to the dlb:// locations for a period of at least 24 hours before it is removed.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-input
 *
 * @param auth Your Dolby.io Media API Key or a JWT Token.
 * @param dlbUrl The `url` should be in the form `dlb://object-key` where the object-key can be any alpha-numeric string. The object-key is unique to your account API Key so there is no risk of collision with other users.
 *
 * @returns The upload URL through a `Promise`.
 */
export const getUploadUrl = async (auth: string | JwtToken, dlbUrl: string): Promise<string | null> => {
    const payload = {
        url: dlbUrl,
    };

    const requestOptions: AuthRequestOptions = {
        hostname: 'api.dolby.com',
        path: '/media/input',
        headers: {},
        auth,
        body: JSON.stringify(payload, null, '  '),
    };

    const response = await sendPost(requestOptions);
    if (response.hasOwnProperty('url')) {
        return response['url'];
    }

    return null;
};

/**
 * Starts Media Download
 *
 * You can download media you previously uploaded with /media/input or media that was generated through another Dolby Media API.
 *
 * The temporary storage should allow you to read and write to the dlb:// locations for a period of at least 24 hours before it is removed.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-output-get
 *
 * @param auth Your Dolby.io Media API Key or a JWT Token.
 * @param dlbUrl The `url` should be in the form `dlb://object-key` where the object-key can be any alpha-numeric string. The object-key is unique to your account API Key so there is no risk of collision with other users.
 * @param filePath Local file path where to download the file to.
 */
export const downloadFile = async (auth: string | JwtToken, dlbUrl: string, filePath: string): Promise<void> => {
    const requestOptions: AuthRequestOptions = {
        hostname: 'api.dolby.com',
        path: '/media/output',
        params: {
            url: dlbUrl,
        },
        headers: {},
        auth,
    };

    download(filePath, requestOptions);
};
