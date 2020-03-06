import { AFighter } from './AFighter';

export class Swordsman extends AFighter {

  constructor(fighterType?: string) {
    super(fighterType);
    this.setInitialLifePoints(100);
    if (fighterType === 'Vicious') {
      this.equip('poison');
    }
    return this.equip('sword');
  }
}
