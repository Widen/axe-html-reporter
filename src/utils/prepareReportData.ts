import { Result } from 'axe-core'
import { PreparedResults } from '../hi'
import { AxeReport, FixSummary, Summary } from './AxeReport'
import { getWcagReference } from './tags'

function simplifyAxeResultForSummary(results: Result[]): Summary[] {
  return results.map(
    ({ description, help, id, impact, nodes, tags }, resultIndex) => ({
      description,
      help,
      id,
      impact: impact || 'n/a',
      index: resultIndex + 1,
      nodes: nodes.length,
      tags,
      wcag: getWcagReference(tags),
    })
  )
}

function prepareFixSummary(
  failureSummary: string,
  defaultHighlight: FixSummary
): FixSummary[] {
  const failureSummariesSplit = failureSummary.split('\n\n')
  return failureSummariesSplit.map((summary) => {
    const fixSummarySplit = summary.split('\n')
    if (fixSummarySplit.length == 0) {
      return defaultHighlight
    } else {
      return {
        highlight: fixSummarySplit.shift() || '',
        list: fixSummarySplit,
      }
    }
  })
}
/**
 * Prepare report splitting it into sections:
 * - total accessibility violations (counting nodes)
 * - summary of violations that could be printed as table
 * - detailed list of violations that could be printed as formatted text
 */
export function prepareReportData({
  inapplicable,
  incomplete,
  passes,
  violations,
}: PreparedResults): AxeReport {
  const passedChecks = passes ? simplifyAxeResultForSummary(passes) : undefined
  const incompleteChecks = incomplete
    ? simplifyAxeResultForSummary(incomplete)
    : undefined
  const inapplicableChecks = inapplicable
    ? simplifyAxeResultForSummary(inapplicable)
    : undefined
  const violationsTotal = violations.reduce((acc, { nodes }) => {
    acc += nodes.length
    return acc
  }, 0)
  if (violations.length === 0) {
    return {
      checksInapplicable: inapplicableChecks,
      checksIncomplete: incompleteChecks,
      checksPassed: passedChecks,
      violationsSummary:
        'axe-core found <span class="badge badge-success">0</span> violations',
    }
  }
  const violationsSummary = `axe-core found <span class="badge badge-warning">${violationsTotal}</span> violation${
    violationsTotal === 1 ? '' : 's'
  }`
  // Prepare data to show summary
  const violationsSummaryTable = simplifyAxeResultForSummary(violations)
  // Prepare data to show detailed list of violations
  const violationsDetails = violations.map(
    ({ description, help, helpUrl, id, impact, nodes, tags }, issueIndex) => {
      return {
        description,
        help,
        helpUrl,
        id,
        impact: impact || 'n/a',
        index: issueIndex + 1,
        nodes: nodes.map(({ any, failureSummary, html, target }, nodeIndex) => {
          const targetNodes = target.join('\n')
          const defaultHighlight = {
            highlight:
              'Recommendation with the fix was not provided by axe result',
          }
          const fixSummaries: FixSummary[] = failureSummary
            ? prepareFixSummary(failureSummary, defaultHighlight)
            : [defaultHighlight]
          const relatedNodesAny: string[] = []
          any.forEach((checkResult) => {
            if (
              checkResult.relatedNodes &&
              checkResult.relatedNodes.length > 0
            ) {
              checkResult.relatedNodes.forEach((node) => {
                if (node.target.length > 0) {
                  relatedNodesAny.push(node.target.join('\n'))
                }
              })
            }
          })

          return {
            fixSummaries,
            html,
            index: nodeIndex + 1,
            relatedNodesAny,
            targetNodes,
          }
        }),
        tags,
        wcag: getWcagReference(tags),
      }
    }
  )

  return {
    checksInapplicable: inapplicableChecks,
    checksIncomplete: incompleteChecks,
    checksPassed: passedChecks,
    violationsDetails,
    violationsSummary,
    violationsSummaryTable,
  }
}
