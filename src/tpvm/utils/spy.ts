
// Spy methods input and result
const LOG: boolean = true

function mkSpy (showCall: boolean, showResult: boolean) {
  return (argFormatter = (...args: any[]) => args, resultFormatter = (result: any) => result) => {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      if (!LOG) return descriptor

      const original = descriptor.value

      descriptor.value = function (this: any, ...args: any[]) {
        if (showCall) {
          console.log(`->${this.constructor.name}#${propertyKey}`, argFormatter.apply(this, args))
        }
        const result = original.call(this, ...args)
        if (showResult) {
          console.log(`<-${this.constructor.name}#${propertyKey}`, argFormatter.apply(this, args), ' => ', resultFormatter(result))
        }
        return result
      }

      return descriptor
    }
  }
}

export const Spy = mkSpy(true, true)

export const SpyArgs = mkSpy(true, false)

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
