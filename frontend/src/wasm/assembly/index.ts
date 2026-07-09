// WebAssembly module for email validation
// Compiled from AssemblyScript to WASM

// The UCE domain that institutional emails must end with
const UCE_DOMAIN: string = "@uce.edu.ec";

/**
 * Check if a string ends with the UCE institutional domain
 * @param email - The email string to validate (passed as ArrayBuffer pointer)
 * @returns 1 if valid (ends with @uce.edu.ec), 0 if invalid
 */
export function validate_email_domain(emailPtr: i32, emailLen: i32): i32 {
  // Convert memory pointer to string
  const email = changetype<String>(emailPtr);

  // Check if email is null or empty
  if (email.length === 0) {
    return 0;
  }

  // Get the domain part length (@uce.edu.ec = 11 chars)
  const domainLen = 11; // "@uce.edu.ec".length

  // Email must be at least domain length
  if (email.length < domainLen) {
    return 0;
  }

  // Extract the last 11 characters and compare
  const emailEnd = email.substring(email.length - domainLen);

  if (emailEnd === UCE_DOMAIN) {
    return 1;
  }

  return 0;
}

/**
 * Get the domain part of an email (everything after @)
 * @param email - The email string
 * @returns Pointer to the domain string in memory
 */
export function get_email_domain(emailPtr: i32): i32 {
  const email = changetype<String>(emailPtr);
  const atIndex = email.indexOf("@");

  if (atIndex === -1) {
    return changetype<usize>("");
  }

  const domain = email.substring(atIndex + 1);
  return changetype<usize>(domain);
}

/**
 * Check if email has valid format (basic check)
 * Must contain @ and have at least 3 characters after it
 * @param email - The email string
 * @returns 1 if format looks valid, 0 otherwise
 */
export function has_valid_format(emailPtr: i32, emailLen: i32): i32 {
  const email = changetype<String>(emailPtr);

  if (email.length < 5) {
    return 0;
  }

  const atIndex = email.indexOf("@");

  // Must have @ symbol
  if (atIndex === -1) {
    return 0;
  }

  // Must have something before @
  if (atIndex === 0) {
    return 0;
  }

  // Must have at least 3 characters after @ (e.g., a.bc)
  const afterAt = email.length - atIndex - 1;
  if (afterAt < 3) {
    return 0;
  }

  // Must have a dot after @
  const dotIndex = email.indexOf(".", atIndex);
  if (dotIndex === -1) {
    return 0;
  }

  return 1;
}

/**
 * Batch validate multiple emails
 * @param emails - Array of email pointers
 * @param count - Number of emails to validate
 * @param results - Output array for results (1 = valid, 0 = invalid)
 */
export function validate_email_batch(
  emailsPtr: i32,
  count: i32,
  resultsPtr: i32
): void {
  for (let i = 0; i < count; i++) {
    // Each email pointer is 4 bytes (32-bit pointer)
    const emailPtr = load<i32>(emailsPtr + i * 4);
    const result = validate_email_domain(emailPtr, 0);
    store<i32>(resultsPtr + i * 4, result);
  }
}
