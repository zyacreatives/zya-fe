import { createAuthClient } from "better-auth/react";
import {
  inferAdditionalFields,
  usernameClient,
} from "better-auth/client/plugins";
export const auth = createAuthClient({
  baseURL: "http://localhost:4140/api/v1/auth",
  fetchOptions: {
    credentials: "include",
  },

  plugins: [
    usernameClient(),
    inferAdditionalFields({
      user: {
        role: {
          type: "string",
          required: false,
        },
        onboardingPage: {
          type: "string",
          required: false,
        },
      },
    }),
  ],
});

export const getUserDetails = async () => {
  const user = await auth.getSession();
  return user.data?.user;
};
