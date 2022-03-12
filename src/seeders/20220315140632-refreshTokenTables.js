module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert(
			'refreshTokenTables',
			[
				{
					refreshToken:
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDc1MjEwOTQsImV4cCI6MTY0ODEyNTg5NH0.KQ8OFHPhpE6f1DkV7TC9f7MwJDBMeTiMEpt80zQgOYM',
					createdAt: new Date(),
					updatedAt: new Date(),
				},

			],
			{}
		);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('refreshTokenTables', null, {});
	},
};
