'use strict';
 
module.exports = {
 async up(queryInterface, Sequelize) {
   await queryInterface.bulkInsert('refreshTokenTables', [
     {
      refreshToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZXMiOiJHaWhvem8gSW5ub2NlbnRlIiwiZW1haWwiOiJnaWhvem85N0BnbWFpbC5jb20iLCJyb2xlSWQiOm51bGwsIm1hbmFnZXJJZCI6bnVsbCwiaXNBY3RpdmUiOm51bGwsInZlcmlmaWVkIjpudWxsLCJSb2xlLmlkIjpudWxsLCJSb2xlLm5hbWUiOm51bGwsImlhdCI6MTY0NzM1MjU5NSwiZXhwIjoxNjQ3OTU3Mzk1fQ.lqulLhC2C2GDZbalW-23LY_vfHZZRXpOtpe57XmGhRA',
       createdAt: new Date(),
       updatedAt: new Date(),
     },
   ], {});
 },
 
 
 async down(queryInterface, Sequelize) {
   await queryInterface.bulkDelete('refreshTokenTables', null, {});
 }
};
