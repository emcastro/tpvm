
type Deco = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor

// Spy methods input and result
const LOG: boolean = true

type ArgFormatter = (...args: any[]) => any[]
type ResultFormatter = (result: any) => any

interface SpyArgsParameters {
  name?: string
  in?: ArgFormatter
}

interface SpyParameters extends SpyArgsParameters {
  out?: ResultFormatter
}

let spyId = 0

function mkSpy (showCall: boolean, showResult: boolean) {
  return (params: SpyParameters) => {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      if (!LOG) return descriptor

      const original = descriptor.value

      const name = params.name || `${target.constructor.name}#${propertyKey}`
      const argFormatter = params.in || ((...arg) => arg)
      const resultFormatter = params.out || (result => result)

      descriptor.value = function (this: any, ...args: any[]) {
        const i = spyId++
        if (showCall) {
          console.log(`->${name} ${i}`, argFormatter.apply(this, args))
        }
        const result = original.call(this, ...args)
        if (showResult) {
          console.log(`<-${name} ${i}`, argFormatter.apply(this, args), ' => ', resultFormatter(result))
        }
        return result
      }

      return descriptor
    }
  }
}

export const Spy = mkSpy(true, true)

export const SpyArgs: (p: SpyArgsParameters) => Deco = mkSpy(true, false)

export const SpyResult = mkSpy(false, true)

// Check assertion on methods
const ASSERT: boolean = true

export function Assert (predicate: (this: any, ...args: any[]) => boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!ASSERT) return descriptor

    const original = descriptor.value

    descriptor.value = function (this: any, ...args: any[]) {
      const result = original.call(this, ...args)
      if (!predicate.apply(this, [...args, result])) {
        throw Error('Assertion Error')
      }
      return result
    }

    return descriptor
  }
}
