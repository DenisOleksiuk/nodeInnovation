export default function getCardObject(id, arr) {
  let result = {};
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].innovation === id) {
      result = arr[i];
      break;
    }
  }
  return result;
}
