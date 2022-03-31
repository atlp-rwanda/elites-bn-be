export const addRequest = {
  departLocation: 1,
  destinations: [
    {
      accomodationId: 3,
      destionationId: 2,
    },
  ],
  tripReason: 'Free Tours',
  departDate: '2022-05-07',
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
  departDate: '2022-05-01',
  returnDate: '2022-04-04',
  destinations: [
    {
      accomodationId: 1,
      destionationId: 1,
    },
    {
      accomodationId: 2,
      destionationId: 2,
    },
  ],
};

export const updateRequest = {
  departLocation: 9,
  tripReason: 'travelling',
  departDate: '2022-05-01',
  returnDate: '2022-06-04',
  destinations: [
    {
      accomodationId: 1,
      destionationId: 1,
    },
    {
      accomodationId: 2,
      destionationId: 2,
    },
  ],
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

export const managerToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjQ4NDYxMTk5LCJleHAiOjE2Nzk1NjUxOTl9.zo3UXkFrifwm-mdAdxmVnJNQMvon5YALLqxoZ5C9o_k';
