import { Equipment } from './Equipments';
import { TEquipementRules } from './EquipementsRules';

export abstract class AFighter {
  protected fighterType: string;
  protected initialLifePoints: number;
  protected lifePoints: number;
  protected equipements: { [key: string]: Equipment };
  protected fighterRules: TEquipementRules;
  protected nbAttacks: number;
  private handsAvailable: number;

  constructor(fighterType?: string) {
    this.fighterType = fighterType ? fighterType : '';
    this.initialLifePoints = 0;
    this.lifePoints = 0;
    this.equipements = {};
    this.fighterRules = {};
    this.nbAttacks = 0;
    this.handsAvailable = 2;
  }

  setInitialLifePoints(lifePoints: number): void {
    this.initialLifePoints = lifePoints;
    this.lifePoints = lifePoints;
  }

  hitPoints(): number {
    return this.lifePoints;
  }

  hitPointsPercents(): number {
    return Math.round((this.lifePoints / this.initialLifePoints) * 100 * 100) / 100;
  }

  getNbAttacks(): number {
    return this.nbAttacks;
  }

  equip(equipmentName: string): AFighter {
    try {
      const newEquipment: Equipment = new Equipment(equipmentName);
      const newEquipmentRules: TEquipementRules = newEquipment.getRules();

      this.setFighterRulesFromEquipment(newEquipmentRules);
      this.equipements[equipmentName] = newEquipment;

      return this;
    } catch (e) {
      console.error(e);
      return this;
    }
  }

  private setFighterRulesFromEquipment(newEquipmentRules: TEquipementRules): void {
    for (const [key, value] of Object.entries(newEquipmentRules)) {
      if (!this.fighterRules[key]) {
        this.fighterRules[key] = 0;
      }
      this.fighterRules[key] += value || 0;

      if (key === 'handsUsed') {
        this.unEquipHandIfMAxHandsReached();
      }
    }
  }

  private unEquipHandIfMAxHandsReached(): void {
    if (this.fighterRules['handsUsed'] > this.handsAvailable) {
      for (const value of Object.values(this.equipements)) {
        if (value.getRules()['handsUsed'] > 0 && this.fighterRules['handsUsed'] > this.handsAvailable) {
          this.unEquip(value.getName());
        }
      }
    }
  }

  private unEquip(equipmentName: string): AFighter {
    try {
      const oldEquipment: Equipment = new Equipment(equipmentName);
      const oldEquipmentRules: TEquipementRules = oldEquipment.getRules();

      for (const [key, value] of Object.entries(oldEquipmentRules)) {
        if (this.fighterRules[key]) {
          this.fighterRules[key] -= value || 0;
        }
      }

      delete this.equipements[equipmentName];
      return this;
    } catch (e) {
      console.error(e.msg);
      return this;
    }
  }

  setFighterRule(ruleName: string, ruleValue: number): void {
    this.fighterRules[ruleName] = ruleValue;
  }

  getFighterRule(ruleName: string): number {
    if (!this.fighterRules || !this.fighterRules[ruleName])
      return 0;
    else
      return this.fighterRules[ruleName];
  }

  engage(fighter: AFighter): void {
    this.nbAttacks++;
    if (!this.isSkippingAttack()) {
      fighter.getDamagesFrom(this);
    }
    fighter.fightResponseTo(this);
  }

  private isSkippingAttack(): boolean {
    return !!(
      this.nbAttacks >= this.getFighterRule('skipAttack')
      && (this.nbAttacks % this.getFighterRule('skipAttack')) === 0
    );
  }

  getDamagesFrom(fighter: AFighter): void {
    if (this.isCancelingBlowFrom(fighter))
      return;

    const berserkAttack =
      fighter.getFighterRule('berserkAttacksStartUnder') >= fighter.hitPointsPercents()
        ? fighter.getFighterRule('berserkAttackCoef')
        : 1;

    const damages =
      (
        fighter.getFighterRule('attackDamages')
        + (
          fighter.getFighterRule('bonusAttacksUntil') >= fighter.getNbAttacks()
            ? fighter.getFighterRule('bonusAttackDamages')
            : 0
        )
      ) * berserkAttack
      + this.getFighterRule('blowDamages');

    this.lifePoints = Math.max(0, this.lifePoints - damages);
    this.updateFighterRulesAfterFightWith(fighter);
  }

  private isCancelingBlowFrom(fighter: AFighter): boolean {
    let cancelingBlow = false;
    if (fighter.getNbAttacks() % this.getFighterRule('cancelBlowEvery') === 0) {
      cancelingBlow = true;
    }
    return cancelingBlow;
  }

  private updateFighterRulesAfterFightWith(fighter: AFighter): void {
    let breakCancelBlowAfter = fighter.getFighterRule('breakCancelBlowAfter');
    if (breakCancelBlowAfter > 0) {
      breakCancelBlowAfter--;
      fighter.setFighterRule('breakCancelBlowAfter', breakCancelBlowAfter);
      if (breakCancelBlowAfter === 0) {
        this.setFighterRule('cancelBlowEvery', 0);
      }
    }
  }

  private fightResponseTo(fighter: AFighter): void {
    if (this.lifePoints > 0) {
      this.engage(fighter);
    } else {
      console.info(
        `\x1b[32m🏆 ${fighter.constructor.name}\x1b[0m`, `win (${fighter.hitPoints()} points)`,
        `\x1b[31m💀 ${this.constructor.name}\x1b[0m is dead!`
      );
    }
  }
}

