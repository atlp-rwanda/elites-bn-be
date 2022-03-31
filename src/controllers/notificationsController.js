import { userById } from '../services/userServices';
import { findRequestById } from '../services/tripServices';
import { sendEmailNotification } from '../helpers/sendEmail';
import makeEmailNotificationTemplate from '../template/emailNotificationTemplate';

const EventEmitter = require('events');

class RequestEventEmitter extends EventEmitter {}

const requestEventEmitter = new RequestEventEmitter();

// Listener to the event when trip request is created
requestEventEmitter.on('request-created', async (createdTrip) => {
  try {
    const user = await userById(createdTrip.userId);
    const manager = await userById(createdTrip.managerId);

    if (manager.notifyByEmail) {
      let body = `Hello ${manager.names}!, ${user.names} has created a new trip request with reason: <em>${createdTrip.reason}</em>`;
      const payload = {
        body,
        tripUri: `http://localhost:3000/api/v1/trips/${createdTrip.id}`,
      };

      await sendEmailNotification(
        manager.email,
        'ihonore01@gmail.com',
        'New Trip Request - Barefoot Nomad',
        makeEmailNotificationTemplate(payload)
      );
    }

    console.log(
      `==== Hello ${manager.names}!, ${user.names} has created a trip that has Reason: ${createdTrip.tripReason} ===`
    );
  } catch (err) {
    console.log(err);
  }
});

// Listener to the event when trip request is edited
requestEventEmitter.on('request-updated', async (updatedTrip) => {
  try {
    const user = await userById(updatedTrip.userId);
    const manager = await userById(updatedTrip.managerId);

    if (manager.notifyByEmail) {
      let body = `Hello ${manager.names}!, <strong>${user.names}</strong> has edited the trip request with reason: <em>${updatedTrip.tripReason}</em>`;
      const payload = {
        body,
        tripUri: `http://localhost:3000/api/v1/trips/${updatedTrip.id}`,
      };

      await sendEmailNotification(
        manager.email,
        'ihonore01@gmail.com',
        'Updated Trip Request - Barefoot Nomad',
        makeEmailNotificationTemplate(payload)
      );
    }

    console.log(
      `==== Hello ${manager.names}!, ${user.names} has updated a trip that has a Reason: ${updatedTrip.tripReason} ====`
    );
  } catch (err) {
    console.log(err);
  }
});

// Listener to the event when trip request is commented on
requestEventEmitter.on('commented-on-request', async (comment) => {
  try {
    const trip = await findRequestById(comment.tripId);
    const commentedUser = await userById(comment.userId);
    let emailToNotify;
    let introductionSentence;

    //check if the comment is made by request owner
    if (comment.userId == trip.userId) {
      const manager = await userById(trip.managerId);
      if (manager.notifyByEmail) {
        emailToNotify = manager.email;
        introductionSentence = `Hello ${manager.names}!, Requester <strong>${commentedUser.names}</strong>, who is under your management has commented on the trip request.`;
      }
    }
    //check if the comment is made by the manager
    else if (comment.userId == trip.managerId) {
      const requestOwner = await userById(trip.userId);
      if (requestOwner.notifyByEmail) {
        emailToNotify = requestOwner.email;
        introductionSentence = `Hello ${requestOwner.names}!, Your manager <strong>${commentedUser.names}</strong>, has commented on your trip request.`;
      }
    }

    if (emailToNotify) {
      let body = `${introductionSentence}<br><strong> Comment:</strong> <q>${comment.comment}</q>`;
      const payload = {
        body,
        tripUri: `http://localhost:3000/api/v1/trips/${comment.tripId}`,
      };

      await sendEmailNotification(
        emailToNotify,
        'ihonore01@gmail.com',
        'New comment on Trip Request - Barefoot Nomad',
        makeEmailNotificationTemplate(payload)
      );
      console.log(
        `====== ${commentedUser.names} has commented on trip request, notification sent to ${emailToNotify}====`
      );
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = requestEventEmitter;
