import { EquipementsRules, TEquipementRules } from './EquipementsRules';

export class Equipment {
  private name: string;
  private rules: TEquipementRules;
  constructor(name: string) {
    this.name = name;
    this.rules = EquipementsRules[name];
  }

  getName(): string {
    return this.name;
  }

  getRules(): TEquipementRules {
    return this.rules;
  }

  getRule(ruleName: string): number {
    if (!this.rules || this.rules[ruleName])
      throw new Error('Equipment rule undefined');
    else
      return this.rules[ruleName];
  }
}
