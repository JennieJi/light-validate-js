export default function required(value) {
  return value !== null && typeof value !== 'undefined';
}