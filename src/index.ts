import { Swordsman } from './Swordsman'
import { Viking } from './Viking'

//do nothing here

const swordsman = new Swordsman().equip("buckler")
const viking = new Viking().equip("buckler")
//when
swordsman.engage(viking)