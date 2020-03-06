import { Swordsman } from "../src/Fighters/Swordsman"
import { Viking } from "../src/Fighters/Viking"
import { Highlander } from "../src/Fighters/Highlander"

/**
 *
 * This is a duel simulation
 *
 * Blow exchange are sequential, A engage B means that A will give the first
 * blow, then B will respond
 *
 * There's no such thing as negative hit points, when you reach 0, you are dead,
 * combat stops.
 *
 */
describe('Test if the tournament behaves as expected', () => {
  /**
  * A Swordsman has 100 hit points and use a 1 hand sword that does 5 dmg
  * A Viking has 120 hit points and use a 1 hand axe that does 6 dmg
  */
  test('Viking should beat the swordsman', () => {
    //given
    const swordsman = new Swordsman()
    const viking = new Viking()
    //when
    swordsman.engage(viking)
    //then
    expect(swordsman.hitPoints()).toBe(0)
    expect(viking.hitPoints()).toBe(35)
  })


  /**
   * A buckler cancel all the damages of a blow, one time out of two
   * A buckler is destroyed after blocking 3 blow from an axe
   */
  test('Viking with buckler should beat swordsman with buckler', () => {
    //given
    const swordsman = new Swordsman().equip("buckler")
    const viking = new Viking().equip("buckler")
    //when
    swordsman.engage(viking)
    //then
    expect(swordsman.hitPoints()).toBe(0)
    expect(viking.hitPoints()).toBe(70)
  })


  /**
   * An Highlander as 150 hit points and fight with a Great Sword
   * A Great Sword is a two handed sword that deliver 12 damages, but can attack only 2 every 3
   * (attack, attack, rest) 
   * An armor reduces all received damages by 3 & reduces delivered damages by one
   */
  test('Highlander should beat armored swordsman with buckler', () => {
    //given
    const swordsman = new Swordsman().equip("buckler").equip("armor")
    const highlander = new Highlander()
    //when
    swordsman.engage(highlander)
    //then
    expect(swordsman.hitPoints()).toBe(0)
    expect(highlander.hitPoints()).toBe(10)
  })


  /**
   * A vicious Swordsman is a Swordsman that put poison on his weapon. poison add
   * 20 damages on two first blows
   * A veteran Highlander goes Berserk once his hit points are under 30% of his initial total
   * Once Berserk, he doubles his damages.
   * Note: Obviously a swordsman equipping an axe and a buckler remove the sword 
   * (standard human have usually only 2 arms)
   */
  test('Vicious swordsman with an axe and a buckler should beat a veteran highlander', () => {
    //given
    const swordsman = new Swordsman("Vicious").equip("axe").equip("buckler").equip("armor")
    const highlander = new Highlander("Veteran")
    //when
    swordsman.engage(highlander)
    //then
    expect(swordsman.hitPoints()).toBe(1)
    expect(highlander.hitPoints()).toBe(0)
  })
});