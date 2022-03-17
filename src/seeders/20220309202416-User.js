module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.bulkInsert(
			'Users',
			[
				{
					names: 'Honore Iradukunda',
					email: 'ihonore01@gmail.com',
					password: 'Password1',
					roleId: 3,
					managerId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					names: 'Irene Kalisa',
					email: 'kalisa@gmail.com',
					password: 'Password1',
					roleId: 5,
					managerId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					names: 'Gabriel Manzi',
					email: 'manzigabby@gmail.com',
					password: 'Password1',
					roleId: 3,
					managerId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],

			{}
		),

	down: (queryInterface, Sequelize) =>
		queryInterface.bulkDelete('Users', null, {}),
};
