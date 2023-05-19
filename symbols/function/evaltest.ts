const code = `
  (function() {
    return 2;
  })
`

// Using eval
const fn = eval(code)
const result = fn(2, 3) // 5
console.log(result)
