
/** wasmx_wasmx_1 */

export declare function getCallData(): ArrayBuffer
export declare function storageStore(key: ArrayBuffer, value: ArrayBuffer): void
export declare function storageLoad(key: ArrayBuffer): ArrayBuffer
export declare function storageStoreGlobal(key: ArrayBuffer, value: ArrayBuffer): void
export declare function storageLoadGlobal(key: ArrayBuffer): ArrayBuffer
export declare function log(value: ArrayBuffer): void
export declare function finish(value: ArrayBuffer): void
export declare function revert(message: ArrayBuffer): void

/** wasmx_wasmx_2 */

// export declare function getEnv(): ArrayBuffer
// export declare function storageStore(key: ArrayBuffer, value: ArrayBuffer): void
// export declare function storageLoad(key: ArrayBuffer): ArrayBuffer
// export declare function log(value: ArrayBuffer): void
// export declare function finish(value: ArrayBuffer): void
// export declare function revert(message: ArrayBuffer): void
// export declare function getBlockHash(number: ArrayBuffer): ArrayBuffer
// export declare function getAccount(address: ArrayBuffer): ArrayBuffer
// export declare function getBalance(address: ArrayBuffer): ArrayBuffer
// export declare function createAccount(account: ArrayBuffer): ArrayBuffer
// export declare function create2Account(account: ArrayBuffer): ArrayBuffer
// export declare function externalCall(data: ArrayBuffer): ArrayBuffer
// export declare function keccak256(value: ArrayBuffer): ArrayBuffer
