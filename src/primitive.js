// @flow

export function callPrimitive (primitive: string, operands: Array<mixed | Promise<mixed>>) {
  switch (primitive) {
    default:
      throw new Error('Not implemented primitive: ' + primitive)
  }
}
