import { createContentLoader } from 'vitepress'

export default createContentLoader('/basics/video/**/*.md', {
  excerpt: true,
  transform(rawData) {
    return rawData.sort((a, b) => {
      return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
    })
  }
})