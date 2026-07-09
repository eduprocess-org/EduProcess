const UCE_DOMAIN: string = "@uce.edu.ec";

export function validate_email_domain(emailPtr: i32, emailLen: i32): i32 {
  const email = changetype<String>(emailPtr);

  if (email.length === 0) {
    return 0;
  }

  const domainLen = 11;

  if (email.length < domainLen) {
    return 0;
  }

  const emailEnd = email.substring(email.length - domainLen);

  if (emailEnd === UCE_DOMAIN) {
    return 1;
  }

  return 0;
}

export function get_email_domain(emailPtr: i32): i32 {
  const email = changetype<String>(emailPtr);
  const atIndex = email.indexOf("@");

  if (atIndex === -1) {
    return changetype<usize>("");
  }

  const domain = email.substring(atIndex + 1);
  return changetype<usize>(domain);
}

export function has_valid_format(emailPtr: i32, emailLen: i32): i32 {
  const email = changetype<String>(emailPtr);

  if (email.length < 5) {
    return 0;
  }

  const atIndex = email.indexOf("@");

  if (atIndex === -1) {
    return 0;
  }

  if (atIndex === 0) {
    return 0;
  }

  const afterAt = email.length - atIndex - 1;
  if (afterAt < 3) {
    return 0;
  }

  const dotIndex = email.indexOf(".", atIndex);
  if (dotIndex === -1) {
    return 0;
  }

  return 1;
}

export function validate_email_batch(
  emailsPtr: i32,
  count: i32,
  resultsPtr: i32
): void {
  for (let i = 0; i < count; i++) {
    const emailPtr = load<i32>(emailsPtr + i * 4);
    const result = validate_email_domain(emailPtr, 0);
    store<i32>(resultsPtr + i * 4, result);
  }
}
