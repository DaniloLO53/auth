let x = 5;

function main() {
  let x = 10;
  x = first(x);
  console.log(x);
}

function first(y) {
  y += 10;
  y = second(y);
  return y;
}

function second(y) {
  let z;
  z = x + y;
  return z;
}

main(); 