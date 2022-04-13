export const addRequest = {
  departLocation: 1,
  destinations: [
    {
      accommodationId: 3,
      destinationId: 2,
    },
  ],
  tripReason: 'Free Tours',
  rememberMe: 'true',
  departDate: '2022-06-07',
  returnDate: '2023-03-04',
};

export const notRememberMe1 = {
  departLocation: 1,
  destinations: [
    {
      accommodationId: 3,
      destinationId: 2,
    },
  ],
  tripReason: 'Free Tours',
  rememberMe: 'false',
  passportNumber: 'KZG12345',
  address: 'CALIFORNIA-BEVERLYHILLS-MONTANA',
  departDate: '2022-05-07',
  returnDate: '2023-02-03',
};
export const notRememberMe2 = {
  departLocation: 1,
  destinations: [
    {
      accommodationId: 3,
      destinationId: 2,
    },
  ],
  tripReason: 'Free Tours',
  rememberMe: 'false',
  departDate: '2022-04-07',
  returnDate: '2023-02-03',
};

export const tripRequest = {
  departLocation: 2,
  arrivalLocation: 3,
  tripReason: 'visit',
  departDate: '2022-03-27',
  returnDate: '2022-03-28',
  accomodationId: 9,
};
export const incorrectDate = {
  departLocation: 2,
  tripReason: 'travelling for research and studies',
  rememberMe: 'true',
  departDate: '2022-05-01',
  returnDate: '2022-04-04',
  destinations: [
    {
      accommodationId: 1,
      destinationId: 1,
    },
    {
      accommodationId: 2,
      destinationId: 2,
    },
  ],
};

export const updateRequest = {
  tripReason: 'travelling',
};

// with no manager
export const requesterLogin = {
  email: 'senderone@gmail.com',
  password: 'pass123@',
};

// with no manager
export const requeLogin = {
  email: 'sendersix@gmail.com',
  password: 'pass123@',
};
// with manager
export const managerLogin = {
  email: 'ihonore03@gmail.com',
  password: 'Password1',
};
export const managerLogins = {
  email: 'ihonore03@gmail.com',
  password: 'password',
};

export const userLogin_1 = {
  email: 'ihonore100@gmail.com',
  password: 'password',
};
export const managerToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjQ4NDYxMTk5LCJleHAiOjE2Nzk1NjUxOTl9.zo3UXkFrifwm-mdAdxmVnJNQMvon5YALLqxoZ5C9o_k';

export const requesterToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY0OTE1MTAzMSwiZXhwIjoxNjgwMjU1MDMxfQ.Z4ZzwuGM8tw-_H37gqHq3vzWF9g18W7PHCIVJ0qDCSk';
