import { expect, test } from '../fixtures'

test.describe('HTML reporter', () => {
  test.skip('without errors', async ({ page, run }) => {
    await page.setContent('<div>hello</div>')
    const report = await run()
  })

  test('with errors', async ({ page, run }) => {
    await page.setContent('<div>hello</div>')
    const report = await run()
    expect(report).toMatchSnapshot('errors.html')
  })
})
