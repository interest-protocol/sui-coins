/* tslint:disable */
/* eslint-disable */
/**
* Get the version of the crate (useful for testing the package).
* @returns {string}
*/
export function version(): string;
/**
* Deserialize the bytecode into a JSON string.
* @param {string} binary
* @returns {any}
*/
export function deserialize(binary: string): any;
/**
* Perform an operation on a bytecode string - deserialize, patch the identifiers
* and serialize back to a bytecode string.
* @param {string} binary
* @param {any} map
* @returns {any}
*/
export function update_identifiers(binary: string, map: any): any;
/**
* Serialize the JSON module into a HEX string.
* @param {string} json_module
* @returns {any}
*/
export function serialize(json_module: string): any;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly version: (a: number) => void;
  readonly deserialize: (a: number, b: number, c: number) => void;
  readonly update_identifiers: (a: number, b: number, c: number, d: number) => void;
  readonly serialize: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
