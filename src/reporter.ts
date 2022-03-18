import { AxeResults } from 'axe-core'
import { createHtmlReport } from './hi'

export default function reporter(
  results: AxeResults[],
  options: unknown,
  callback: (html: string) => void
) {
  console.log(results)

  const buffer = createHtmlReport(results)

  callback(buffer.toString())
}
