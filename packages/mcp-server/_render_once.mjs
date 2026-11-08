// One-shot renderer: markdown file -> cooper-theme 公众号 HTML.
// Run from packages/mcp-server with: node --import tsx/esm _render_once.mjs <in.md> <out.html>
import { readFileSync, writeFileSync } from 'node:fs'

function noop() {}
globalThis.MathJax = {
  texReset() {},
  tex2svg(latex) {
    const svgStyle = {}
    const styleProxy = new Proxy(svgStyle, {
      set(_, prop, value) { svgStyle[prop] = value; return true },
      get(_, prop) {
        if (prop === 'setProperty') return (p, v) => { svgStyle[p] = v }
        if (prop === 'display') return svgStyle[prop] || ''
        return svgStyle[prop]
      },
    })
    return { firstChild: { outerHTML: `<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>${latex.replace(/</g, '&lt;')}</mi></math>`, style: styleProxy, getAttribute: () => null, removeAttribute: noop } }
  },
}
globalThis.window = {
  MathJax: globalThis.MathJax,
  addEventListener: noop, removeEventListener: noop, dispatchEvent: () => true,
  getComputedStyle: () => ({ getPropertyValue: () => '' }),
  requestAnimationFrame: cb => setTimeout(cb, 16),
  matchMedia: () => ({ matches: false, addEventListener: noop, removeEventListener: noop }),
}
globalThis.document = {
  getElementById: () => null,
  documentElement: { getAttribute: () => null, style: {} },
  createDocumentFragment: () => ({ appendChild: noop, childNodes: [] }),
  querySelectorAll: () => [], querySelector: () => null,
  createElement: tag => ({ tagName: tag.toUpperCase(), setAttribute: noop, appendChild: noop, innerHTML: ``, style: {} }),
  createTextNode: text => ({ textContent: text, data: text }),
  body: { appendChild: noop }, head: { appendChild: noop },
}

const [, , inPath, outPath] = process.argv
if (!inPath || !outPath) { console.error('usage: node --import tsx/esm _render_once.mjs <in.md> <out.html>'); process.exit(1) }

const { buildRenderedOutput } = await import('./src/render-article.ts')
const markdown = readFileSync(inPath, 'utf8')
const out = await buildRenderedOutput({ markdown, theme: 'cooper', primaryColor: '#000000', legend: 'none', codeBlockTheme: '' })
const html = out.html ?? out
writeFileSync(outPath, html, 'utf8')
console.log(`wrote ${outPath} (${html.length} chars), readingTime=${out.readingTime ?? '-'}`)
