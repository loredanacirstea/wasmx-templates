export function wasmx(storageMap, env) {
    function finish(buf) {
        console.log('-host-finish', [...new Uint8Array(buf)]);
    }

    function stop(buf) {
        console.log('-host-stop', [...new Uint8Array(buf)]);
    }

    function revert(buf) {
        console.log('-host-revert', [...new Uint8Array(buf)]);
    }

    function log(buf) {
        console.log('-host-log', decodeFromUtf8Array(buf));
    }

    function storageStore(keybuf, valuebuf) {
        console.log('-host-storageStore', [...new Uint8Array(keybuf)]
        , [...new Uint8Array(valuebuf)]);
        storageMap[keybuf] = valuebuf;
    }

    function storageLoad(keybuf) {
        console.log('-host-storageLoad', [...new Uint8Array(keybuf)], [...new Uint8Array(storageMap[keybuf] || [])]);
        return storageMap[keybuf] || [];
    }

    function getAccount(buf) {
        console.log('-host-getAccount', [...new Uint8Array(buf)]);
        return encodeToUtf8Array(JSON.stringify({
            balance: [0],
            codeHash: [],
            bytecode: [...hexToUint8Array(curveBytecode.runtime)],
        }));
    }

    function getCallData() {
        // console.log('-host-getCallData', env.currentCall.callData);
        return env.currentCall.callData;
    }

    function getEnv() {
        return encodeToUtf8Array(JSON.stringify(env));
    }

    return {
        finish,
        stop,
        revert,
        log,
        storageStore,
        storageLoad,
        getAccount,
        getCallData,
        getEnv,
    }
}

export function encodeToUtf8Array(str) {
    const encoder = new TextEncoder();
    return encoder.encode(str);
}

export function decodeFromUtf8Array(arr) {
    const encoder = new TextDecoder();
    return encoder.decode(arr);
}

export function hexToUint8Array(hexString) {
    const decoder = new TextDecoder('utf-8');
    const encodedString = hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16));
    return new Uint8Array(encodedString);
}
