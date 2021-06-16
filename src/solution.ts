const isGenerator = (val: any): boolean => val && !!val.next

import {
    Bitmap, Vector, Size
} from './types'

import {
    LEFT,
    RIGHT,
    UP,
    DOWN,
    rightTurnFn,
    createBitmap,
    set,
    get,
    add,
    isOutsideBitmap,
} from './utils'

function * pathwalkGenerator(
    bitmap: Bitmap,
    startPosition: Vector,
    direction: Vector,
    startValue: number,
    afterEachStepDo?: (bitmap: Bitmap, start: Vector, dir: Vector, value: number) => any
) {
    let position = startPosition
    let value = startValue
    while (true) {
        if (isOutsideBitmap(bitmap, position) || get(bitmap, position) <= value) {
            return
        }
        set(bitmap, position, value)
        yield afterEachStepDo ? afterEachStepDo(bitmap, position, direction, value) : null
        value += 1
        position = add(position, direction)
    } 
}

function turnRightGenerator(bitmap: Bitmap, start: Vector, dir: Vector, value: number) {
    const newDir = rightTurnFn.get(dir)!
    return pathwalkGenerator(bitmap, add(start, newDir), newDir, value + 1)
}

const initializeRadianceGenerators = (bitmap: Bitmap, start: Vector, val: number) => [LEFT, UP, RIGHT, DOWN].map((dir) => pathwalkGenerator(bitmap, add(start, dir), dir, val, turnRightGenerator))

export function solution(whitePixels: Array<Vector>, size: Size): Bitmap {
    const maxDistance = size.height + size.width - 2 // assuming there's at least one white pixel in the bitmap
    const sol = createBitmap(size, maxDistance)

    const lightSourcesContext: Map<Vector, {
        generators: Generator[],
        done: boolean
    }> = new Map()

    let doneCount = 0

    while (doneCount < whitePixels.length) {
        for (let position of whitePixels) {
            if (!lightSourcesContext.has(position)) {
                set(sol, position, 0)
                lightSourcesContext.set(position, {
                    generators: initializeRadianceGenerators(sol, position, 1),
                    done: false,
                })
            } else {
                const { generators, done } = lightSourcesContext.get(position)!
                if (done) {
                    continue
                }

                const newGenerators = generators.flatMap((gen) => {
                    const { value, done } = gen.next()
                    if (done) {
                        return []
                    }

                    return isGenerator(value) ? [gen, value] : [gen]
                })

                if (newGenerators.length === 0) {
                    doneCount += 1
                }

                lightSourcesContext.set(position, {
                    generators: newGenerators,
                    done: newGenerators.length === 0,
                })
            }
        }
    }

    return sol
}
