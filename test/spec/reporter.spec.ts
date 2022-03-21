import { expect, test } from '../fixtures'

const pass = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>My page</title>
    </head>
    <body>
      <main>
        <h1>My page</h1>
      </main>
    </body>
  </html>
`

test.describe('HTML reporter', () => {
  test('without errors', async ({ page, run }) => {
    await run(pass)
    await page.locator('summary').first().click()
    expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.5 })
  })

  test('with errors', async ({ page, run }) => {
    await run('<div>hello</div>')
    await page.locator('summary').first().click()
    expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.5 })
  })
})
