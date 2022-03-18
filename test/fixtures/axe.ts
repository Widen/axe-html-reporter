import { test as base } from '@playwright/test'
import fs from 'fs/promises'
import { AxePlugin } from 'axe-core'
import createHTMLReport from '../../src'

declare global {
  interface Window {
    axe: AxePlugin
  }
}

export const test = base.extend<
  { run: () => Promise<string> },
  { axe: string }
>({
  axe: [
    async ({}, use) => {
      const filePath = require.resolve('axe-core/axe.min.js')
      const axe = await fs.readFile(filePath, 'utf-8')

      await use(axe)
    },
    { scope: 'worker' },
  ],
  run: async ({ axe, page }, use) => {
    await page.evaluate((axe) => window.eval(axe), axe)

    await use(async () => {
      const results = await page.evaluate(() => window.axe.run())
      return createHTMLReport(results)
    })
  },
})
