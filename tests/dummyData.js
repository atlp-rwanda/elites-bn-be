export const roomData = {
  roomType: 'REGULAR',
  roomNumber: 'C-52L',
  price: 300,
  currency: 'USD',
  isAvailable: true,
  accommodaionId: 2,
};
export const invalidRoomData = {
  roomType: 'REGULAR',
  roomNumber: 'C-52L',
  price: 300,
  currency: 'USD',
  isAvailable: 'falsee',
  accommodaionId: [2],
};
export const accommodationData = {
  accommodationName: 'KIGALI VIEW HOTEL',
  description: '2 stars hotel in Nyamirambo',
  streetAddress: 'Kn 342 st',
  amenities: ['wifi', 'en suite Bathroom'],
  approvalStatus: 'pending',
  geoCoordinates: ["23°26'13.7", "175°37'55.8''E"],
  images: [
    'https://www.google.com/urlplugins%2Fdummy-images',
    'https://www.google.com/urlplugins%2Fdummy-images',
  ],
  locationId: 2,
  userId: 1,
};
export const invalidAccommodation = {
  description: '2 stars hotel in Nyamirambo',
  streetAddress: 'Kn 342 st',
  amenities: ['wifi', 'en suite Bathroom'],
  approvalStatus: 'pending',
  geoCoordinates: ["23°26'13.7", "175°37'55.8''E"],
  images: [
    'https://www.google.com/urlplugins%2Fdummy-images',
    'https://www.google.com/urlplugins%2Fdummy-images',
  ],
  locationId: 2,
  userId: 1,
};
export const locationData = {
  locationName: 'RUBAVU',
  description: 'Rubavu lake side',
  country: 'Rwanda',
};
export const invalidLocationData = {
  country: false,
};
export const token =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjQ4MjEwOTIwLCJleHAiOjE2NjU0OTA5MjB9.aLY46sb66_OeUTHZc2QQBPF3iNUirf182eGE4PaDxos';
export const expiredToken =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjQ4MTEzMzQ4LCJleHAiOjE2NDgxMTUxNDh9.XUP1m0dbo3cGVd0sXSjiEa1IlPmhdcqnKZCAhgvOFBA';
