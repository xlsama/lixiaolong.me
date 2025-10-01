/**
 * 获取所有博客文章的 composable（带缓存）
 * 避免重复查询
 */
export function useBlogPosts() {
  return useAsyncData('all-blog-posts', async () => {
    return await queryCollection('blog').all()
  }, {
    // 在客户端使用已缓存的数据
    getCachedData: key => useNuxtApp().static.data[key],
  })
}
