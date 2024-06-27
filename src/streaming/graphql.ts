import { sendPost } from './internal/httpHelpers';
import * as Urls from '../urls';

/**
 * Sends a request to the GraphQL endpoint.
 *
 * @link https://docs.dolby.io/streaming-apis/page/graphql-api-reference
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param query The GraphQL query to send.
 *
 * @returns A GraphQL response object through a {@link Promise}.
 * @typeParam T The response object type.
 * 
 * @example
 * const API_SECRET = process.env.DOLBYIO_API_SECRET;
 * 
 * await sdk.streaming.graphql
 *      .request(API_SECRET, 'query StreamStatPagination($page: Int = 1)
 *          {
 *              streamStatPagination(
 *                  page: $page,
 *                  perPage: 100,
 *                  filter: {
 *                      _operators: {
 *                          from: { gt: "2024-06-01" } },
 *                          AND: {
 *                              _operators: {
 *                                  to: { lt: "2024-06-15" }
 *                              }
 *                          }
 *                      }
 *                  ) {
 *                      count
 *                      items { streamId from to }
 *                      pageInfo {
 *                          currentPage
 *                          perPage
 *                          pageCount
 *                          itemCount
 *                          hasNextPage
 *                  }
 *              }
 *          }');
 */
export const request = async<T> (apiSecret: string, graphQlRequest: string): Promise<T> => {
    const body = {
        query: graphQlRequest,
    };

    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/graphql',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(body),
    };

    return await sendPost<T>(options);
};
