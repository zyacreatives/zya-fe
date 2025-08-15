import { createAuthClient } from "better-auth/react";
import {
  inferAdditionalFields,
  usernameClient,
} from "better-auth/client/plugins";
export const auth = createAuthClient({
  baseURL: "https://api.tryzya.date/api/v1/auth",
  trustedOrigins: [
    "http://localhost:4140",
    "https://api.tryzya.date",
    "http://localhost:3000",
  ],
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
