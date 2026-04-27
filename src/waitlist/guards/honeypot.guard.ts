import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class HoneypotGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    if (req.body?.hp) {
      req.__honeypot_triggered = true;
    }
    return true; // always allow through — silent success
  }
}
