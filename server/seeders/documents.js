module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Documents', [
      {
        userId: 2,
        title: 'Regret',
        content: ` MAMZELLE AURLIE possessed a good strong figure,ruddy cheeks,
         hair that was changing from brown to gray,
         and a determined eye. She wore a man/'s hat about
        the farm, and an old blue army overcoat when it was cold,
        and sometimes top-boots.`,
        access: 'public',
        ownerRoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        title: 'Cousin Tribulation\'s Story',
        content: `Dear Merrys:--As a subject appropriate to the season,
          I want to tell you about a New Year/'s breakfast
          which I had when I was a little girl.
          What do you think it was? A slice of dry bread and an apple.
          This is how it happened, and it is a true story, every word.`,
        access: 'private',
        ownerRoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        title: 'The Story of An Hour',
        content: `Knowing that Mrs. Mallard was afflicted with a heart trouble,
          great care was taken to break to her as gently as possible
          the news of her husband/'s death.`,
        access: 'role',
        ownerRoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        title: 'The Tale of Peter Rabbit',
        content: `ONCE upon a time there were four little Rabbits,
          and their names were Flopsy, Mopsy, Cottontail, and Peter.`,
        access: 'public',
        ownerRoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        title: 'How the Camel Got His Hump',
        content: `NOW this is the next tale, 
         and it tells how the Camel got his big hump.`,
        access: 'public',
        ownerRoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        title: 'The Cactus',
        content: ` The most notable thing about Time is that it
         is so purely relative. A large amount of reminiscence is,
         by common consent, conceded to the drowning man;
         and it is not past belief that one may review an entire
         courtship while removing one's gloves.`,
        access: 'public',
        ownerRoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        title: 'Pigs Is Pigs',
        content: ` Mike Flannery, the Westcote agent of the Interurban Express 
         Company,
         leaned over the counter of the express office and shook his fist.
          Mr. Morehouse, angry and red, stood on the other side
          of the counter, trembling with rage.`,
        access: 'role',
        ownerRoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        title: 'Berenice',
        content: `MISERY is manifold. The wretchedness of earth
         is multiform. Overreaching the wide horizon as the rainbow,
          its hues are as various as the hues of that arch - as distinct too,
          yet as intimately blended. Overreaching the wide horizon as 
          the rainbow!
          How is it that from beauty I have derived a type of unloveliness?`,
        access: 'private',
        ownerRoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        title: 'The Story of Keesh',
        content: `KEESH lived long ago on the rim of the polar sea
         was head man of his village through many and prosperous years,
         and died full of honors with his name on the lips of men.`,
        access: 'private',
        ownerRoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        title: 'The Necklace',
        content: `The girl was one of those pretty and charming young
         creatures who sometimes are born, as if by a slip of fate,
         into a family of clerks.
         She had no dowry, no expectations, no way of being known, understood,
         loved, married by any rich and distinguished man; so she let herself be
         married to a little clerk of the Ministry of Public Instruction.`,
        access: 'public',
        ownerRoleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Documents', { title: [
      'Regret',
      'The Necklace',
      'The Story of Keesh',
      'Berenice',
      'Pigs Is Pigs',
      'The Cactus',
      'How the Camel Got His Hump',
      'The Tale of Peter Rabbit',
      'Cousin Tribulation\'s Story',
      'The Story of An Hour'
    ] }, {});
  }
};
