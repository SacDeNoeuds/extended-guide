const {
  readFileSync,
  writeFileSync,
  readdirSync,
  rmSync,
  mkdirSync,
} = require('fs')
const path = require('path')
const diff = require('diff')

const isDryRun = process.argv.includes('--dry-run')

const output = path.resolve(process.cwd(), 'guides')
rmSync(output, { recursive: true, force: true })
mkdirSync(output)

/**
 * What this function does: it replaces text in the readme file. The replacements:
 * - "<!-- include [code:tsx] ./App.tsx -->" gets replaced by "```tsx\n${content of ./App.tsx}\n```"
 * - "<!-- include [code:ts] ./test.ts -->" gets replaced by "```ts\n${content of ./test.ts}\n```"
 * - "<!-- include [code:vue] ./List.vue -->" gets replaced by "```vue\n${content of ./List.vue}\n```"
 *
 * @param {string} readmeText
 * @returns {string}
 */
function injectReferencedCode(readmeText) {
  return readmeText
    .replace(
      /<!-- include \[code:(tsx|ts|vue|html)\] (.*) -->/g,
      (substring, ext, filePath) => {
        const paths = getPathsFromRoot(filePath)
        const content = readFileSync(paths.absolute, 'utf-8').trim()
        return makeCodeBlock(paths.relative, ext, content)
      },
    )
    .replace(
      /<!-- diff-between \[code:(tsx|ts|vue)\] .\/(.*) .\/(.*) -->/g,
      (substring, ext, newFilePath, oldFilePath) => {
        const newPaths = getPathsFromRoot(newFilePath)
        const oldPaths = getPathsFromRoot(oldFilePath)
        const newContent = readFileSync(newPaths.absolute, 'utf-8').trim()
        const oldContent = readFileSync(oldPaths.absolute, 'utf-8').trim()
        const difference = diff.diffLines(oldContent, newContent, {
          ignoreNewlineAtEof: true,
          ignoreWhitespace: true,
          ignoreCase: true,
        })
        const code = difference
          .reduce((acc, line) => {
            const suffix = line.added
              ? ' // [!code ++]'
              : line.removed
                ? ' // [!code --]'
                : ''
            const lines = line.value
              .split('\n')
              .map((line) => (line ? `${line}${suffix}` : line))
            return `${acc.trim()}\n${lines.join('\n')}`
          }, '')
          .trim()

        console.e

        return makeCodeBlock(newPaths.relative, ext, code)
      },
    )
}

/**
 * @param {string} relativeFilePath
 * @param {string} ext
 * @param {string} code
 */
function makeCodeBlock(relativeFilePath, ext, code) {
  const content = `// ${relativeFilePath}\n\n${code}`
  const prefix = '```' + ext
  const suffix = '```'
  return [prefix, content, suffix].join('\n')
}

/**
 * @param {string} filePath
 * @return {{ absolute: string, relative: string }}
 */
function getPathsFromRoot(filePath) {
  const absolute = path.join(process.cwd(), 'src', filePath)
  const relative = path.relative(process.cwd(), absolute)
  return { absolute, relative }
}

const guides = readdirSync('./guides-to-generate')
if (isDryRun) {
  console.info('guides to generate:\n -', guides.join('\n - '))
  process.exit(0)
}

for (const guide of guides) {
  const guideText = readFileSync(`./guides-to-generate/${guide}`, 'utf-8')
  const newGuideText = injectReferencedCode(guideText)
  writeFileSync(`./guides/${guide}`, newGuideText, 'utf-8')
  console.info(`generated: guides/${guide}`)
}

console.info('\nDone ✅')
