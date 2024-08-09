import "dotenv/config";

export default {
    expo: {
        name: "front-end",
        slug: "front-end",
        version: "1.0.0",
        userInterfaceStyle: "automatic",
        plugins: [
            [
                "expo-font",
                {
                    fonts: [
                        "./Assets/fonts/Jaro_9pt-Regular.ttf",
                        "./Assets/fonts/Jaro_24pt-Regular.ttf",
                        "./Assets/fonts/Jaro_36pt-Regular.ttf",
                        "./Assets/fonts/Jaro_60pt-Regular.ttf",
                        "./Assets/fonts/Jaro-Regular.ttf",
                    ],
                },
            ],
        ],
    },
    extra: {
        firebaseApiKey: process.env.FIREBASE_API_KEY,
        firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
        firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
        firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        firebaseAppId: process.env.FIREBASE_APP_ID,
        firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
};
