import { AxeResults } from 'axe-core'
import ejs from 'ejs'
import fs from 'node:fs/promises'
import { getWCAGTags, icons, plural } from './utils.js'

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
  const templateURL = new URL('../template.ejs', import.meta.url)
  const template = await fs.readFile(templateURL, 'utf8')

  return ejs.render(template, prepareResults(results))
}
