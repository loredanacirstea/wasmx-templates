import assert from "assert";
import { benchmark, runf } from './utils.js';
import { hexToUint8Array, encodeToUtf8Array } from './wasmx.js';

const env = {
    chain: {
        denom: "amyt",
        chainId: [0x1b, 0x58], // 7000,
        chainIdFull: "mythos_7000-1",
    },
    block: {
        height: 10,
        timestamp: [...hexToUint8Array(Math.floor(new Date().getTime() / 1000).toString(16))],
        gasLimit: [0x98, 0x96, 0x80], // 10000000
        hash: [...new Uint8Array(32)],
        proposer: [...new Uint8Array(20)],
    },
    transaction: {
        index: [2],
        gasPrice: [...new Uint8Array(32)],
    },
    contract: {
        address: [...hexToUint8Array('39B1BF12E9e21D78F0c76d192c26d47fa710Ec99')],
        bytecode: [...hexToUint8Array('66eeeeeeeeeeeeee60005260206000f3')],
        balance: [0],
        codeHash: [],
    },
    currentCall: {
        origin: [...hexToUint8Array('39B1BF12E9e21D78F0c76d192c26d47fa710Ec98')],
        sender: [...hexToUint8Array('39B1BF12E9e21D78F0c76d192c26d47fa710Ec98')],
        funds: [...new Uint8Array(32)],
        gasLimit: [0x01, 0x86, 0xa0], // 100000
    },
}

const calldata1 = {set: {key: "key", value: 6}}
const calldata2 = {get: {key: "key"}}

const env1 = JSON.parse(JSON.stringify(env))
env1.currentCall.callData = encodeToUtf8Array(JSON.stringify(calldata1));

const env2 = JSON.parse(JSON.stringify(env))
env2.currentCall.callData = encodeToUtf8Array(JSON.stringify(calldata2));

test();

async function test() {
    const storageMap = {};

    let timeTaken = await benchmark(runf, storageMap, env1);
    console.log(`Execution time: ${timeTaken} milliseconds`);

    timeTaken = await benchmark(runf, storageMap, env2);
    console.log(`Execution time: ${timeTaken} milliseconds`);

    console.log("ok");
}
