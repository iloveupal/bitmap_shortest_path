import random from 'random'

const genMatrix = (n: number, m: number) => {
    const matrix: number[][] = []

    for (let i = 0; i < n; i++) {
        matrix[i] = []
        for (let j = 0; j < m; j++) {
            matrix[i][j] = 0
        }
    }

    return matrix
}

const distance = (coordA: [number, number], coordB: [number, number]) => {
    return Math.abs(coordA[0] - coordB[0]) + Math.abs(coordA[1] - coordB[1])
}

const naiveSolution = (matrix: number[][], brightCoords: Array<[number, number]>) => {
    console.time('generate.naiveSolve')
    const solution = genMatrix(matrix.length, matrix[0].length)

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            let closestDistance = 1000
            brightCoords.forEach(coord => {
                const coordsDistance = distance(coord, [i, j])
                if (coordsDistance < closestDistance) {
                    closestDistance = coordsDistance
                }
            })
            solution[i][j] = closestDistance
        }
    }

    console.timeEnd('generate.naiveSolve')
    return solution
}

export const createRandomBitmap = (density: number, minSize: number, maxSize: number): {
    matrix: number[][],
    brightCoords: Array<[number, number]>,
    size: {
        width: number,
        height: number,
    },
    solution: number[][],
} => {
    console.time('generate.create')
    const n = random.int(minSize, maxSize)
    const m = random.int(minSize, maxSize)

    const brightCoords: Array<[number, number]> = []

    const matrix: number[][] = []

    for (let i = 0; i < n; i++) {
        matrix[i] = []
        for (let j = 0; j < m; j++) {
            const val = random.float() < density ? 1 : 0
            matrix[i][j] = val
            if (val) {
                brightCoords.push([i, j])
            }
        }
    }
    console.timeEnd('generate.create')

    if (brightCoords.length === 0) {
        // try until you make it
        return createRandomBitmap(density + 0.05, minSize, maxSize)
    }

    return {
        matrix,
        brightCoords,
        size: {
            height: n,
            width: m,
        },
        solution: naiveSolution(matrix, brightCoords)
    }
}
