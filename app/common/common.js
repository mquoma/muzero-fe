
var result = '1111111111111111111111111111111111111111111111111'.split('').reverse().reduce( (acc, val, idx) => 
	acc += parseInt(val) * (Math.pow(2, idx)), 0);

console.log(result);


