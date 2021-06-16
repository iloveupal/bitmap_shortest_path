const isGenerator = (val: any): boolean => val && !!val.next

import {
    Matrix, Vector, Size
} from './types'

import {
    LEFT,
    RIGHT,
    UP,
    DOWN,
    rightTurnFn,
    createMatrix,
    set,
    get,
    add,
    isOutsideMatrix,
} from './utils'


function * pathwalkGenerator(
    mat: Matrix,
    startPosition: Vector,
    direction: Vector,
    startValue: number,
    afterEachStepDo?: (mat: Matrix, start: Vector, dir: Vector, value: number) => any
) {
    let position = startPosition
    let value = startValue
    while (true) {
        if (isOutsideMatrix(mat, position) || get(mat, position) <= value) {
            return
        }
        set(mat, position, value)
        yield afterEachStepDo ? afterEachStepDo(mat, position, direction, value) : null
        value += 1
        position = add(position, direction)
    } 
}

function turnRightGenerator(mat: Matrix, start: Vector, dir: Vector, value: number) {
    const newDir = rightTurnFn.get(dir)!
    return pathwalkGenerator(mat, add(start, newDir), newDir, value + 1)
}

const initializeRadianceGenerators = (mat: Matrix, start: Vector, val: number) => [LEFT, UP, RIGHT, DOWN].map((dir) => pathwalkGenerator(mat, add(start, dir), dir, val, turnRightGenerator))

export function solution(lightSources: Array<Vector>, size: Size): Matrix {
    const maxDistance = size.height + size.width - 2 // assuming there's at least one bright pixel in the matrix
    const sol = createMatrix(size, maxDistance)

    const lightSourcesContext: Map<Vector, {
        generators: Generator[],
        done: boolean
    }> = new Map()

    let doneCount = 0

    while (doneCount < lightSources.length) {
        for (let position of lightSources) {
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
