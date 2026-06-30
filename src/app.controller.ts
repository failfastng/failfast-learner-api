import { Controller, Get, Header, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AppService } from './app.service';

const oauthProtectedResourceNg = {
  resource: 'https://learner-api.failfastng.com/',
  resource_name: 'failFastNG Learner Demo API',
  resource_documentation: 'https://failfastng.com/auth.md',
  authorization_servers: ['https://failfastng.com'],
  scopes_supported: ['learner.read', 'learner.write', 'waitlist.write'],
  bearer_methods_supported: ['header'],
} as const;

const oauthProtectedResourceEdu = {
  resource: 'https://learner-api.failfastedu.com/',
  resource_name: 'FailFast EDU Learner API',
  resource_documentation: 'https://failfastedu.com/auth.md',
  authorization_servers: ['https://failfastedu.com'],
  scopes_supported: ['learner.read', 'learner.write', 'waitlist.write'],
  bearer_methods_supported: ['header'],
} as const;

function oauthProtectedResourceForHost(host: string | undefined) {
  if (host?.includes('failfastedu.com')) {
    return oauthProtectedResourceEdu;
  }
  return oauthProtectedResourceNg;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('.well-known/oauth-protected-resource')
  @Header('Content-Type', 'application/json')
  getOAuthProtectedResource(@Req() req: Request) {
    return oauthProtectedResourceForHost(req.headers.host);
  }
}
