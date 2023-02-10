import { collection, collectionGroup, getFirestore } from "firebase/firestore";

import { app } from "./firebase";

const firestore = getFirestore(app);

//USERS COLLECTION
export const usersCollection = collection(firestore, "users");

//ADDS COLLECTION

export const addsCollection = collectionGroup(firestore, "adds");