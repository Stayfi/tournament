export type TEquipementRules = {
  [key: string]: number;
};

export const EquipementsRules: {
  [rule: string]: TEquipementRules;
} = {
  'axe': { attackDamages: 6, breakCancelBlowAfter: 3, handsUsed: 1 },
  'sword': { attackDamages: 5, handsUsed: 1 },
  'great-sword': { attackDamages: 12, skipAttack: 3, handsUsed: 2 },
  'buckler': { cancelBlowEvery: 2, handsUsed: 1 },
  'armor': { blowDamages: -3, attackDamages: -1 },
  'poison': { bonusAttackDamages: 20, bonusAttacksUntil: 2 },
  'berserk': { berserkAttackCoef: 2, berserkAttacksStartUnder: 30 }
};
