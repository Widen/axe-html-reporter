import { AxeResults } from 'axe-core'
import ejs from 'ejs'
import fs from 'fs/promises'
import path from 'path'
import { getWCAGTags, icons, plural } from './utils'

function prepareResults({ inapplicable, passes, violations }: AxeResults) {
  return {
    inapplicable: inapplicable.map((check) => ({
      ...check,
      tags: getWCAGTags(check.tags),
    })),
    passes: passes.map((check) => ({
      ...check,
      tags: getWCAGTags(check.tags),
    })),
    plural,
    violations: violations.map((check) => ({
      ...check,
      icon: icons[check.impact ?? 'n/a'],
      impact: check.impact ?? 'n/a',
      tags: getWCAGTags(check.tags),
    })),
  }
}

export default async function createHTMLReport(results: AxeResults) {
  const templatePath = path.join(__dirname, '../template.ejs')
  const template = await fs.readFile(templatePath, 'utf8')

  return ejs.render(template, prepareResults(results))
}
