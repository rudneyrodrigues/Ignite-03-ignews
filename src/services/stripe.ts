import Stripe from 'stripe';

export const stripe = new Stripe(
  String(process.env.STRIPE_API_KEY),
  {
    apiVersion: '2020-08-27',
    appInfo: {
      name: 'IgNews',
      version: '1.0.0',
  }
});