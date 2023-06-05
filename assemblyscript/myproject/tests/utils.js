import { getExports } from "./debug.js";
import { wasmx } from './wasmx.js';

export async function benchmark(func, ...args) {
    let start = performance.now();
    await func(...args);
    let end = performance.now();
    return end - start;
}

export async function runf(storage, env) {
    const { main } = await getExports(wasmx(storage, env));
    const value = main(env);
    if (value) {
        console.log(u8ArrayToHex(value))
    }
}

export function u8ArrayToHex(arr) {
    return arr.reduce((accum, v) => accum + v.toString(16).padStart(2, '0'), "");
}
