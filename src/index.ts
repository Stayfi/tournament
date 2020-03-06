import { Swordsman } from './Fighters/Swordsman'
import { Viking } from './Fighters/Viking'
import { Highlander } from './Fighters/Highlander';

let swordsman: Swordsman;
let viking: Viking;
let highlander: Highlander;


console.info(
  ' > Swordsman engage Vicking'
);
swordsman = new Swordsman();
viking = new Viking();
swordsman.engage(viking);

console.info(
  '\n' +
  ' > Swordsman with buckler engage a Vicking with buckler'
);
swordsman = new Swordsman().equip("buckler");
viking = new Viking().equip("buckler");
swordsman.engage(viking);


console.info(
  '\n' +
  ' > Swordsman with buckler and armor engage a Highlander'
);
swordsman = new Swordsman().equip("buckler").equip("armor");
highlander = new Highlander();
swordsman.engage(highlander);


console.info(
  '\n' +
  ' > Swordsman with axe, buckler and armor engage a Veteran Highlander'
);
swordsman = new Swordsman("Vicious").equip("axe").equip("buckler").equip("armor")
highlander = new Highlander("Veteran")
swordsman.engage(highlander)

console.info(
  '\n' +
  ' > Viking with buckler and armor engage a Highlander'
);
viking = new Viking().equip("buckler").equip("armor");
highlander = new Highlander();
viking.engage(highlander);
