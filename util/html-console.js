const consoleLog = console.log

let firstUse = true

function log () {
  if (firstUse) {
    firstUse = false
    document.write('<pre>')
  }

  for (let i = 0; i < arguments.length; i++) {
    const arg = arguments[i]
    if (arg instanceof Array) {
      document.write('[' + arguments[i] + ']')
    } else {
      document.write(arguments[i])
    }
    document.write(' ')
  }
  document.write('\n')
  consoleLog.apply(console, arguments)
}

console.log = log
