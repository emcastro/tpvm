// @flow

function truc () {
  console.log('this', this)
  console.log('arguments', arguments)
}

function chose () {}

export { truc, chose }
