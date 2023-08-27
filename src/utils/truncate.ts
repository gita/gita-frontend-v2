export default function truncate(str: string, length: number) {
  return str.length > length ? str.substring(0, length - 3) + "..." : str;
}
