import { AxeResults, Result } from 'axe-core'
import mustache from 'mustache'
import { loadTemplate } from './util/loadTemplate'
import { prepareAxeRules } from './util/prepareAxeRules'
import { prepareReportData } from './util/prepareReportData'
import { saveHtmlReport } from './util/saveHtmlReport'

export interface Options {
  customSummary?: string
  doNotCreateReportFile?: boolean
  outputDir?: string
  outputDirPath?: string
  projectKey?: string
  reportFileName?: string
}

export interface CreateReport {
  options?: Options
  results: Partial<AxeResults>
}

export interface PreparedResults {
  inapplicable?: Result[]
  incomplete?: Result[]
  passes?: Result[]
  violations: Result[]
}

export function createHtmlReport({ options, results }: CreateReport): string {
  if (!results.violations) {
    throw new Error(
      "'violations' is required for HTML accessibility report. Example: createHtmlReport({ results : { violations: Result[] } })"
    )
  }
  const template = loadTemplate()
  const preparedReportData = prepareReportData({
    inapplicable: results.inapplicable,
    incomplete: results.incomplete,
    passes: results.passes,
    violations: results.violations,
  })
  const htmlContent = mustache.render(template, {
    checksInapplicable: preparedReportData.checksInapplicable,
    checksIncomplete: preparedReportData.checksIncomplete,
    checksPassed: preparedReportData.checksPassed,
    customSummary: options?.customSummary,
    hasAxeRawResults: Boolean(results?.timestamp),
    hasInapplicable: Boolean(results.inapplicable),
    hasIncomplete: Boolean(results.incomplete),
    hasPassed: Boolean(results.passes),
    incompleteTotal: preparedReportData.checksIncomplete
      ? preparedReportData.checksIncomplete.length
      : 0,
    projectKey: options?.projectKey,
    rules: prepareAxeRules(results?.toolOptions?.rules || {}),
    url: results.url,
    violationDetails: preparedReportData.violationsDetails,
    violations: preparedReportData.violationsSummaryTable,
    violationsSummary: preparedReportData.violationsSummary,
  })

  if (!options?.doNotCreateReportFile) {
    saveHtmlReport({
      htmlContent,
      outputDir: options?.outputDir,
      outputDirPath: options?.outputDirPath,
      reportFileName: options?.reportFileName,
    })
  }

  return htmlContent
}
