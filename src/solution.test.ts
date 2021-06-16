import { solution } from './solution'
import { createRandomBitmap } from '../testUtils'

const mat = [
    [0, 1, 0],
    [0, 0, 1],
    [1, 0, 0]
]

const sol = [
    [1, 0, 1],
    [1, 1, 0],
    [0, 1, 1]
]

const mat2 = [
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

const sol2 = [
    [1, 0, 1, 2],
    [2, 1, 1, 2],
    [2, 1, 0, 1],
    [3, 2, 1, 2],
    [4, 3, 2, 3]
];

test("preselected data", () => {
    expect(solution(mat, [[0, 1], [1, 2], [2, 0]], { height: 3, width: 3 })).toEqual(sol)
    expect(solution(mat2, [[0, 1], [2, 2]], { height: 5, width: 4 })).toEqual(sol2)
})

test('couple of random tests', () => {
    for (let i = 0; i < 10; i++) {
        const {
            solution: sol,
            matrix,
            brightCoords,
            size,
        } = createRandomBitmap(0.3, 1, 20)

        expect(solution(matrix, brightCoords, size)).toEqual(sol)
    }
})
