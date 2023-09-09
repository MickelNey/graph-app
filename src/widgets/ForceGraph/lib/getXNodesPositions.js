import randomInteger from "./getRandomInteger"
const getYearsCount = (years) => years[years.length - 1] - years[0] + 1
const getYearPosition = (year, years) => year - years[0]

const getXNodesPositions = (year, value, weight = 452, years) => {
  const oneYearRange = weight / getYearsCount(years)
  const yearIndex = getYearPosition(year, years)
  return randomInteger(
    yearIndex * oneYearRange + Math.sqrt(value) * 2, 
    yearIndex * oneYearRange + oneYearRange - Math.sqrt(value) * 2
  )
}

const createNodesXMap = (nodes, weight, years) => {
  const map = new Map()
  let node
  for (let i = 0; i < nodes.length; i++) {
    node = nodes[i]
    map.set(node.id, getXNodesPositions(node.year, node.value, weight, years))
  }
  return map
}

export default createNodesXMap
