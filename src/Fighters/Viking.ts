import { AFighter } from './AFighter';

export class Viking extends AFighter {

  constructor(fighterType?: string) {
    super(fighterType);
    this.setInitialLifePoints(120);
    return this.equip('axe');
  }
}
