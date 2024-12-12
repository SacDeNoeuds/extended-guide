
const { readFileSync, writeFileSync, readdirSync, rmSync, mkdirSync } = require("fs")
const path = require("path")

const isDryRun = process.argv.includes('--dry-run')

const output = path.resolve(process.cwd(), 'guides')
rmSync(output, { recursive: true })
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
  return readmeText.replace(
    /<!-- include \[code:(tsx|ts|vue|html)\] (.*) -->/g,
    (substring, ext, filePath) => {
      const pathFromRoot = path.join(process.cwd(), 'src', filePath)
      const content = readFileSync(pathFromRoot, 'utf-8').trim()
      const code = `// ${path.relative(process.cwd(), pathFromRoot)}\n\n${content}`
      const prefix = '```' + ext
      const suffix = '```'
      return [prefix, code, suffix].join('\n')
    }
  )
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
