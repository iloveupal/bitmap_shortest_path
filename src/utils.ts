import {
    Bitmap, Vector, Size
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

export const createBitmap = (size: Size, fillWith: number): Bitmap => {
    const bitmap: Bitmap = [];
    for(let i=0; i<size.height; i++) {
        bitmap[i] = [];
        for(let j=0; j<size.width; j++) {
            bitmap[i][j] = fillWith;
        }
    }
    return bitmap
}

export const isOutsideBitmap = (bitmap: Bitmap, position: Vector) => (
    position[0] < 0 ||
    position[1] < 0 ||
    position[0] >= bitmap.length ||
    position[1] >= bitmap[0].length
)

export const set = (bitmap: Bitmap, position: Vector, val: number) => bitmap[position[0]][position[1]] = val
export const get = (bitmap: Bitmap, coord: Vector) => bitmap[coord[0]][coord[1]]
export const add = (a: Vector, b: Vector): Vector => [a[0] + b[0], a[1] + b[1]]