import _ from 'lodash';
import R from 'ramda';

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

const multiplyFromLodash = _.curry((x: number, y: number, z: number) => x * y * z);

console.log(
  multiplyFromLodash (5)(5)(5)
);

const multiplyFromRamda = R.curry((x: number, y: number, z: number) => x * y * z);

console.log(
  multiplyFromRamda(5)(6)(7)
);
