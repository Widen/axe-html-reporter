import { test as base } from '@playwright/test'
import { AxePlugin } from 'axe-core'
import fs from 'fs/promises'
import createHTMLReport from '../../src'

declare global {
  interface Window {
    axe: AxePlugin
  }
}

export const test = base.extend<
  { run: (content: string) => Promise<void> },
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
  run: async ({ axe, page }, use, testInfo) => {
    // Will be moved to the global config after v1.19
    // https://github.com/microsoft/playwright/pull/11132
    testInfo.snapshotSuffix = ''

    // Inject Axe into the page
    await page.evaluate((axe) => window.eval(axe), axe)

    await use(async (content) => {
      // Set the content of the page to the provided HTML, then run the Axe checks
      await page.setContent(content)
      const results = await page.evaluate(() => window.axe.run())
      const html = await createHTMLReport(results)

      // TEmp
      await fs.writeFile('report.html', html)

      // Update the page content to the HTML report and take a screenshot
      await page.setContent(html)
    })
  },
})
