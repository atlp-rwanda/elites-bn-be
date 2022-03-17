module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.bulkInsert(
			'Accommodations',
			[
				{
					accommodationName: 'Marriot Hotel',
					description: '5 starts Holet with impeccable service',
					streetAddress: 'Kn 456 st',
					images: [
						'https://www.google.com/urlplugins%2Fdummy-images',
						'https://www.google.com/urlplugins%2Fdummy-images',
					],
					amenities: ['WiFi', 'Gym', 'Air Conditioner'],
					geoCoordinates: ["23°26'13.7", "175°37'55.8''E"],
					locationId: 1,
					userId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					accommodationName: 'Emperial Royale Hotel',
					description: '5 starts Holet with impeccable service',
					streetAddress: 'Kn 746 st Kampala',
					images: [
						'https://www.google.com/urlplugins%2Fdummy-images',
						'https://www.google.com/urlplugins%2Fdummy-images',
					],
					approvalStatus: true,
					amenities: ['WiFi', 'Gym', 'Air Conditioner', 'Tv'],
					geoCoordinates: ["23°26'13.7", "175°37'55.8''E"],
					locationId: 2,
					userId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					accommodationName: 'KALISIMBI Hotel',
					description: '5 starts Holet with impeccable service',
					streetAddress: 'Kn 746 st Kampala',
					images: [
						'https://www.google.com/urlplugins%2Fdummy-images',
						'https://www.google.com/urlplugins%2Fdummy-images',
					],
					approvalStatus: true,
					amenities: ['WiFi', 'Gym', 'Air Conditioner', 'Tv'],
					geoCoordinates: ["23°26'13.7", "175°37'55.8''E"],
					locationId: 1,
					userId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		),

	down: (queryInterface, Sequelize) =>
		queryInterface.bulkDelete('Accommodations', null, {}),
};
