import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';

type HoneypotRequest = Request & { __honeypot_triggered?: boolean };

@Injectable()
export class HoneypotGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<HoneypotRequest>();
    if ((req.body as Record<string, unknown>)?.hp) {
      req.__honeypot_triggered = true;
    }
    return true; // always allow through — silent success
  }
}
