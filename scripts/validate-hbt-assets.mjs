import { readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const paths = [
  'src/assets/portraits/trung-trac.png', 'src/assets/heroes/trung-trac/idle.png', 'src/assets/heroes/trung-trac/attack.png', 'src/assets/vfx/trong-dong-lenh-vuong.png',
  'src/assets/portraits/trung-nhi.png', 'src/assets/heroes/trung-nhi/idle.png', 'src/assets/heroes/trung-nhi/attack.png', 'src/assets/vfx/lien-hoan-lac-tien.png',
  'src/assets/portraits/le-chan.png', 'src/assets/heroes/le-chan/idle.png', 'src/assets/heroes/le-chan/attack.png', 'src/assets/vfx/song-trao-hai-tan.png',
]
const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
for (const relative of paths) {
  const path = resolve(root, relative)
  const bytes = readFileSync(path)
  if (bytes.length <= 100 || !bytes.subarray(0, 8).equals(signature)) throw new Error(`${relative}: not a non-empty PNG`)
  if (bytes.readUInt32BE(12) !== 0x49484452) throw new Error(`${relative}: missing IHDR`)
  if (bytes.readUInt32BE(16) !== 128 || bytes.readUInt32BE(20) !== 128) throw new Error(`${relative}: expected 128x128`)
  const colorType = bytes[25]
  if (colorType !== 4 && colorType !== 6) throw new Error(`${relative}: PNG is not alpha-capable (color type ${colorType})`)
  if (!bytes.includes(Buffer.from('IDAT')) || !bytes.includes(Buffer.from('IEND'))) throw new Error(`${relative}: incomplete PNG chunks`)
  console.log(`${relative}: 128x128 RGBA/alpha-capable (${statSync(path).size} bytes)`)
}
console.log(`Validated ${paths.length}/12 HBT production assets`)
