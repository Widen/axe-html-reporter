// import fs from 'fs'
// import path from 'path'
// import { createHtmlReport } from '../src'
// import { defaultReportFileName } from '../src/util/saveHtmlReport'
// // import rawAxeResults from './rawAxeResults.json'
// // import axeRawInapplicable from './rawInapplicable.json'
// // import axeRawIncomplete from './rawIncomplete.json'
// // import axeRawPassed from './rawPasses.json'
// // import axeRawViolations from './rawViolations.json'

// function getPathToCreatedReport(
//   customFileName?: string,
//   customOutputDir?: string
// ) {
//   return path.resolve(
//     process.cwd(),
//     customOutputDir ? customOutputDir : 'artifacts',
//     customFileName ? customFileName : defaultReportFileName
//   )
// }

// test.describe('Error handling', () => {
//   test('Verify throwing an error if required parameters are not passed', async () => {
//     expect(() => {
//       createHtmlReport({
//         // @ts-ignore
//         results: {
//           passes: [],
//         },
//       })
//     }).toThrow(
//       "'violations' is required for HTML accessibility report. Example: createHtmlReport({ results : { violations: Result[] } })"
//     )
//   })
// })

// describe('Successful tests', () => {
//   // Verifies report with empty violations
//   test('Empty violations', async () => {
//     const reportFileName = 'tcAllPassedOnlyViolations.html'
//     createHtmlReport({
//       options: {
//         reportFileName,
//       },
//       results: {
//         violations: [],
//       },
//     })
//     expect(
//       fs.readFileSync(getPathToCreatedReport(reportFileName), {
//         encoding: 'utf8',
//       })
//     ).toMatchSnapshot()
//   })

//   // Verifies report is created with default name in default directory with violations(passes and incomplete are not provided).
//   // Creates html report file with name 'accessibilityReport.html' in default directory 'artifacts'
//   test('Violations and URL with default report file name', async () => {
//     createHtmlReport({
//       results: {
//         url: 'https://dequeuniversity.com/demo/mars/',
//         violations: axeRawViolations,
//       },
//     })
//     expect(
//       fs.readFileSync(getPathToCreatedReport(), { encoding: 'utf8' })
//     ).toMatchSnapshot()
//   })

//   // Verifies report with if violations are not empty
//   test('Violations', async () => {
//     const reportFileName = 'urlIsNotPassed.html'
//     createHtmlReport({
//       options: { reportFileName },
//       results: {
//         violations: axeRawViolations,
//       },
//     })
//     expect(
//       fs.readFileSync(getPathToCreatedReport(reportFileName), {
//         encoding: 'utf8',
//       })
//     ).toMatchSnapshot()
//   })

//   // Verifies report is created with violations and passes
//   test('Violations, passes and url', async () => {
//     const reportFileName = 'tcPassesAndViolations.html'
//     createHtmlReport({
//       options: { reportFileName },
//       results: {
//         passes: axeRawPassed,
//         url: 'https://dequeuniversity.com/demo/mars/',
//         violations: axeRawViolations,
//       },
//     })
//     expect(
//       fs.readFileSync(getPathToCreatedReport(reportFileName), {
//         encoding: 'utf8',
//       })
//     ).toMatchSnapshot()
//   })

//   // Verifies report is created with violations, passes and incomplete with optional reportFileName and outputDir params
//   test('Violations, passes, incomplete, url with reportFileName & outputDir', async () => {
//     const reportFileName = 'tcPassesViolationsIncomplete.html'
//     const outputDir = 'temp'
//     createHtmlReport({
//       options: {
//         outputDir,
//         reportFileName,
//       },
//       results: {
//         incomplete: axeRawIncomplete,
//         passes: axeRawPassed,
//         url: 'https://dequeuniversity.com/demo/mars/',
//         violations: axeRawViolations,
//       },
//     })
//     expect(
//       fs.readFileSync(getPathToCreatedReport(reportFileName, outputDir), {
//         encoding: 'utf8',
//       })
//     ).toMatchSnapshot()
//   })

//   // Verifies report is created with violations, passes, incomplete url with optional
//   // reportFileName and projectKey
//   test('No violations found, passes, incomplete, url + reportFileName & projectKey', async () => {
//     const reportFileName = 'tcWithTheKey.html'
//     createHtmlReport({
//       options: {
//         projectKey: 'DEQUE',
//         reportFileName,
//       },
//       results: {
//         incomplete: axeRawIncomplete,
//         passes: axeRawPassed,
//         url: 'https://dequeuniversity.com/demo/mars/',
//         violations: [],
//       },
//     })
//     expect(
//       fs.readFileSync(getPathToCreatedReport(reportFileName), {
//         encoding: 'utf8',
//       })
//     ).toMatchSnapshot()
//   })

