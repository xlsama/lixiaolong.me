---
title: "用 Nuxt Content 搭建写作工作流"
description: "分享我如何用 Nuxt Content 管理 Markdown 文章、草稿与发布工作流。"
date: 2025-01-12
cover:
  src: "/illustrations/content-workflow.png"
  alt: "在笔记本上写作"
tags:
  - Nuxt
  - Content
  - Workflow
readingTime: 6
---

## 起因：想要一个轻量写作工具

在长期写作中，我尝试过很多方案：Notion、Obsidian、甚至在 GitHub Issues 里写草稿。但它们要么发布流程麻烦，要么写起来不够自由。Nuxt Content 的出现算是刚刚好。

## 核心思路

1. **Markdown 优先**：文章都放在 `content/blog` 目录下，版本控制由 Git 处理。
2. **结构化元数据**：通过 YAML front matter 定义 `title`、`date`、`tags` 等字段，方便页面展示。
3. **组件加持**：需要强调内容时，直接在 Markdown 中引用 Vue 组件。

## 实际配置

```ts
// content.config.ts
export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
  },
})
```

`queryCollection('blog')` 可以直接把文章抓出来，配合排序、分页，体验很好。

## 写在最后

若你也想打造自己的在线笔记库，不妨从 Nuxt Content 开始。它几乎不需要额外后端，就能满足大部分写作需求。
