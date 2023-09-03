import { mutation, resolved } from "gqty-client";

export const subscribeUser = async (name: string, email: string) => {
  return resolved(() => {
    const result = mutation.insert_newsletter_subscriptions_one({
      object: {
        user_name: name,
        user_email: email,
      },
    });

    return result?.id;
  });
};
