export function valid_phoneNumber(phoneNumber) {
  const regex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]{8}$/g;
  return regex.test(phoneNumber);
}
