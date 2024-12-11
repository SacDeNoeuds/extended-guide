// What this function does: it replaces text in the readme file. The replacements:
// - "<!-- include [code:tsx] ./App.tsx -->" gets replaced by "```tsx\n${content of ./App.tsx}\n```"
// - "<!-- include [code:ts] ./test.ts -->" gets replaced by "```ts\n${content of ./test.ts}\n```"
// - "<!-- include [code:vue] ./List.vue -->" gets replaced by "```vue\n${content of ./List.vue}\n```"

const { readFileSync, writeFileSync } = require("fs")
const path = require("path")

/**
 * @param {string} readmeText
 * @returns {string}
 */
function injectReferencedCode(readmeText) {
  return readmeText.replace(
    /<!-- include \[code:(tsx|ts|vue)\] (.*) -->/g,
    (substring, ext, filePath) => {
      const pathFromRoot = path.join(process.cwd(), 'src', filePath)
      const content = readFileSync(pathFromRoot, 'utf-8').trim()
      return "```" + ext + `\n${content}\n` + "```"
    }
  )
}

const readmeText = readFileSync("readme-to-generate.md", "utf-8")
const newReadmeText = injectReferencedCode(readmeText)
writeFileSync("README.md", newReadmeText)
