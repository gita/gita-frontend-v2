import { mutation, resolved } from "src/gqty-client";

export const subscribeUser = async (name: string, email: string) => {
  return resolved(() =>
    mutation.insert_newsletter_subscriptions_one({
      object: {
        user_name: name,
        user_email: email,
      },
    })
  );
};
