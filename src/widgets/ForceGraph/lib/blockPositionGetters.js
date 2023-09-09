
const createBlockPositionGetter = (fn) => (length, size) => {
  const coordinates = []
  const oneBlockSize = size / length
  for (let i = 0; i < length; i++) {
    coordinates.push(fn(oneBlockSize, i))
  }
  return coordinates
} 

const getCenter = (oneBlockSize, step) => oneBlockSize * step + oneBlockSize / 2
const getLeftBorder = (oneBlockSize, step) => oneBlockSize * step

export const getLeftBorders = createBlockPositionGetter(getLeftBorder)
export const getBlockCenters = createBlockPositionGetter(getCenter)
export const getOneBlockSize = (length, size) => size / length

