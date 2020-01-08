const heroes = [
  {
    className: 'fighter',
    subClass: 'soldier',
    goldHireCost: 'free',
    gemsHireCost: 'free',
    prerequisite: '',
    criticalChancePercent: 5,
    criticalDamageTimes: 2,
    threatRating: 90,
    hp: 30,
    atk: 10,
    def: 15,
    evaPercent: 0,
    element: 'Earth',
    equipmentSlots: [
      {
        slotNumber: 1,
        itemsAbleToUse: ['sword', 'mace', 'dagger'],
      },
      {
        slotNumber: 2,
        itemsAbleToUse: ['armorheavy'],
      },
      {
        slotNumber: 3,
        itemsAbleToUse: ['gauntlets'],
      },
      {
        slotNumber: 4,
        itemsAbleToUse: ['boots'],
      },
      {
        slotNumber: 5,
        itemsAbleToUse: ['potion'],
      },
      {
        slotNumber: 6,
        itemsAbleToUse: ['shield'],
      },
    ],
    skillUnlock: [{ newSkillAbleOnLevel: ['lv. 4', 'lv. 10'] }],
  },
];

export default heroes;
