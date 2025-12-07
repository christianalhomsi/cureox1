export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  try {
    return JSON.stringify(error);
  } catch {
    return 'Something went wrong. Please try again.';
  }
}

export function isEmail(value: string): boolean {
  return /.+@.+\..+/.test(value);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function required(value: string | null | undefined): boolean {
  return value != null && String(value).trim().length > 0;
}

