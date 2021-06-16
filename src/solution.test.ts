import { solution } from './solution'

const sol = [
    [1, 0, 1],
    [1, 1, 0],
    [0, 1, 1]
]

const sol2 = [
    [1, 0, 1, 2],
    [2, 1, 1, 2],
    [2, 1, 0, 1],
    [3, 2, 1, 2],
    [4, 3, 2, 3]
];

test("preselected data", () => {
    expect(solution([[0, 1], [1, 2], [2, 0]], { height: 3, width: 3 })).toEqual(sol)
    expect(solution([[0, 1], [2, 2]], { height: 5, width: 4 })).toEqual(sol2)
})
