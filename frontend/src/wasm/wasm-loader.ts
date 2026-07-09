// WebAssembly loader and helper functions
// This module provides a TypeScript-friendly interface to the WASM module

let wasmInstance: WebAssembly.Instance | null = null;
let memory: WebAssembly.Memory | null = null;

/**
 * Initialize the WASM module
 * Must be called before using any WASM functions
 */
export async function initWasm(): Promise<boolean> {
  if (wasmInstance) {
    return true; // Already initialized
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

/**
 * Read a string from WASM memory
 */
function readStringFromMemory(ptr: number, len: number): string {
  if (!memory) {
    throw new Error('WASM memory not initialized');
  }

  const memoryView = new Uint8Array(memory.buffer);
  const bytes = memoryView.slice(ptr, ptr + len);
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

/**
 * Validate if an email ends with @uce.edu.ec using WASM
 * @param email - The email to validate
 * @returns true if valid (ends with @uce.edu.ec), false otherwise
 */
export function validateEmailDomainWasm(email: string): boolean {
  if (!wasmInstance) {
    throw new Error('WASM module not initialized. Call initWasm() first.');
  }

  const validate = wasmInstance.exports.validate_email_domain as Function;
  const result = validate(email, email.length);
  return result === 1;
}

/**
 * Check if email has basic valid format using WASM
 * @param email - The email to validate
 * @returns true if format looks valid, false otherwise
 */
export function hasValidFormatWasm(email: string): boolean {
  if (!wasmInstance) {
    throw new Error('WASM module not initialized. Call initWasm() first.');
  }

  const validate = wasmInstance.exports.has_valid_format as Function;
  const result = validate(email, email.length);
  return result === 1;
}

/**
 * Get the domain part of an email using WASM
 * @param email - The email
 * @returns The domain part (after @)
 */
export function getEmailDomainWasm(email: string): string {
  if (!wasmInstance) {
    throw new Error('WASM module not initialized. Call initWasm() first.');
  }

  const getDomain = wasmInstance.exports.get_email_domain as Function;
  const ptr = getDomain(email);

  // Read the string from memory
  const memoryView = new Uint8Array(memory!.buffer);
  let len = 0;
  while (memoryView[ptr + len] !== 0) {
    len++;
  }

  return readStringFromMemory(ptr, len);
}

/**
 * Performance comparison: WASM vs JavaScript
 * Validates email domain using both methods and returns timing
 */
export function comparePerformance(email: string, iterations: number = 10000): { wasm: number; js: number } {
  // WASM validation
  const wasmStart = performance.now();
  for (let i = 0; i < iterations; i++) {
    validateEmailDomainWasm(email);
  }
  const wasmTime = performance.now() - wasmStart;

  // JavaScript validation
  const jsStart = performance.now();
  for (let i = 0; i < iterations; i++) {
    email.endsWith("@uce.edu.ec");
  }
  const jsTime = performance.now() - jsStart;

  return { wasm: wasmTime, js: jsTime };
}

/**
 * Check if WASM module is ready
 */
export function isWasmReady(): boolean {
  return wasmInstance !== null;
}
