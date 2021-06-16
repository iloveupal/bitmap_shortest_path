import random from 'random'
import {
    Size,
    Bitmap,
    Vector,
} from '../types'

import { createBitmap } from '../utils'

const distance = (positionA: Vector, positionB: Vector) => {
    return Math.abs(positionA[0] - positionB[0]) + Math.abs(positionA[1] - positionB[1])
}

export const naiveSolution = (bitmap: Bitmap, whitePixels: Array<Vector>, dimensions: Size) => {
    const solution = createBitmap(dimensions, 0)

    for (let i = 0; i < bitmap.length; i++) {
        for (let j = 0; j < bitmap[0].length; j++) {
            let closestDistance = 1000 // arbitrary
            whitePixels.forEach(coord => {
                const coordsDistance = distance(coord, [i, j])
                if (coordsDistance < closestDistance) {
                    closestDistance = coordsDistance
                }
            })
            solution[i][j] = closestDistance
        }
    }

    return solution
}

export const createRandomBitmap = (density: number, minSize: number, maxSize: number): {
    bitmap: Bitmap,
    whitePixels: Array<Vector>,
    size: Size,
} => {
    const n = random.int(minSize, maxSize)
    const m = random.int(minSize, maxSize)

    const whitePixels: Array<Vector> = []

    const bitmap: Bitmap = []

    for (let i = 0; i < n; i++) {
        bitmap[i] = []
        for (let j = 0; j < m; j++) {
            const val = random.float() < density ? 1 : 0
            bitmap[i][j] = val
            if (val) {
                whitePixels.push([i, j])
            }
        }
    }

    // we need to have at least one white pixel
    if (whitePixels.length === 0) {
        whitePixels.push([random.int(0, n - 1), random.int(0, m - 1)])
        bitmap[whitePixels[0][0]][whitePixels[0][1]] = 1
    }

    return {
        bitmap,
        whitePixels,
        size: {
            height: n,
            width: m,
        },
    }
}
