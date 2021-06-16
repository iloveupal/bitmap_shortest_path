import readline from 'readline'

import { solution } from './src/solution'
import { createParser } from './src/io'
import { stdout } from 'process'

const rl = readline.createInterface({
    input: process.stdin,
    crlfDelay: Infinity,
})

async function run() {
    const parser = createParser(solution, (str) => stdout.write(str))

    for await (const l of rl) {
        const {done} = parser.next(l)
        if (done) {
            return
        }
    }
}

run()
