import { PlatformAdapter, PlatformMetadata } from './types';
import { VercelAdapter } from './vercel';
import { RenderAdapter } from './render';
import { NetlifyAdapter } from './netlify';
import { RailwayAdapter } from './railway';
import { DenoDeployAdapter } from './deno';
import { GenericRestAdapter } from './generic';
import { GENERIC_PLATFORMS } from './generic-config';

export class AdapterRegistry {
  private adapters: Map<string, PlatformAdapter> = new Map();

  constructor() {
    // Register Tier 1 First-Class Adapters
    this.register(new VercelAdapter());
    this.register(new RenderAdapter());
    this.register(new NetlifyAdapter());
    this.register(new RailwayAdapter());
    this.register(new DenoDeployAdapter());

    // Register Tier 2 Generic Adapters
    for (const config of Object.values(GENERIC_PLATFORMS)) {
      if (!this.adapters.has(config.platform)) {
        this.register(new GenericRestAdapter(config));
      }
    }
  }

  private register(adapter: PlatformAdapter) {
    this.adapters.set(adapter.platform, adapter);
  }

  getAdapter(platform: string): PlatformAdapter | undefined {
    return this.adapters.get(platform);
  }

  hasAdapter(platform: string): boolean {
    return this.adapters.has(platform);
  }

  getAllPlatforms(): string[] {
    return Array.from(this.adapters.keys());
  }

  getMetadata(platform: string): PlatformMetadata | undefined {
    return this.adapters.get(platform)?.metadata;
  }
}

export const platformRegistry = new AdapterRegistry();
