import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '../components/home'

const SITE = 'https://lixiaolong.me'
const TITLE = '李小龙 — 独立开发者'
const DESC = '李小龙的个人主页 · 独立开发者，做小而美的软件产品。'

export const Route = createFileRoute('/zh')({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: DESC },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESC },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'zh_CN' },
      { property: 'og:locale:alternate', content: 'en_US' },
      { property: 'og:url', content: `${SITE}/zh` },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: TITLE },
      { name: 'twitter:description', content: DESC },
    ],
    links: [
      { rel: 'canonical', href: `${SITE}/zh` },
      { rel: 'alternate', hrefLang: 'en', href: `${SITE}/` },
      { rel: 'alternate', hrefLang: 'zh-CN', href: `${SITE}/zh` },
      { rel: 'alternate', hrefLang: 'x-default', href: `${SITE}/` },
    ],
  }),
  component: () => <HomePage lang="zh" />,
})
