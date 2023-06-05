import { JSON } from "json-as/assembly";
import * as wasmx from "./wasmx";
import { Log } from './types';

export function doLog(data: Uint8Array, topics: Array<Uint8Array>): void {
    const ourLog = new Log(data, topics);
    wasmx.log(String.UTF8.encode(JSON.stringify<Log>(ourLog)));
}

export function arrayBufferToArray<T>(ab: ArrayBuffer): Array<T> {
    let res = new Array<T>(ab.byteLength >> alignof<T>());
    memory.copy(res.dataStart, changetype<usize>(ab), ab.byteLength);
    return res;
}

export function i32ToArrayBuffer(value: i32): ArrayBuffer {
    const arr = Uint32Array.wrap(new ArrayBuffer(32));
    arr[0] = u32(value);
    return Uint8Array.wrap(arr.buffer).reverse().buffer;
}

export function i32FromArrayBuffer(value: ArrayBuffer): i32 {
    const arr = Uint32Array.wrap(value);
    return i32(arr[0]);
}
