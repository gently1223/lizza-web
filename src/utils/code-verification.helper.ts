export const codeVerification = ()=> {
  const number = Number((Math.random()*10000).toFixed());
  if(number.toString().length === 4) {
    return number;
  }else {
    return 1015;
  }
}

