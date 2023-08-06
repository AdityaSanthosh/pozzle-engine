/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL, getMetaParams } from 'common';

import { CreateCommentResponse, CommentsResponse } from './comment.interface';
import { convertComment } from './comment.utils';

export class CommentsPath extends BasePath {
  async fetchData(
    headers: AxiosHeaders,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: Params,
  ): Promise<CommentsResponse> {
    try {
      const page = params.queryParams?.cursor ? parseInt(<string>params.queryParams?.cursor) : 1;
      const response = await axios({
        url: `${BASE_URL}`,
        headers,
        data: {
          query: `
            query Query {
              comments {
                nodes {
                  id
                  createdAt
                  updatedAt
                  archivedAt
                  body
                  editedAt
                  bodyData
                  reactionData
                  url
                }
              }
            }
            }
          `,
        },
      });
      return {
        meta: getMetaParams(response.data, <number>params.queryParams?.cursor, page),
        data: response.data.map(convertComment),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async createComment(headers: AxiosHeaders, params: Params): Promise<CreateCommentResponse> {
    try {
      const input = params;
      const response = await axios({
        url: `${BASE_URL}`,
        headers,
        data: {
          query: `
            mutation Mutation($input: CommentCreateInput!) {
              commentCreate(input: $input) {
                lastSyncId
                success
                comment {
                  id
                }
              }
            }
          `,
          variables: {
            input,
          },
        },
      });
      return {
        success: response.data.success,
        lastSyncId: response.data.lastSyncId,
        data: convertComment(response.data),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(method: string, headers: AxiosHeaders, params: Params, _config: Config) {
    switch (method) {
      case 'GET' && params.pathParams?.ticket_id:
        return this.fetchData(headers, params);

      case 'POST':
        return this.createComment(headers, params);

      default:
        throw new Error('Unknown method');
    }
  }
}
