const fs = require('fs');

const test = {foo: "foo", bar: "bar"}

const testString = `
FOO=${test.foo}
BAR=${test.bar}
`
// Or
fs.writeFileSync('test.tfvars', testString);



