import curry from '../curry';

const emailSetup = curry(
  (config: any, template: string, email: string) =>
    `FROM: ${config.senderEmail}\n TO: ${email}\n\n${template}`
);

export const emailServer = emailSetup({ senderEmail: 'tango@email.com' });

export const sendSetupEmailTo = emailServer('<a href="https://tango.io">click here!</a>');

export const sendNotificationTo = curry(
  (email: string, template: string) => emailServer(template)(email)
);

export const requestToJoinFrom = (userEmail: string) => `${userEmail} wants to join!`;
export const messageFrom = (userEmail: string) => `${userEmail} sent you a message!`;