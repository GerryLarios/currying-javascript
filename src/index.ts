import {
  messageFrom,
  requestToJoinFrom,
  sendSetupEmailTo,
  sendNotificationTo,
} from "./services/emailService";

const sendNotificationToAdmin = sendNotificationTo('admin@ucol.mx');

console.log(
  sendSetupEmailTo('gchavez@ucol.mx')
);

console.log(
  sendNotificationToAdmin(
    requestToJoinFrom('gchavez@ucol.mx')
  )
);

console.log(
  sendNotificationToAdmin(
    messageFrom('gchavez@ucol.mx')
  )
);