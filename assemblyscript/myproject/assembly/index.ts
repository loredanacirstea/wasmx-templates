import { JSON } from "json-as/assembly";
import * as wasmx from "./wasmx";
import { i32ToArrayBuffer, doLog } from './utils';
import { Calldata, SetParams, GetParams } from './types'

export function wasmx_wasmx_1(): void {}

export function instantiate(): void {}

export function main(): void {
  const calldataBz = wasmx.getCallData();
  const calldata = JSON.parse<Calldata>(String.UTF8.decode(calldataBz));
  if (calldata.set != null) {
    set(calldata.set as SetParams)
    wasmx.finish(new ArrayBuffer(0))
  } else if(calldata.get != null) {
    const result = get(calldata.get as GetParams)
    wasmx.finish(result)
  } else {
    wasmx.revert(String.UTF8.encode("method not found"))
  }
}

// @ts-ignore
@wasmx_schema_execute
export function set(args: SetParams): void {
  const keyEncoded = String.UTF8.encode(args.key);
  const valueEncoded = i32ToArrayBuffer(args.value);
  wasmx.storageStore(keyEncoded, valueEncoded);

  const index1 = Uint8Array.wrap(keyEncoded.slice(0, 32))
  const topics = new Array<Uint8Array>(0);
  topics.push(index1);
  doLog(new Uint8Array(0), topics);
}

// @ts-ignore
@wasmx_schema_query("view")
export function get(args: GetParams): ArrayBuffer {
  const keyEncoded = String.UTF8.encode(args.key);
  const value = wasmx.storageLoad(keyEncoded);
  return value;
}

