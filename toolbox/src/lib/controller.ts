import { addDoc, collection, collectionGroup, deleteDoc, doc, getDocs, getFirestore, query, snapshotEqual, updateDoc, where } from "firebase/firestore";
import { app } from "./firebase";
import { NewUser } from "../types/users";

const firestore = getFirestore(app);

// CRUD FUNCTIONS

// CREATE
// CREATE A NEW USER
export const addUser = async (userData: NewUser) => {
  const newUser = await addDoc(usersCollection, {...userData});
  // Create a adds collection for the new user
  const newAddsCollection = await addDoc(collection(firestore, `users/${newUser.id}/adds`), {});
  console.log(`New user created${newUser.path}`)
};

// CREATE A NEW ADD
export const addAdd = async (addData: any) => {
  const userId = sessionStorage.getItem("userId"); // Get userId from sessionStorage
  const newAdd = await addDoc(collection(firestore, `users/${userId}/adds`), {...addData});
  console.log(`New add created${newAdd.path}`)
};


// READ
// USERS COLLECTION
export const usersCollection = collection(firestore, "users");
// ADDS COLLECTION
export const addsCollection = collectionGroup(firestore, "adds");



// UPDATE 
// UPDATE A USER
export const updateUser = async (id: string, userData: NewUser) => {
  const document = doc(firestore, `users/${id}`);
  await updateDoc(document, {...userData});
  console.log(`Updated user with ID: ${id}`);
};

// UPDATE A ADD
export const updateAdd = async (addId: string, addData: any) => {
  const userId = sessionStorage.getItem("userId"); // Get userId from sessionStorage
  const document = doc(firestore, `users/${userId}/adds/${addId}`);
  await updateDoc(document, {...addData});
  console.log(`Updated add with ID: ${addId}`);
}



// DELETE
// HELP FUNCTION FOR DELETING ALL ADDS IN USERS COLLECTION
export const deleteUserAddsCollection = async (id: string) => {
    const querySnapshot = await getDocs(collection(firestore, `users/${id}/adds`));
    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
    });
};

// DELETE A USER
export const deleteUser = async (id: string) => {
    const document = doc(firestore, `users/${id}`);
    await deleteUserAddsCollection(id).then(() => {
      console.log(`Deleted adds with userId: ${id}`)});
    await deleteDoc(document).then(() => {
      console.log(`Deleted user with ID: ${id}`);
    });
  };


// DELETE A ADD
export const deleteAdd = async ( addId: string ) => { 
    const userID = sessionStorage.getItem("userID"); // Get userId from sessionStorage
    const addsDoc = doc(firestore, `users/${userID}/adds/${addId}`);
    if (addsDoc) { //TODO: Fiks denne if-setningen. Må sjekke om doc eksisterer i databasen på denne brukeren.  
      await deleteDoc(addsDoc).then(() => {
        console.log(`Deleted add with ID: ${addId} from user with ID: ${userID}`);
      });
    } else {
      console.log(`No add with ID: ${addId} found in user with ID: ${userID}`);
    }
  };
  


// HELP FUNCTIONS
export function addToSessionStorage(username: string) { // Brukes i loginpage og registerpage
  sessionStorage.setItem("username", username ); 
  console.log("Username sessionstorage set to: " + sessionStorage.getItem("username"));
  const dummy = getDocs(query(usersCollection, where("username", "==", username))).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      //console.log("User ID: ", doc.id)
      const userID = doc.id; // Itererer gjennom alle brukere i databasen og setter userID lik brukerens ID
      sessionStorage.setItem("userID", userID);
      console.log("User ID sessionstorage: " + sessionStorage.getItem("userID"));
      // printer kun hvis brukeren eksisterer fra før av, noe den skal når valideringsfunksjonen fungerer.
    });
  });
}


