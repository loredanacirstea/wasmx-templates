import { JSON } from "json-as/assembly";

// @ts-ignore
@serializable
export class Calldata {
  set!: SetParams | null;
  get!: GetParams | null;
}

// @ts-ignore
@serializable
export class Log {
	data: Uint8Array
	topics: Array<Uint8Array>
    constructor(data: Uint8Array, topics: Array<Uint8Array>) {
        this.data = data;
        this.topics = topics;
    }
}

// @ts-ignore
@serializable
export class SetParams {
  key!: string;
  value!: i32;
}

// @ts-ignore
@serializable
export class GetParams {
  key!: string;
}
