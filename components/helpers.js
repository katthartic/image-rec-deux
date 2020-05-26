export function generateRandIdx(arr) {
  return Math.floor(Math.random() * Math.floor(arr.length))
}

export function randomConcepts(concepts) {
  const numOfConcepts = 3
  const conceptsArr = []

  while (conceptsArr.length < numOfConcepts) {
    const randIdx = generateRandIdx(concepts)
    conceptsArr.push(concepts[randIdx].name)
  }
  return conceptsArr
}
