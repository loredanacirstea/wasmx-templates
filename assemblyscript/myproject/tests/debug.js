async function instantiate(module, imports = {}) {
  const __module0 = imports.wasmx;
  const adaptedImports = {
    wasmx: Object.assign(Object.create(__module0), {
      getCallData() {
        // assembly/wasmx/getCallData() => ~lib/arraybuffer/ArrayBuffer
        return __lowerBuffer(__module0.getCallData()) || __notnull();
      },
      storageStore(key, value) {
        // assembly/wasmx/storageStore(~lib/arraybuffer/ArrayBuffer, ~lib/arraybuffer/ArrayBuffer) => void
        key = __liftBuffer(key >>> 0);
        value = __liftBuffer(value >>> 0);
        __module0.storageStore(key, value);
      },
      log(value) {
        // assembly/wasmx/log(~lib/arraybuffer/ArrayBuffer) => void
        value = __liftBuffer(value >>> 0);
        __module0.log(value);
      },
      finish(value) {
        // assembly/wasmx/finish(~lib/arraybuffer/ArrayBuffer) => void
        value = __liftBuffer(value >>> 0);
        __module0.finish(value);
      },
      storageLoad(key) {
        // assembly/wasmx/storageLoad(~lib/arraybuffer/ArrayBuffer) => ~lib/arraybuffer/ArrayBuffer
        key = __liftBuffer(key >>> 0);
        return __lowerBuffer(__module0.storageLoad(key)) || __notnull();
      },
      revert(message) {
        // assembly/wasmx/revert(~lib/arraybuffer/ArrayBuffer) => void
        message = __liftBuffer(message >>> 0);
        __module0.revert(message);
      },
    }),
    env: Object.assign(Object.create(globalThis), imports.env || {}, {
      abort(message, fileName, lineNumber, columnNumber) {
        // ~lib/builtins/abort(~lib/string/String | null?, ~lib/string/String | null?, u32?, u32?) => void
        message = __liftString(message >>> 0);
        fileName = __liftString(fileName >>> 0);
        lineNumber = lineNumber >>> 0;
        columnNumber = columnNumber >>> 0;
        (() => {
          // @external.js
          throw Error(`${message} in ${fileName}:${lineNumber}:${columnNumber}`);
        })();
      },
      "console.log"(text) {
        // ~lib/bindings/dom/console.log(~lib/string/String) => void
        text = __liftString(text >>> 0);
        console.log(text);
      },
    }),
  };
  const { exports } = await WebAssembly.instantiate(module, adaptedImports);
  const memory = exports.memory || imports.env.memory;
  const adaptedExports = Object.setPrototypeOf({
    set(args) {
      // assembly/index/set(assembly/types/SetParams) => void
      args = __lowerRecord5(args) || __notnull();
      exports.set(args);
    },
    get(args) {
      // assembly/index/get(assembly/types/GetParams) => ~lib/arraybuffer/ArrayBuffer
      args = __lowerRecord6(args) || __notnull();
      return __liftBuffer(exports.get(args) >>> 0);
    },
  }, exports);
  function __lowerRecord5(value) {
    // assembly/types/SetParams
    // Hint: Opt-out from lowering as a record by providing an empty constructor
    if (value == null) return 0;
    const pointer = exports.__pin(exports.__new(8, 5));
    __setU32(pointer + 0, __lowerString(value.key) || __notnull());
    __setU32(pointer + 4, value.value);
    exports.__unpin(pointer);
    return pointer;
  }
  function __lowerRecord6(value) {
    // assembly/types/GetParams
    // Hint: Opt-out from lowering as a record by providing an empty constructor
    if (value == null) return 0;
    const pointer = exports.__pin(exports.__new(4, 6));
    __setU32(pointer + 0, __lowerString(value.key) || __notnull());
    exports.__unpin(pointer);
    return pointer;
  }
  function __liftBuffer(pointer) {
    if (!pointer) return null;
    return memory.buffer.slice(pointer, pointer + new Uint32Array(memory.buffer)[pointer - 4 >>> 2]);
  }
  function __lowerBuffer(value) {
    if (value == null) return 0;
    const pointer = exports.__new(value.byteLength, 1) >>> 0;
    new Uint8Array(memory.buffer).set(new Uint8Array(value), pointer);
    return pointer;
  }
  function __liftString(pointer) {
    if (!pointer) return null;
    const
      end = pointer + new Uint32Array(memory.buffer)[pointer - 4 >>> 2] >>> 1,
      memoryU16 = new Uint16Array(memory.buffer);
    let
      start = pointer >>> 1,
      string = "";
    while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, start += 1024));
    return string + String.fromCharCode(...memoryU16.subarray(start, end));
  }
  function __lowerString(value) {
    if (value == null) return 0;
    const
      length = value.length,
      pointer = exports.__new(length << 1, 2) >>> 0,
      memoryU16 = new Uint16Array(memory.buffer);
    for (let i = 0; i < length; ++i) memoryU16[(pointer >>> 1) + i] = value.charCodeAt(i);
    return pointer;
  }
  function __notnull() {
    throw TypeError("value must not be null");
  }
  let __dataview = new DataView(memory.buffer);
  function __setU32(pointer, value) {
    try {
      __dataview.setUint32(pointer, value, true);
    } catch {
      __dataview = new DataView(memory.buffer);
      __dataview.setUint32(pointer, value, true);
    }
  }
  return adaptedExports;
}

export async function getExports(wasmxImport) {
    const exports = await (async url => instantiate(
        await (async () => {
          try { return await globalThis.WebAssembly.compileStreaming(globalThis.fetch(url)); }
          catch { return globalThis.WebAssembly.compile(await (await import("node:fs/promises")).readFile(url)); }
        })(), {
          wasmx: __maybeDefault(wasmxImport),
        }
    ))(new URL("../build/debug.wasm", import.meta.url));
    return exports
}

function __maybeDefault(module) {
  return typeof module.default === "object" && Object.keys(module).length == 1
    ? module.default
    : module;
}
