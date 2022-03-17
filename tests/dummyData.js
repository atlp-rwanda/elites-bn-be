export const roomData = {
	roomType: "REGULAR",
	roomNumber: "C-52L",
	price: 300,
	currency: "USD",
	isAvailable: true,
};
export const invalidRoomData = {
	roomType: "REGULAR",
	roomNumber: "C-52L",
	price: 300,
	currency: "USD",
	isAvailable: "falsee",
};
export const accommodationData = {
	accommodationName: "KIGALI VIEW HOTEL",
	description: "2 stars hotel in Nyamirambo",
	streetAddress: "Kn 342 st",
	amenities: ["wifi", "en suite Bathroom"],
	approvalStatus: "pending",
	geoCoordinates: ["23°26'13.7", "175°37'55.8''E"],
	images: [
		"https://www.google.com/urlplugins%2Fdummy-images",
		"https://www.google.com/urlplugins%2Fdummy-images",
	],
	locationId: 2,
	userId: 1,
};
export const invalidAccommodation = {
	description: "2 stars hotel in Nyamirambo",
	streetAddress: "Kn 342 st",
	amenities: ["wifi", "en suite Bathroom"],
	approvalStatus: "pending",
	geoCoordinates: ["23°26'13.7", "175°37'55.8''E"],
	images: [
		"https://www.google.com/urlplugins%2Fdummy-images",
		"https://www.google.com/urlplugins%2Fdummy-images",
	],
	locationId: 2,
	userId: 1,
};
export const locationData = {
	locationName: "RUBAVU",
	description: "Rubavu lake side",
	country: "Rwanda",
};
export const invalidLocationData = {
	country: false,
};
