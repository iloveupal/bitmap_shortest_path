import { Solution, Vector, Size } from './types'

import { createParser } from "./io"
import { createBitmap } from './utils'

const solution: Solution = (pixels: Array<Vector>, s: Size) => createBitmap(s, 42)

const inputFixture = `2
3 4
0001
0011
0110
5 4
0100
0000
0010
0000
0000`

const expectedOutput = `
42 42 42 42
42 42 42 42
42 42 42 42

42 42 42 42
42 42 42 42
42 42 42 42
42 42 42 42
42 42 42 42
`

describe('parser', () => {
    test('it should work with the input correctly', () => {
        let outputString = ''
        const testOutput = (str: string) => outputString = outputString.concat(str)
        const parser = createParser(solution, testOutput)

        inputFixture.split('\n').forEach((line) => parser.next(line))

        expect(outputString).toEqual(expectedOutput)
    })
})