const { pow, sqrt } = Math

const map = {
  '2K': { width: 2560, height: 1440 }, // 16 : 9
  '4K': { width: 3840, height: 2160 }, // 16 : 9
  '5K': { width: 5120, height: 2880 }, // 16 : 9
  '6K': { width: 6016, height: 3384 }, // 16 : 9
  '8K': { width: 7680, height: 4320 }, // 16 : 9
  '10K': { width: 10240, height: 4320 } // 21 : 9
}

/**
 * Calculates the minimum pixels needed to achieve Retina display
 */
const minimumPixelsNecessary = (
  desiredPPI,
  diagonalSizeInches,
  widthAspectRatio,
  heightAspectRatio
) => {
  const aspectRatio = widthAspectRatio / heightAspectRatio
  const widthInches = sqrt(
    pow(diagonalSizeInches, 2) / (1 + pow(1 / aspectRatio, 2))
  )
  const heightInches = sqrt(
    pow(diagonalSizeInches, 2) / (1 + pow(aspectRatio, 2))
  )

  const widthPixels = widthInches * desiredPPI
  const heightPixels = heightInches * desiredPPI

  const totalPixels = widthPixels * heightPixels

  let commonlyKnownAs = ''
  for (const [displayFormatName, dimensions] of Object.entries(map)) {
    if (dimensions.width <= widthPixels) commonlyKnownAs = displayFormatName
  }

  return { diagonalSizeInches, widthPixels, heightPixels, commonlyKnownAs }
}

/**
 * Calculates the maximum diagonal size (for a given aspect ratio) that a screen
 * can have before it loses Retina display status
 */
const maximumDiagonalSizeInches = (
  desiredPPI,
  desiredResolution,
  widthAspectRatio,
  heightAspectRatio
) => {
  const maxWidthInches = map[desiredResolution].width / desiredPPI
  const maxHeightInches =
    maxWidthInches * (heightAspectRatio / widthAspectRatio)

  const maxDiagonalSizeInches = sqrt(
    pow(maxWidthInches, 2) + pow(maxHeightInches, 2)
  )

  return { maxWidthInches, maxHeightInches, maxDiagonalSizeInches }
}

console.group('✨ Retina Display Calculator ✨')
console.log(minimumPixelsNecessary(220, 27, 16, 9))
console.log(maximumDiagonalSizeInches(220, '5K', 16, 9))
console.log('===============================================')
console.groupEnd()