//   // Verifies report with inapplicable present in 'results'
//   test('Inapplicable present', async () => {
//     const reportFileName = 'tcInapplicablePresent.html'
//     createHtmlReport({
//       options: { reportFileName },
//       results: {
//         inapplicable: axeRawInapplicable,
//         incomplete: axeRawIncomplete,
//         passes: axeRawPassed,
//         url: 'https://dequeuniversity.com/demo/mars/',
//         violations: axeRawViolations,
//       },
//     })
//     expect(
//       fs.readFileSync(getPathToCreatedReport(reportFileName), {
//         encoding: 'utf8',
//       })
//     ).toMatchSnapshot()
//   })

//   // Verifies report with empty violations, empty passes, empty incomplete, empty inapplicable
//   test('Empty all: violation, passes, incomplete, inapplicable', async () => {
//     const reportFileName = 'tcOnlyPasses.html'
//     createHtmlReport({
//       options: { reportFileName },
//       results: {
//         inapplicable: [],
//         incomplete: [],
//         passes: [],
//         url: 'https://dequeuniversity.com/demo/mars/',
//         violations: [],
//       },
//     })
//     expect(
//       fs.readFileSync(getPathToCreatedReport(reportFileName), {
//         encoding: 'utf8',
//       })
//     ).toMatchSnapshot()
//   })

//   // Verify report is created with violations and custom summary
//   test('Custom Summary present', async () => {
//     const reportFileName = 'tcIncludingCustomSummary.html'
//     const customSummary = `Test Case: Full page analysis
//         <br>Steps:</br>
//         <ol style="margin: 0">
//         <li>Open https://dequeuniversity.com/demo/mars/</li>
//         <li>Analyze full page with all rules enabled</li>
//         </ol>`
//     createHtmlReport({
//       options: { customSummary, reportFileName },
//       results: {
//         url: 'https://dequeuniversity.com/demo/mars/',
//         violations: axeRawViolations,
//       },
//     })
//     expect(
//       fs.readFileSync(getPathToCreatedReport(reportFileName), {
//         encoding: 'utf8',
//       })
//     ).toMatchSnapshot()
//   })

//   // Verifies report with all optional parameters
//   test('All optional parameters present', async () => {
//     const reportFileName = 'tsAllOptionalParametersPresent.html'
//     const customSummary = `Test Case: Full page analysis
//         <br>Steps:</br>
//         <ol style="margin: 0">
//         <li>Open https://dequeuniversity.com/demo/mars/</li>
//         <li>Analyze full page with all rules enabled</li>
//         </ol>`

//     createHtmlReport({
//       options: { customSummary, projectKey: 'DEQUE', reportFileName },
//       results: {
//         inapplicable: axeRawInapplicable,
//         incomplete: [],
//         passes: axeRawPassed,
//         url: 'https://dequeuniversity.com/demo/mars/',
//         violations: axeRawViolations,
//       },
//     })
//     expect(
//       fs.readFileSync(getPathToCreatedReport(reportFileName), {
//         encoding: 'utf8',
//       })
//     ).toMatchSnapshot()
//   })

//   test('Raw AxeResults passed and all optional params', async () => {
//     const customSummary = `Test Case: Full page analysis
//         <br>Steps:</br>
//         <ol style="margin: 0">
//         <li>Open https://dequeuniversity.com/demo/mars/</li>
//         <li>Analyze full page with all rules enabled</li>
//         </ol>`

//     const reportFileName = 'index.html'
//     const outputDir = 'docs'
//     createHtmlReport({
//       options: {
//         customSummary,
//         outputDir,
//         projectKey: 'DEQUE',
//         reportFileName,
//       },
//       results: rawAxeResults,
//     })
//     expect(
//       fs.readFileSync(getPathToCreatedReport(reportFileName, outputDir), {
//         encoding: 'utf8',
//       })
//     ).toMatchSnapshot()
//   })
//   test('File will not be created and raw HTML result will be returned', async () => {
//     const customSummary = `Test Case: Full page analysis
//         <br>Steps:</br>
//         <ol style="margin: 0">
//         <li>Open https://dequeuniversity.com/demo/mars/</li>
//         <li>Analyze full page with all rules enabled</li>
//         </ol>`

//     const reportHTML = createHtmlReport({
//       options: {
//         customSummary,
//         doNotCreateReportFile: true,
//         projectKey: 'I need only raw HTML',
//         reportFileName: 'shouldNotBeSaved.html',
//       },
//       results: rawAxeResults,
//     })
//     expect(reportHTML).toMatchSnapshot()
//     const isReportFileExist = fs.existsSync(
//       getPathToCreatedReport('shouldNotBeSaved.html')
//     )
//     expect(isReportFileExist).toBe(false)
//   })
// })
