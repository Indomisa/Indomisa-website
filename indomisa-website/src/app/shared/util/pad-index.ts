/** Formats a 1-based index as a zero-padded two-digit string, e.g. 1 -> "01". */
export function padIndex(n: number): string {
  return n.toString().padStart(2, '0');
}
