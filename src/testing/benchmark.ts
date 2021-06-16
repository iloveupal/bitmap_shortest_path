import {
    Size,
    Bitmap,
    Vector,
} from '../types'

import random from 'random'
import { createRandomBitmap, naiveSolution } from "./testUtils"
import { solution } from '../solution'

import b from 'benny'

const smallBitmap = () => createRandomBitmap(random.float(0.1, 0.95), 1, 25)
const mediumBitmap = () => createRandomBitmap(random.float(0.1, 0.95), 30, 60)
const largeBitmap = () => createRandomBitmap(random.float(0.1, 0.95), 65, 180)

const benchVersions: Array<[() => { size: Size, bitmap: Bitmap, whitePixels: Array<Vector> }, string]> = [
    [smallBitmap, 'small'],
    [mediumBitmap, 'medium'],
    [largeBitmap, 'large']
]

benchVersions.forEach(([bitmapFn, name]) => {
    b.suite(
        `${name} bitmaps`,
        b.add('naive', () => {
            const { bitmap, size, whitePixels } = bitmapFn()
            return () => naiveSolution(bitmap, whitePixels, size)
        }),
        b.add('radiance', () => {
            const { size, whitePixels } = bitmapFn()
            return () => solution(whitePixels, size)
        }),
        b.cycle(),
        b.complete(),
        b.save({
            folder: 'benchmarks',
            details: true,
            format: 'chart.html',
        })
    )
})
