import { signIn, useSession } from 'next-auth/react';

import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  // Getting current session information.
  const {data: session} = useSession();

  // This function redirects the user to the Stripe payments screen.
  async function handleSubscribe() {
    // Verifies if the user is logged in.
    if (!session) {
      signIn('github');
      return;
    }

    // If the user is logged in, we can proceed to the Stripe payments screen.
    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data;

      // This constant will receive all public information from Stripe.
      const stripe = await getStripeJs();

      // And redirect the user to the Stripe Checkout screen.
      await stripe?.redirectToCheckout({sessionId});
    } catch (error) {
      alert(error);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}