import { sendPost, AuthRequestOptions } from './internal/httpHelpers';
import { download, upload, RequestOptions } from '../internal/httpHelpers';
import * as Urls from '../urls';
import { JwtToken } from './types/jwtToken';

const getUrl = async (accessToken: JwtToken, endpointUrl: string, dlbUrl: string): Promise<string | null> => {
    const payload = {
        url: dlbUrl,
    };

    const requestOptions: AuthRequestOptions = {
        hostname: Urls.getMapiHostname(),
        path: endpointUrl,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        accessToken,
        body: JSON.stringify(payload, null, '  '),
    };

    const response = await sendPost(requestOptions);
    if (response.hasOwnProperty('url')) {
        return response['url'];
    }

    return null;
};

/**
 * Gets an upload URL.
 *
 * To use the Dolby provided temporary storage is a two step process.
 *
 * You start by declaring a dlb:// url that you can reference in any other Media API calls. The response will provide a url where you can put your media. This allows you to use the dlb:// url as a short-cut for a temporary storage location.
 *
 * You'll be returned a pre-signed url you can use to PUT and upload your media file. The temporary storage should allow you to read and write to the dlb:// locations for a period of at least 24 hours before it is removed.
 *
 * @param accessToken Access token to use for authentication.
 * @param dlbUrl The `url` should be in the form `dlb://object-key` where the object-key can be any alpha-numeric string. The object-key is unique to your account API Key so there is no risk of collision with other users.
 *
 * @returns The upload URL through a {@link Promise}.
 */
export const getUploadUrl = async (accessToken: JwtToken, dlbUrl: string): Promise<string | null> => {
    return await getUrl(accessToken, '/media/input', dlbUrl);
};

/**
 * Gets the download URL.
 *
 * You can download media you previously uploaded with /media/input or media that was generated through another Dolby Media API.
 *
 * The temporary storage should allow you to read and write to the dlb:// locations for a period of at least 24 hours before it is removed.
 *
 * @param accessToken Access token to use for authentication.
 * @param dlbUrl The `url` should be in the form `dlb://object-key` where the object-key can be any alpha-numeric string. The object-key is unique to your account API Key so there is no risk of collision with other users.
 *
 * @returns The download URL through a {@link Promise}.
 */
export const getDownloadUrl = async (accessToken: JwtToken, dlbUrl: string): Promise<string | null> => {
    return await getUrl(accessToken, '/media/output', dlbUrl);
};

/**
 * Upload a media file to the Dolby.io temporary storage.
 *
 * The temporary storage should allow you to read and write to the dlb:// locations for a period of at least 24 hours before it is removed.
 *
 * @param accessToken Access token to use for authentication.
 * @param dlbUrl The `url` should be in the form `dlb://object-key` where the object-key can be any alpha-numeric string. The object-key is unique to your account API Key so there is no risk of collision with other users.
 * @param filePath Local path of the file you want to upload.
 */
export const uploadFile = async (accessToken: JwtToken, dlbUrl: string, filePath: string): Promise<void> => {
    const uploadUrl: string = await getUploadUrl(accessToken, dlbUrl);
    return upload(filePath, uploadUrl);
};

/**
 * Download a media file.
 *
 * You can download media you previously uploaded with /media/input or media that was generated through another Dolby Media API.
 *
 * The temporary storage should allow you to read and write to the dlb:// locations for a period of at least 24 hours before it is removed.
 *
 * @param accessToken Access token to use for authentication.
 * @param dlbUrl The `url` should be in the form `dlb://object-key` where the object-key can be any alpha-numeric string. The object-key is unique to your account API Key so there is no risk of collision with other users.
 * @param filePath Local file path where to download the file to.
 */
export const downloadFile = async (accessToken: JwtToken, dlbUrl: string, filePath: string): Promise<void> => {
    let downloadUrl: string = await getDownloadUrl(accessToken, dlbUrl);

    downloadUrl = downloadUrl.replace('https://', '');
    const idx = downloadUrl.indexOf('/');

    const requestOptions: RequestOptions = {
        hostname: downloadUrl.substring(0, idx),
        path: downloadUrl.substring(idx),
        headers: {},
    };

    return download(filePath, requestOptions);
};
