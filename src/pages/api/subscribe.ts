import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { query as q } from 'faunadb';

import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";

interface User {
  ref: {
    id: string;
  }
  data: {
    stripe_customer_id: string;
  }
}

export default async function Subscribe(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Constant that gets the information from the user's section
    const session = await getSession({ req });

    // This constant gets the user's information from the Fauna database.
    const user = await fauna.query<User>(
      q.Get(
        q.Match(
          q.Index("user_by_email"),
          q.Casefold(String(session?.user?.email))
        )
      )
    );

    // This variable checks if the user has a stripe id
    let customerId = user.data.stripe_customer_id;

    // If the user doesn't have a stripe id, we create a new customer
    if (!customerId) {
      // Constant that creates a new customer
      const stripeCustomer = await stripe.customers.create({
        email: String(session?.user?.email),
      });
  
      // This function updates the user's information in the Fauna database
      await fauna.query(
        q.Update(
          q.Ref(q.Collection("users"), user.ref.id),
          {
            data: {
              stripe_customer_id: stripeCustomer.id,
            }
          }
        )
      )

      // This variable gets the user's stripe id
      customerId = stripeCustomer.id;
    }

    // This constant gets the user's subscription plan
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        { price : "price_1KSh2JAaoud4VUKC72exIINi", quantity: 1 },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: String(process.env.STRIPE_SUCESS_URL),
      cancel_url: String(process.env.STRIPE_CANCEL_URL),
    })

    // This constant sends the user information to the frontend
    return res.status(200).json({
      sessionId: stripeCheckoutSession.id,
    })
  } else {
    // Informs the Front-End that the method is not allowed
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method Not Allowed`);
  }
}