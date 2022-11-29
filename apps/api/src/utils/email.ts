// TODO this library takes more than one third of the time required by hasura-auth to load
import Email from 'email-templates';
import nodemailer from 'nodemailer';
import path from 'path';

/**
 * SMTP transport.
 */
const transport = nodemailer.createTransport({
  port: 587,
  host: process.env.SMTP_HOST!,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const shouldSend = ['production', 'test_email'].some((s) => process.env.NODE_ENV === s);

/**
 * Reusable email client.
 */
export const emailClient = new Email({
  transport,
  message: { from: process.env.SMTP_FROM },
  // to support localizations, it is probably better to overwrite render function and load the localized template
  views: {
    root: path.resolve(process.cwd(), './emails'),
    options: {
      extension: 'ejs',
    },
  },
  send: shouldSend,
  preview: {
    openSimulator: false,
  },
});
