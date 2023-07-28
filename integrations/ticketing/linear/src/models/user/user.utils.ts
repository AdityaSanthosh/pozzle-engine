/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { User } from '@poozle/engine-idk';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertUser(data: any): User {
  return {
    id: data.id,
    name: data.name,
    avatar: data.avatarUrl,
    email_address: data.email,
  };
}
