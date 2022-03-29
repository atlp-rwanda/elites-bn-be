module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tripRequests",
      [
        {
          id: 1,
          userId: 1,
          managerId: 1,
          departLocation: 1,
          arrivalLocation: 2,
          tripReason: "this is trip for research purpose",
          departDate: "2022-9-03",
          returnDate: "2022-10-03",
          accomodationId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          userId: 2,
          managerId: 1,
          departLocation: 2,
          arrivalLocation: 3,
          tripReason: "this is trip for research purpose",
          departDate: "2022-10-03",
          returnDate: "2022-12-03",
          accomodationId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          userId: 2,
          managerId: 3,
          departLocation: 2,
          arrivalLocation: 3,
          status: "approved",
          tripReason: "this is trip for research purpose",
          departDate: "2022-10-03",
          returnDate: "2022-12-03",
          accomodationId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          userId: 2,
          managerId: 3,
          departLocation: 2,
          arrivalLocation: 3,
          status: "approved",
          tripReason: "this is to test ",
          departDate: "2024-04-03",
          returnDate: "2024-04-05",
          accomodationId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          userId: 10,
          managerId: 3,
          departLocation: 2,
          arrivalLocation: 3,
          status: "approved",
          tripReason: "this is to test ",
          departDate: "2024-04-03",
          returnDate: "2024-04-05",
          accomodationId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tripRequests", null, {});
  },
};
