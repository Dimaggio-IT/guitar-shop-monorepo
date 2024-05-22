import { Injectable } from '@nestjs/common';

import { ShopUserRepository } from '@project/shop-user';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly ShopUserRepository: ShopUserRepository
  ) {}
 }
