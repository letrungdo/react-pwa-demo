import * as firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
  // Project Settings => Add Firebase to your web app
  apiKey: "AIzaSyAVR454NcaEuKgoIHenyGvCEVklNWl2BsA",
  projectId: "reactpwa-a86f7",
  messagingSenderId: "586620529130",
  appId: "1:586620529130:web:e58d5c8f3cf7f1a7a5aa93",
});
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
	// Project Settings => Cloud Messaging => Web Push certificates
  "BDozTWPrpyIcjB1iyotaJDyE1C1xzeSbjMnqHRjDJNNJcKQDVv6iPR-cZXXn-RNJK8JCrkxiSbh8l3OER8P7uuY"
);
export { messaging };