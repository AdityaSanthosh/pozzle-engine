/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { GetTagParams, IssueLabelUpdateParams, TagResponse } from './tag.interface';
import { convertTag } from './tag.utils';

export class TagPath extends BasePath {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTag(headers: AxiosHeaders, params: GetTagParams): Promise<TagResponse> {
    try {
      const id = params.pathParams?.tag_id;
      const response = await axios({
        url: `${BASE_URL}`,
        headers,
        data: {
          query: `
            query IssueLabel($issueLabelId: String!) {
              issueLabel(id: $issueLabelId) {
                id
                name
                color
                description
              }
            }
          `,
          variables: {
            id,
          },
        },
      });
      return { data: convertTag(response.data) };
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateTag(headers: AxiosHeaders, params: IssueLabelUpdateParams): Promise<TagResponse> {
    try {
      const input = params.pathParams?.tag_id;
      const response = await axios({
        url: `${BASE_URL}`,
        headers,
        data: {
          query: `
            mutation IssueLabelUpdate($input: IssueLabelUpdateInput!, $issueLabelUpdateId: String!) {
              issueLabelUpdate(input: $input, id: $issueLabelUpdateId) {
                lastSyncId
                issueLabel {
                  id
                  name
                  color
                  description
                }
                success
              }
            }
          `,
          variables: {
            input,
          },
        },
      });
      return { data: convertTag(response.data) };
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(method: string, headers: AxiosHeaders, params: Params, _config: Config) {
    switch (method) {
      case 'GET':
        return this.getTag(headers, params as GetTagParams);

      case 'PATCH':
        return this.updateTag(headers, params as IssueLabelUpdateParams);

      default:
        throw new Error('Method not found');
    }
  }
}
