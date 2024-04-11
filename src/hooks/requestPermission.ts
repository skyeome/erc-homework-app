import { getMessaging, getToken } from "firebase/messaging";

const messaging = getMessaging();

async function requestPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const currentToken = await getToken(messaging, {
        vapidKey: process.env.VAPID_KEY,
      });
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        console.log(currentToken);
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }
}

export default requestPermission;
