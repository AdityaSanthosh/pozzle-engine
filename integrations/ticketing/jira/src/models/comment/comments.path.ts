/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  BasePath,
  Config,
  Params,
  Collection,
  PathResponse
} from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';
import { convertComments } from './comments.utils';

export class GetCommentsPath extends BasePath<any> {
  async fetchComments(url: string, headers: AxiosHeaders, params: Params) {
    const response = await axios({
      url,
      headers,
    });

    return response.data.comments.map((data: any) =>
      convertComments(data, params.pathParams?.ticket_id as string | null),
    );
  }

  async createComment(url: string, headers: AxiosHeaders, params: Params) {
    const response = await axios.post(url, params.requestBody, { headers });

    return convertComments(response.data, params.pathParams?.ticket_id as string | null);
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: Params,
    config: Config,
  ): Promise<PathResponse<Collection>> {
    const BASE_URL = `https://${config.jira_domain}.atlassian.net`;
    const url = `${BASE_URL}/rest/api/2/issue/${params.pathParams?.ticket_id}/comment`;
    switch (method) {
      case 'GET':
        return this.fetchComments(url, headers, params);

      case 'POST':
        return this.createComment(url, headers, params);

      default:
        return {};
    }
  }
}
