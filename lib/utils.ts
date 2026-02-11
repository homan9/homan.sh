// Base block explorer
const BASESCAN_URL = "https://basescan.org";

export function getAddressUrl(address: string): string {
  return `${BASESCAN_URL}/address/${address}`;
}
