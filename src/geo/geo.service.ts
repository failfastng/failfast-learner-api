import { Injectable, Logger } from '@nestjs/common';
import type { Request } from 'express';

interface IpApiResponse {
  status: string;
  country?: string;
}

@Injectable()
export class GeoService {
  private readonly logger = new Logger(GeoService.name);

  extractIp(req: Request): string {
    return (
      (req.headers['cf-connecting-ip'] as string | undefined)?.trim() ??
      (req.headers['x-forwarded-for'] as string | undefined)
        ?.split(',')[0]
        ?.trim() ??
      req.socket.remoteAddress ??
      ''
    );
  }

  async lookupCountry(ip: string): Promise<string | null> {
    if (
      !ip ||
      ip === '::1' ||
      ip.startsWith('127.') ||
      ip.startsWith('10.') ||
      ip.startsWith('192.168.') ||
      ip.startsWith('172.')
    ) {
      return null;
    }
    try {
      const res = await fetch(
        `http://ip-api.com/json/${ip}?fields=country,status`,
      );
      const json = (await res.json()) as IpApiResponse;
      return json.status === 'success' ? (json.country ?? null) : null;
    } catch (err: unknown) {
      this.logger.warn(
        `GeoService: country lookup failed for ip=${ip}: ${String(err)}`,
      );
      return null;
    }
  }
}
