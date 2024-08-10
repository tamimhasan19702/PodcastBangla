/** @format */

import * as SecureStore from "expo-secure-store";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { Slot } from "expo-router";

// Define a constant for the publishable key
const PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

// Define a constant for the root route
const ROOT_ROUTE = "/";

// Define the token cache interface
interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>;
  saveToken: (key: string, token: string) => Promise<void>;
  clearToken?: (key: string) => void;
}

// Create a token cache object
const tokenCache: TokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error("SecureStore set item error: ", error);
      throw error;
    }
  },
};

// Create a component for the initial layout
function InitialLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      console.log("User is signed in");
      router.replace(ROOT_ROUTE);
    } else {
      console.log("User is not signed in");
      router.replace(ROOT_ROUTE);
    }
  }, [isLoaded, isSignedIn]);

  return <Slot />;
}

// Create a component for the root layout
export default function RootLayout() {
  return (
    // @ts-ignore

    <ClerkProvider tokenCache={tokenCache} publishableKey={PUBLISHABLE_KEY}>
      <ClerkLoaded>
        <InitialLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
