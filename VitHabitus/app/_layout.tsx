import React from 'react';
import { Stack } from "expo-router";
import { Redirect } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Redirect href="/login" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
