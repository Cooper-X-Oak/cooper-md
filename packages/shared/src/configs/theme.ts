import type { IConfigOption } from '../types'
import type { ThemeName } from './theme-css'

// 导出 CSS 主题（新主题系统）
export { baseCSSContent, themeMap, type ThemeName } from './theme-css'

export const themeOptionsMap = {
  default: {
    label: `经典`,
    value: `default`,
    desc: ``,
  },
  claude: {
    label: `Claude`,
    value: `claude`,
    desc: `Warm editorial`,
  },
  cooper: {
    label: `Cooper`,
    value: `cooper`,
    desc: `@Cooper-X-Oak`,
  },
  grace: {
    label: `优雅`,
    value: `grace`,
    desc: `@brzhang`,
  },
  simple: {
    label: `简洁`,
    value: `simple`,
    desc: `@okooo5km`,
  },
}

export const themeOptions: IConfigOption<ThemeName>[] = [
  {
    label: `经典`,
    value: `default`,
    desc: ``,
  },
  {
    label: `Claude`,
    value: `claude`,
    desc: `Warm editorial`,
  },
  {
    label: `Cooper`,
    value: `cooper`,
    desc: `@Cooper-X-Oak`,
  },
  {
    label: `优雅`,
    value: `grace`,
    desc: `@brzhang`,
  },
  {
    label: `简洁`,
    value: `simple`,
    desc: `@okooo5km`,
  },
]
