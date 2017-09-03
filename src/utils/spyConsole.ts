
export default function spyConsole (method: 'log' | 'error' | 'info' | 'warn' | 'trace', ...breakOn: string[]) {
  const cl = (console as any)[method]
  ; (console as any)[method] = function (...args: any[]) {
    // cl(method + '>>')
    cl.apply(console, args)
    args.forEach(a => {
      const asString = '' + a
      breakOn.forEach(b => {
        if (asString.includes(b)) {
          cl('========> break <========')
        }
      })
    })
    // cl('-------')
  }
}
