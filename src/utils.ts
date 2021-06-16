import {
    Matrix, Vector, Size
} from './types'

export const isGenerator = (val: any): boolean => val && !!val.next

export const LEFT: Vector = [0, -1]
export const RIGHT: Vector = [0, 1]
export const UP: Vector = [-1, 0]
export const DOWN: Vector = [1, 0]

export const rightTurnFn = new Map<Vector, Vector>([
    [LEFT, UP],
    [UP, RIGHT],
    [RIGHT, DOWN],
    [DOWN, LEFT]
])

export const createMatrix = (size: Size, fillWith: number): Matrix => {
    const matrix: Matrix = [];
    for(let i=0; i<size.height; i++) {
        matrix[i] = [];
        for(let j=0; j<size.width; j++) {
            matrix[i][j] = fillWith;
        }
    }
    return matrix
}

export const isOutsideMatrix = (mat: Matrix, position: Vector) => (
    position[0] < 0 ||
    position[1] < 0 ||
    position[0] >= mat.length ||
    position[1] >= mat[0].length
)

export const set = (mat: Matrix, coord: Vector, val: number) => mat[coord[0]][coord[1]] = val
export const get = (mat: Matrix, coord: Vector) => mat[coord[0]][coord[1]]
export const add = (a: Vector, b: Vector): Vector => [a[0] + b[0], a[1] + b[1]]