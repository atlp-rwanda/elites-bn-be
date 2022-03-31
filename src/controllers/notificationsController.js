import locationServices from '../services/locationServices';
import { userById } from '../services/userServices';
import { sendEmailNotification } from '../helpers/sendEmail';
import makeEmailNotificationTemplate from '../template/emailNotificationTemplate';

const locationService = new locationServices();

const EventEmitter = require('events');

class RequestEventEmitter extends EventEmitter {}

const requestEventEmitter = new RequestEventEmitter();

requestEventEmitter.on('request-created', async (createdTrip) => {
  const user = await userById(createdTrip.userId);
  const departLocation = await locationService.getSingleLocation(
    createdTrip.departLocation
  );
  const arrivalLocation = await locationService.getSingleLocation(
    createdTrip.arrivalLocation
  );
  const manager = await userById(createdTrip.managerId);

  if (manager.notifyByEmail) {
    const payload = {
      managerNames: manager.names,
      requesterNames: user.names,
      from: {
        location: departLocation.locationName,
        country: departLocation.country,
      },
      to: {
        location: arrivalLocation.locationName,
        country: arrivalLocation.country,
      },
      type: 'created',
      tripReason: createdTrip.tripReason,
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
    `%cHello ${manager.names}!, ${user.names} has created a trip from ${departLocation.locationName},${departLocation.country} to ${arrivalLocation.locationName},${arrivalLocation.country} for ${createdTrip.tripReason}`,
    'background-color:green;color:white'
  );
});

requestEventEmitter.on('request-updated', async (updatedTrip) => {
  const user = await userById(updatedTrip.userId);
  const departLocation = await locationService.getSingleLocation(
    updatedTrip.departLocation
  );
  const arrivalLocation = await locationService.getSingleLocation(
    updatedTrip.arrivalLocation
  );
  const manager = await userById(updatedTrip.managerId);

  if (manager.notifyByEmail) {
    const payload = {
      managerNames: manager.names,
      requesterNames: user.names,
      from: {
        location: departLocation.locationName,
        country: departLocation.country,
      },
      to: {
        location: arrivalLocation.locationName,
        country: arrivalLocation.country,
      },
      type: 'updated',
      tripReason: updatedTrip.tripReason,
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
    `%cHello ${manager.names}!, ${user.names} has updated a trip from ${departLocation.locationName},${departLocation.country} to ${arrivalLocation.locationName},${arrivalLocation.country} for ${createdTrip.tripReason}`,
    'background-color:green;color:white'
  );
});

module.exports = requestEventEmitter;
