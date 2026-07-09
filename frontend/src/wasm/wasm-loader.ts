let wasmInstance: WebAssembly.Instance | null = null;
let memory: WebAssembly.Memory | null = null;

export async function initWasm(): Promise<boolean> {
  if (wasmInstance) {
    return true;
  }

  try {
    const wasmUrl = new URL('./pkg/eduprocess_wasm.wasm', import.meta.url).href;
    const response = await fetch(wasmUrl);
    const bytes = await response.arrayBuffer();

    const result = await WebAssembly.instantiate(bytes, {
      env: {
        abort: (msg: number, file: number, line: number, column: number) => {
          console.error(`WASM Abort: ${msg} at ${file}:${line}:${column}`);
        },
      },
    });

    wasmInstance = result.instance;
    memory = wasmInstance.exports.memory as unknown as WebAssembly.Memory;

    console.log('WebAssembly module initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize WASM module:', error);
    return false;
  }
}

function readStringFromMemory(ptr: number, len: number): string {
  if (!memory) {
    throw new Error('WASM memory not initialized');
  }

  const memoryView = new Uint8Array(memory.buffer);
  const bytes = memoryView.slice(ptr, ptr + len);
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

export function validateEmailDomainWasm(email: string): boolean {
  if (!wasmInstance) {
    throw new Error('WASM module not initialized. Call initWasm() first.');
  }

  const validate = wasmInstance.exports.validate_email_domain as Function;
  const result = validate(email, email.length);
  return result === 1;
}

export function hasValidFormatWasm(email: string): boolean {
  if (!wasmInstance) {
    throw new Error('WASM module not initialized. Call initWasm() first.');
  }

  const validate = wasmInstance.exports.has_valid_format as Function;
  const result = validate(email, email.length);
  return result === 1;
}

export function getEmailDomainWasm(email: string): string {
  if (!wasmInstance) {
    throw new Error('WASM module not initialized. Call initWasm() first.');
  }

  const getDomain = wasmInstance.exports.get_email_domain as Function;
  const ptr = getDomain(email);

  const memoryView = new Uint8Array(memory!.buffer);
  let len = 0;
  while (memoryView[ptr + len] !== 0) {
    len++;
  }

  return readStringFromMemory(ptr, len);
}

export function comparePerformance(email: string, iterations: number = 10000): { wasm: number; js: number } {
  const wasmStart = performance.now();
  for (let i = 0; i < iterations; i++) {
    validateEmailDomainWasm(email);
  }
  const wasmTime = performance.now() - wasmStart;

  const jsStart = performance.now();
  for (let i = 0; i < iterations; i++) {
    email.endsWith("@uce.edu.ec");
  }
  const jsTime = performance.now() - jsStart;

  return { wasm: wasmTime, js: jsTime };
}

export function isWasmReady(): boolean {
  return wasmInstance !== null;
}
