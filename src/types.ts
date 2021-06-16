export type Bitmap = number[][]

export type Vector = [number, number]

export type Size = {
    height: number,
    width: number,
}

export type Solution = (v: Vector[], s: Size) => Bitmap
