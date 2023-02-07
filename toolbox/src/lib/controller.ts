import { collection, getFirestore } from "firebase/firestore";

import { app } from "./firebase";

export const firestore = getFirestore(app);

//USERS COLLECTION
export const usersCollection = collection(firestore, "users");