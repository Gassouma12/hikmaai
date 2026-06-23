/* Real photographs of the two great libraries.
   ponytail: was illustrated SVGs; swapped for jpgs to match the brief. */
import baghdadImg from '../images/baghdad.jpeg'
import timbuktuImg from '../images/timbuktu.jpeg'

export function BaytAlHikmaScene() {
  return <img className="heritage-scene" src={baghdadImg} alt="Bayt al-Hikma, Baghdad" />
}

export function TimbuktuScene() {
  return <img className="heritage-scene" src={timbuktuImg} alt="Sankore, Timbuktu" />
}
