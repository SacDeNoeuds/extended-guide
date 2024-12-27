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

const output = path.resolve(process.cwd(), 'dist', 'guides')
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
      /<!-- diff \[code:(tsx|ts|vue)\] .\/(.*) .\/(.*) -->/g,
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
            return `${acc}${lines.join('\n')}`
          }, '')
          .trim()

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

/**
 * @param {object} options
 * @param {string} options.root
 * @param {(dirPath: string) => void} options.traverseDir
 * @param {(filePath: string) => void} options.traverseFile
 */
function traverseDirectoriesOfMarkdown({ root, traverseDir, traverseFile }) {
  if (root.endsWith('.md')) return traverseFile(root)

  traverseDir(root)

  const filePaths = readdirSync(root)
  for (const filePath of filePaths) {
    const fileScopedPath = path.join(root, filePath)
    traverseDirectoriesOfMarkdown({
      root: fileScopedPath,
      traverseDir,
      traverseFile,
    })
  }
}
const guides = readdirSync('./guides')
if (isDryRun) {
  console.info('guides to generate:\n -', guides.join('\n - '))
  process.exit(0)
}

/**
 * @param {string} path
 * @returns {string}
 */
function getOutputPath(path) {
  return path.replace('guides/', 'dist/guides/')
}

traverseDirectoriesOfMarkdown({
  root: './guides',
  traverseDir: (dirPath) => {
    mkdirSync(getOutputPath(dirPath), { recursive: true })
  },
  traverseFile: (filePath) => {
    try {
      const guideText = readFileSync(filePath, 'utf-8')
      const newGuideText = injectReferencedCode(guideText)
      const guideFilePath = getOutputPath(filePath)
      writeFileSync(guideFilePath, newGuideText, 'utf-8')
      console.info(`generated: ${guideFilePath}`)
    } catch (error) {
      console.info('failed generating', filePath)
      throw error
    }
  },
})

console.info('\nDone ✅')
