import fs from 'fs/promises'
import path from 'path'

export async function loadTemplate() {
  return fs.readFile(path.resolve(__dirname, '../template.ejs'), {
    encoding: 'utf8',
  })
}
