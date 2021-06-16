import {
    Size,
    Bitmap,
    Vector,
    Solution,
} from './types'

const parseDimensions = (s: string): Size => {
    const [height, width] = s.split(' ').map((i) => parseInt(i, 10))
    return {
        height,
        width
    }
}

export const bitmapToString = (bitmap: Bitmap): string => (
    `\n${bitmap.map(row => (
        row.map(number => {
            return number.toString(10)
        }).join(' ')
    )).join('\n')}\n`
)



const createParserGenerator: (
    process: Solution,
    writeCallback: (str: string) => void,
) => Generator<string | undefined, null, string> = function *(process, writeCallback) {
    const numberOfPuzzles = parseInt(yield, 10)

    for (let puzzle = 0; puzzle < numberOfPuzzles; puzzle++) {
        const dimensions = parseDimensions(yield)

        const whitePixels: Vector[] = []

        for (let i = 0; i < dimensions.height; i++) {
            const line = yield
            line.split('').forEach((cell, j) => {
                if (cell === '1') {
                    whitePixels.push([i, j])
                }
            })
        }

        writeCallback(bitmapToString(process(whitePixels, dimensions)))
    }

    return null
}

export const createParser = (
    process: Solution,
    writeCallback: (str: string) => void
): Generator<string | undefined, null, string> => {
    const gen = createParserGenerator(process, writeCallback)
    gen.next()
    return gen
}
