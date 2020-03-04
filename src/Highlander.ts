import { AFighter } from './AFighter';

export class Highlander extends AFighter {

  constructor(fighterType?: string) {
    super(fighterType);
    this.setInitialLifePoints(150);
    if (fighterType === 'Veteran') {
      this.equip('berserk');
    }
    return this.equip('great-sword');
  }
}
