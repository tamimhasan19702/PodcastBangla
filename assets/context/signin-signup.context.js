/** @format */

import React, { createContext } from "react";

export const SignInSignUpContext = createContext({});

export const SignInSignUpProvider = ({ children }) => {
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      const errorMessage =
        err.errors?.[0]?.message || "Something went wrong. Please try again.";
      Alert.alert("Error", errorMessage);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err) {
      const errorMessage =
        err.errors?.[0]?.message || "Something went wrong. Please try again.";
      Alert.alert("Error", errorMessage);
      console.error(JSON.stringify(err.errors, null, 2));
    } finally {
      setLoading(false);
    }
  };
  return (
    <SignInSignUpContext.Provider
      value={{
        emailAddress,
        setEmailAddress,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        pendingVerification,
        setPendingVerification,
        code,
        setCode,
        loading,
        setLoading,
        onSignUpPress,
        onPressVerify,
      }}>
      {children}
    </SignInSignUpContext.Provider>
  );
};
