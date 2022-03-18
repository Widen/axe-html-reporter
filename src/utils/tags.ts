export function getWCAGTags(tags: string[]): string {
  if (tags.includes('best-practice')) {
    return 'Best practice'
  }

  return tags
    .filter((tag) => tag.includes('wcag'))
    .map((tag) => {
      const sectionNumber = tag.match(/\d+/)?.[0].split('').join('.') ?? ''

      const levelMatch = tag.match(/wcag\d+(a+)/)
      const level = levelMatch?.length
        ? ` Level ${levelMatch[1].toUpperCase()}`
        : ''

      return `WCAG ${sectionNumber}${level}`
    })
    .join(', ')
}
