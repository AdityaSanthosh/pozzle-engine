/** Copyright (c) 2023, Poozle, all rights reserved. **/

const { main } = require('../linear/index');

async function run() {
  const response = await main('RUN', {
    config: {
      authType: 'Api Key',
      api_key: '',
    },
    path: '/collections',
    method: 'GET',
    params: {
      queryParams: {},
    },
  });

  console.log(response);
}

run();
