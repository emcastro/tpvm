import { Serializable, TsSerializer } from 'ts-json-serializer'

@Serializable({ factory: (json: any) => new Bidule(json.a) })
class Bidule {
  x: Bidule

  constructor (public a: string) {
    console.log('hello', a)
   // this.x = this
  }
}

const ser = new TsSerializer()

const ooo = new Bidule('toto')
ooo.x = ooo

const s = ser.serialize(ooo)

console.log(s)
// console.log(JSON.stringify(s))
console.log('===============')

const ser2 = new TsSerializer()

const b = ser2.deserialize<Bidule>(s)
console.log(b)
