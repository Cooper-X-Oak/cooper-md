/**
 * CSS 变量生成工具
 * 根据配置动态生成 CSS 变量样式
 */

import type { HeadingLevel, HeadingStyles, HeadingStyleType, TypographyStyle } from '@md/shared/configs'

export interface CSSVariableConfig {
  primaryColor: string
  fontFamily: string
  fontSize: string
  isUseIndent?: boolean
  isUseJustify?: boolean
  headingStyles?: HeadingStyles
  typographyStyle?: TypographyStyle
}

/**
 * 生成 CSS 变量样式
 * @param config - 配置对象
 * @returns CSS 变量字符串
 */
export function generateCSSVariables(config: CSSVariableConfig): string {
  return `
:root {
  /* 动态配置变量 */
  --md-primary-color: ${config.primaryColor};
  --md-font-family: ${config.fontFamily};
  --md-font-size: ${config.fontSize};
}

/* 段落缩进和对齐 */
#output p {
  ${config.isUseIndent ? 'text-indent: 2em;' : ''}
  ${config.isUseJustify ? 'text-align: justify;' : ''}
}
  `.trim()
}

/**
 * 生成标题样式 CSS（单独导出，用于在主题 CSS 之后应用）
 */
export function generateHeadingStyles(config: CSSVariableConfig): string {
  return generateHeadingStylesCSS(config.headingStyles)
}

/**
 * 生成跨主题排版风格 CSS（在标题预设之后应用）
 */
