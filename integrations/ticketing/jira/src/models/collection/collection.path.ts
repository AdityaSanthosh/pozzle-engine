/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, Collection, PathResponse } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';
import { convertCollection } from './collection.utils';

export class GetCollectionPath extends BasePath<any> {
  async fetchSingleCollection(url: string, headers: AxiosHeaders) {
    const response = await axios({
      url,
      headers,
    });

    return convertCollection(response.data);
  }

  async run(
    _method: string,
    headers: AxiosHeaders,
    params: Params,
    config: Config,
  ): Promise<PathResponse<Collection>> {
    const BASE_URL = `https://${config.jira_domain}.atlassian.net`;
    const url = `${BASE_URL}/rest/api/2/project/${params.pathParams?.collection_id}`;

    return this.fetchSingleCollection(url, headers);
  }
}
