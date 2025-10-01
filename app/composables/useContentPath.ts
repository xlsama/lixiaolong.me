/**
 * 获取 content collection 条目的正确路径
 * Nuxt Content 在处理外部仓库时，path 字段可能不正确，使用 stem 作为备用方案
 */
export function useContentPath(
  entry?: { path?: string | null, _path?: string | null, stem?: string | null } | null,
) {
  if (!entry)
    return ''

  const path = entry.path ?? entry._path ?? ''

  // 如果 path 无效或只是集合根路径，从 stem 构建完整路径
  // stem 格式: "blog/article-name" → 转换为 "/blog/article-name"
  if ((!path || path === '/blog') && entry.stem) {
    return `/${entry.stem}`
  }

  return path
}
