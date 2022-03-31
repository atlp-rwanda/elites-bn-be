import EventEmitter from 'events';
import { userById } from '../services/userServices';
import { findRequestById } from '../services/tripServices';
import { sendEmailNotification } from '../helpers/sendEmail';
import makeEmailNotificationTemplate from '../template/emailNotificationTemplate';
import notificationServices from '../services/notificationServices';

class RequestEventEmitter extends EventEmitter {}
const requestEventEmitter = new RequestEventEmitter();

const notificationService = new notificationServices();

// Remove html tags from notification to save
function removeTags(body) {
  return body.replace(/(<([^>]+)>)/gi, '');
}

// Listener to the event when trip request is created
requestEventEmitter.on('request-created', async (createdTrip, req) => {
  try {
    const user = await userById(createdTrip.userId);
    const manager = await userById(createdTrip.managerId);
    const body = `Hello ${manager.names}!, <strong>${user.names}</strong> has created a new trip request with reason: <em>${createdTrip.reason}</em>`;

    // Store Notification into database
    await notificationService.createInAppNotification({
      userId: manager.id,
      body: removeTags(body),
      requestId: createdTrip.id,
    });

    if (manager.notifyByEmail) {
      const payload = {
        body,
        tripUri: `https://elites-barefoot-nomad.herokuapp.com/api/v1/trips/${createdTrip.id}`,
      };

      await sendEmailNotification(
        manager.email,
        'ihonore01@gmail.com',
        'New Trip Request - Barefoot Nomad',
        makeEmailNotificationTemplate(payload),
      );
    }
  } catch (err) {
    console.log(err);
  }
});

// Listener to the event when trip request is edited
requestEventEmitter.on('request-updated', async (updatedTrip) => {
  try {
    const user = await userById(updatedTrip.userId);
    const manager = await userById(updatedTrip.managerId);

    const body = `Hello ${manager.names}!, <strong>${user.names}</strong> has edited the trip request with reason: <em>${updatedTrip.tripReason}</em>`;

    // Store Notification into database
    await notificationService.createInAppNotification({
      userId: manager.id,
      body: removeTags(body),
      requestId: updatedTrip.id,
    });

    if (manager.notifyByEmail) {
      const payload = {
        body,
        tripUri: `https://elites-barefoot-nomad.herokuapp.com/api/v1/trips/${updatedTrip.id}`,
      };

      await sendEmailNotification(
        manager.email,
        'ihonore01@gmail.com',
        'Updated Trip Request - Barefoot Nomad',
        makeEmailNotificationTemplate(payload),
      );
    }
  } catch (err) {
    console.log(err);
  }
});

// Listener to the event when trip request is approved or rejected
requestEventEmitter.on('request-approved-or-rejected', async (updatedTrip) => {
  try {
    const user = await userById(updatedTrip.userId);
    const manager = await userById(updatedTrip.managerId);
    const { status } = updatedTrip;

    const body = `Hello ${user.names}!, Your manager <strong>${manager.names}</strong> has ${status} your trip request with reason: <em>${updatedTrip.tripReason}</em>`;

    // Store Notification into database
    await notificationService.createInAppNotification({
      userId: user.id,
      body: removeTags(body),
      requestId: updatedTrip.id,
    });
    if (user.notifyByEmail) {
      const payload = {
        body,
        tripUri: `https://elites-barefoot-nomad.herokuapp.com/api/v1/trips/${updatedTrip.id}`,
      };

      await sendEmailNotification(
        user.email,
        'ihonore01@gmail.com',
        `${status} Trip Request - Barefoot Nomad`,
        makeEmailNotificationTemplate(payload),
      );
    }
  } catch (err) {
    console.log(err);
  }
});

// Listener to the event when trip request is commented on
requestEventEmitter.on('commented-on-request', async (comment, req) => {
  try {
    const trip = await findRequestById(comment.tripId);
    const commentedUser = await userById(comment.userId);
    let emailToNotify;
    let userToNotify;
    let introductionSentence;

    // check if the comment is made by the request owner so that we notify manager
    if (comment.userId == trip.userId) {
      const manager = await userById(trip.managerId);
      userToNotify = manager.id;
      introductionSentence = `Hello ${manager.names}!, Requester <strong>${commentedUser.names}</strong>, who is under your management has commented on the trip request.`;

      if (manager.notifyByEmail) {
        emailToNotify = manager.email;
      }
    }
    // check if the comment is made by the manager so that we notify request owner
    else if (comment.userId == trip.managerId) {
      const requestOwner = await userById(trip.userId);
      userToNotify = requestOwner.id;
      introductionSentence = `Hello ${requestOwner.names}!, Your manager <strong>${commentedUser.names}</strong>, has commented on your trip request.`;

      if (requestOwner.notifyByEmail) {
        emailToNotify = requestOwner.email;
      }
    }

    const body = `${introductionSentence}<br><strong> Comment:</strong> <q>${comment.comment}</q>`;

    // Store Notification into database
    await notificationService.createInAppNotification({
      userId: userToNotify,
      body: removeTags(body),
      requestId: trip.id,
    });

    if (emailToNotify) {
      const payload = {
        body,
        tripUri: `https://elites-barefoot-nomad.herokuapp.com/api/v1/trips/${comment.tripId}`,
      };

      await sendEmailNotification(
        emailToNotify,
        'ihonore01@gmail.com',
        'New comment on Trip Request - Barefoot Nomad',
        makeEmailNotificationTemplate(payload),
      );
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = requestEventEmitter;