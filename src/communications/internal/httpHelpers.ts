import { RequestOptions, sendGet } from '../../internal/httpHelpers';
import { PagedResponse } from '../types/core';

/**
 * Get all the elements available.
 *
 * @param options Request options.
 * @param propertyName Name of the property that contains the elements of the page.
 *
 * @returns An array of objects of type `TReturn` through a Promise.
 */
export async function getAll<TReturn>(options: RequestOptions, propertyName: string): Promise<Array<TReturn>> {
    if (!options.params) {
        options.params = {};
    }

    const result: Array<TReturn> = [];

    do {
        const response = await sendGet(options);

        if (response.hasOwnProperty(propertyName)) {
            const objects = response[propertyName];
            for (let index = 0; index < objects.length; index++) {
                const object = objects[index];
                result.push(object);
            }
        }

        const pagedResponse = response as PagedResponse;
        if (!pagedResponse.next || pagedResponse.next.length <= 0) {
            break;
        }

        options.params['start'] = pagedResponse.next;
    } while (true);

    return result;
}
