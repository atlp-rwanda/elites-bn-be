module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('chatMessages', [{
      postedBy: 10,
      sender: 'Jacob',
      message: 'hello hello, this is my first message,rate my work',
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      postedBy: 11,
      sender: 'james',
      message: 'hello hello, this is my second message,rate my work',
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('chatMessages', null, {});
  },
};
