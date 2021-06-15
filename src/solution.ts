const isGenerator = (val: any): boolean => val && !!val.next

type Matrix = Array<Array<number>>

type Coord = [number, number]
type Vector = Coord

type Size = {
    height: number,
    width: number,
}

const LEFT: Vector = [0, -1]
const RIGHT: Vector = [0, 1]
const UP: Vector = [-1, 0]
const DOWN: Vector = [1, 0]

const rightTurnFn = new Map<Vector, Vector>([
    [LEFT, UP],
    [UP, RIGHT],
    [RIGHT, DOWN],
    [DOWN, LEFT]
])

const createMatrix = (size: Size, fillWith: number): Matrix => {
    var matrix: Matrix = [];
    for(var i=0; i<size.height; i++) {
        matrix[i] = [];
        for(var j=0; j<size.width; j++) {
            matrix[i][j] = fillWith;
        }
    }
    return matrix
}

const set = (mat: Matrix, coord: Coord, val: number) => mat[coord[0]][coord[1]] = val
const get = (mat: Matrix, coord: Coord) => mat[coord[0]][coord[1]]
const add = (a: Coord, b: Coord): Coord => [a[0] + b[0], a[1] + b[1]]

const isOutsideMatrix = (mat: Matrix, position: Coord) => (
    position[0] < 0 ||
    position[1] < 0 ||
    position[0] >= mat.length ||
    position[1] >= mat[0].length
)

const REASON_OUTSIDE_MATRIX = 'REASON_OUTSIDE_MATRIX'
const REASON_CONFLICT = 'REASON_CONFLICT'

let countActive = 0

function leadWay(
    mat: Matrix,
    startCoord: Coord,
    direction: Vector,
    value: number,
    doAfter?: (mat: Matrix, start: Coord, dir: Vector, value: number) => any
) {
    countActive += 1
    return function *() {
        let position = startCoord
        let currentValue = value
        while (true) {
            if (isOutsideMatrix(mat, position)) {
                countActive--
                return REASON_OUTSIDE_MATRIX
            }
            if (get(mat, position) <= currentValue) {
                countActive--
                return REASON_CONFLICT
            }
            set(mat, position, currentValue)
            yield doAfter ? doAfter(mat, position, direction, currentValue) : null
            currentValue += 1
            position = add(position, direction)
        }
    }()
}

function branchRight(mat: Matrix, start: Coord, dir: Vector, value: number) {
    const newDir = rightTurnFn.get(dir)!
    return leadWay(mat, add(start, newDir), newDir, value + 1)
}

const initializeLeaders = (mat: Matrix, start: Coord, val: number) => [LEFT, UP, RIGHT, DOWN].map((dir) => leadWay(mat, add(start, dir), dir, val, branchRight))

export function solution(mat: Matrix, brightPixels: Array<Coord>, size: Size): Matrix {
    let safeDev = 100

    const maxDistance = size.height + size.width - 2 // assuming there's at least one bright pixel in the matrix
    const sol = createMatrix(size, maxDistance)

    const lightSourcesContext: Map<Coord, {
        generators: Generator[],
        done: boolean
    }> = new Map()

    let doneCount = 0

    while (true) {
        for (let coord of brightPixels) {
            if (!lightSourcesContext.has(coord)) {
                set(sol, coord, 0)
                lightSourcesContext.set(coord, {
                    generators: initializeLeaders(sol, coord, 1),
                    done: false,
                })
            } else {
                const { generators, done } = lightSourcesContext.get(coord)!
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

                lightSourcesContext.set(coord, {
                    generators: newGenerators,
                    done: newGenerators.length === 0,
                })
            }
        }

        if (doneCount === brightPixels.length) {
            break
        }
    }

    return sol
}

