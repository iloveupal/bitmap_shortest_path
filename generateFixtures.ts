import { writeFileSync } from 'fs'
import random from 'random'
import isEqual from 'lodash.isequal'
import { createRandomBitmap } from "./testUtils";
import { solution } from './src/solution';


for (let i = 0; i < 100; i++) {
    const bitmap = createRandomBitmap(random.float(0.1, 0.95), 200, 300)

    console.time('solve')
    const solved = solution(bitmap.matrix, bitmap.brightCoords, bitmap.size)
    console.timeEnd('solve')

    if (!isEqual(bitmap.solution, solved)) {
        writeFileSync('./failed.json', JSON.stringify({
            bitmap,
            solved,
        }))

        process.exit(1)
    }
}