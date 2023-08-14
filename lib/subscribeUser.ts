import { gql } from "@apollo/client";
import apolloClient from "./apolloClient";

export const subscribeUser = async (
  name: string,
  email: string
): Promise<void> => {
  await apolloClient.mutate({
    mutation: gql`
      mutation MyMutation {
        insert_newsletter_subscriptions_one(
          object: {
              user_name: "${name}"
              user_email: "${email}"
          }
        ) {
          user_name
          user_email
        }
      }
    `,
  });
};
