import 'dotenv/config';

export default {
  expo: {
    name: "VitHabitus",
    slug: "VitHabitus",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/logoapp.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      bundleIdentifier: "com.VitHabitus.app2025",
      supportsTablet: true
    },
    android: {
      package: "com.VitHabitus.app2025",
      adaptiveIcon: {
        foregroundImage: "./assets/images/android_logo.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/logo_inside.png"
    },
    plugins: [
      "expo-router",
      ["expo-splash-screen", {
        image: "./assets/images/logoapp.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      }],
      "expo-secure-store"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      apiUrl: process.env.API_URL,
      eas: {
        projectId: "21ccaa73-813d-430b-b2f9-7c26ece9c57e"
      },
      router: {
        origin: false
      }
    },
    owner: "rodrisout"
  }
};