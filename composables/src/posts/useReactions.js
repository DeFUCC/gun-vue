export function useReactions(authors) {
  const reactions = {}
  for (let pub in authors) {
    let reaction = authors[pub]
    if (reaction) {
      reactions[reaction] = reactions[reaction] || []
      reactions[reaction].push(pub)
    }

  }
  return reactions
}

export function countRating(authors) {
  let count = 0
  for (let author in authors) {
    if (authors[author] && authors[author] != '🗑') {
      count++
    } else if (authors[author] == '🗑') {
      count--
    }
  }
  return count
}