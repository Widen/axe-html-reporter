import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
}

export default config