export function generateTypographyStyles(config: CSSVariableConfig, scope = `#output`): string {
  if (config.typographyStyle !== `modern-column`)
    return ``

  const css = `
#output h1 {
  display: block;
  padding: 0.78em 0 0.72em;
  border-top: 2px solid var(--md-primary-color);
  border-left: none;
  border-bottom: 1px solid #d9dde2;
  margin: 1.82em 8px 1.5em;
  color: var(--md-primary-color);
  background: transparent;
  font-size: calc(var(--md-font-size) * 1.62);
  font-weight: 800;
  letter-spacing: 0.035em;
  line-height: 1.32;
  text-align: left;
}

#output h2 {
  display: block;
  padding: 0.68em 0 0;
  border-top: 1px solid #d9dde2;
  border-left: none;
  border-bottom: none;
  border-radius: 0;
  margin: 3.25em 8px 1.08em;
  color: var(--md-primary-color);
  background: transparent;
  font-size: calc(var(--md-font-size) * 1.26);
  font-weight: 800;
  letter-spacing: 0.03em;
  line-height: 1.42;
  text-align: left;
}

#output h3 {
  padding: 0;
  border-left: none;
  border-bottom: none;
  margin: 2.08em 8px 0.66em;
  color: #171b20;
  background: transparent;
  font-size: calc(var(--md-font-size) * 1.12);
  font-weight: 700;
  letter-spacing: 0.015em;
  line-height: 1.46;
  text-align: left;
}

#output h4 {
  padding: 0;
  border-left: none;
  border-bottom: none;
  margin: 1.55em 8px 0.42em;
  color: #59616a;
  background: transparent;
  font-size: calc(var(--md-font-size) * 0.98);
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.5;
  text-align: left;
}

#output h5,
#output h6 {
  margin: 1.5em 8px 0.5em;
  color: #4b5563;
  font-size: var(--md-font-size);
  font-weight: 700;
}

#output p {
  margin: 1em 8px;
  color: #252b30;
  letter-spacing: 0.018em;
  line-height: 1.9;
  word-break: break-word;
}

#output blockquote {
  padding: 0.68em 0 0.7em 0.92em;
  border-top: 1px solid #e2e5e9;
  border-left: 2px solid var(--md-primary-color);
  border-bottom: 1px solid #e2e5e9;
  border-radius: 0;
  margin: 1.78em 14px;
  color: #4f5962;
  background: transparent;
  font-style: normal;
}

#output blockquote > p {
  margin: 0;
  color: #4f5962;
  letter-spacing: 0.026em;
  line-height: 1.86;
}

#output .markdown-alert {
  padding: 0.88em 0.95em;
  border: 1px solid #e4e7eb;
  border-left: 3px solid var(--md-primary-color);
  border-radius: 3px;
  margin: 1.62em 8px;
  color: #4b5563;
  background: #f8f9fa;
}

#output .markdown-alert > p {
  margin: 0.45em 0 0;
  color: #4b5563;
  letter-spacing: 0.02em;
  line-height: 1.82;
}

#output .markdown-alert > .markdown-alert-title {
  display: block;
  margin: 0 0 0.45em;
  color: var(--md-primary-color);
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1.5;
}

#output .markdown-alert-title svg {
  vertical-align: -0.15em;
}

#output ol,
#output ul {
  padding-left: 1.15em;
  margin: 1.05em 8px;
  color: #2d3338;
}

#output ul {
  list-style: none;
}

#output li {
  display: block;
  margin: 0.38em 8px;
  color: #2d3338;
  letter-spacing: 0.025em;
  line-height: 1.88;
}

#output .codespan {
  padding: 1px 4px;
  border: 1px solid #e2e5e9;
  border-radius: 2px;
  color: #242a2f;
  background: #f6f7f8;
  font-size: 88%;
}

#output pre.code__pre,
#output .hljs.code__pre {
  overflow-x: auto;
  border: 1px solid #e2e5e9;
  border-radius: 4px;
  margin: 1.55em 8px;
  background: #f9fafb;
}

#output pre.code__pre > code,
#output .hljs.code__pre > code {
  padding: 0.75em 1em 1em;
  color: #242a2f;
  background: transparent;
  line-height: 1.66;
}

#output img {
  border-radius: 4px;
  margin: 0.5em auto 0.68em;
}

#output figure {
  margin: 1.85em 8px;
  color: #2f3437;
}

#output figure img {
  margin: 0 auto 0.58em;
}

#output figcaption,
#output .md-figcaption {
  color: #8f959d;
  font-size: 0.8em;
  letter-spacing: 0.025em;
  line-height: 1.58;
  text-align: center;
}

#output hr {
  height: 2px;
  width: 3.6em;
  border: none;
  margin: 2.65em 8px 2.55em;
  background: var(--md-primary-color);
}

#output strong {
  color: #171b20;
  font-weight: 700;
}

#output em {
  color: #555f68;
  font-style: italic;
}

#output a {
  color: #576b95;
  border-bottom: 1px solid #d8dfeb;
  text-decoration: none;
}

#output table {
  border-collapse: collapse;
  width: 100%;
  margin: 1.58em 0;
  color: #252b30;
}

#output thead {
  color: #111827;
  font-weight: 700;
}

#output th {
  padding: 0.56em 0.7em;
  border: 1px solid #e2e5e9;
  color: #111827;
  background: #f8f9fa;
  line-height: 1.55;
}

#output td {
  padding: 0.56em 0.7em;
  border: 1px solid #e2e5e9;
  color: #252b30;
  line-height: 1.62;
}
  `.trim()

  return scope === `#output`
    ? css
    : css.replace(/#output /g, scope ? `${scope} ` : ``)
}

/**
 * 生成标题样式 CSS
 */
function generateHeadingStylesCSS(headingStyles?: HeadingStyles): string {
  if (!headingStyles)
    return ``

  const levels: HeadingLevel[] = [`h1`, `h2`, `h3`, `h4`, `h5`, `h6`]
  const cssRules: string[] = []

  for (const level of levels) {
    const style = headingStyles[level]
    // 自定义样式由用户在 CSS 编辑器中直接编辑，这里只处理预设样式
    if (style && style !== `default` && style !== `custom`) {
      cssRules.push(generateHeadingCSS(level, style))
    }
  }

  return cssRules.join(`\n\n`)
}

/**
 * 生成单个标题级别的样式 CSS
 */
function generateHeadingCSS(level: HeadingLevel, style: HeadingStyleType): string {
  const baseStyles = `
  display: block;
  text-align: left;
  background: transparent;`

  switch (style) {
    case `color-only`:
      return `#output ${level} {
  color: var(--md-primary-color);
  background: transparent;
}`

    case `border-bottom`:
      return `#output ${level} {${baseStyles}
  padding-bottom: 0.3em;
  border-bottom: 2px solid var(--md-primary-color);
  color: var(--md-primary-color);
}`

    case `border-left`:
      return `#output ${level} {${baseStyles}
  margin-left: 0;
  padding-left: 10px;
  border-left: 4px solid var(--md-primary-color);
  color: var(--md-primary-color);
}`

    default:
      return ``
  }
}
