import { addDoc, collection, collectionGroup, deleteDoc, doc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { app } from "./firebase";
import { NewUser } from "../types/types";


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
export const addAd = async (addData: any) => {
  const userId = sessionStorage.getItem("userID"); // Get userId from sessionStorage
  const newAd = await addDoc(collection(firestore, `users/${userId}/adds`), {...addData});
  console.log(`New add created${newAd.path}`)
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
      const userID = doc.id; // Itererer gjennom alle brukere i databasen og setter userID lik brukerens ID
      sessionStorage.setItem("userID", userID);
      console.log("User ID sessionstorage: " + sessionStorage.getItem("userID"));
    });
  });
}

export function removeFromSessionStorage() { // Brukes from logoutbutton når det lages
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("userID");
  console.log("Username and userID removed from sessionstorage");
}


export async function validateUser(username: string, password: string) { // Brukes i loginpage
  let a = false;
  const dummy = await getDocs(query(usersCollection, where("username", "==", username))).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      //console.log("User ID: ", doc.id)
      const userID = doc.id; // Itererer gjennom alle brukere i databasen og setter userID lik brukerens ID
      const userPassword = doc.data().password;
      if (password === userPassword && username === doc.data().username) {
        addToSessionStorage(username);
        a = true;
        console.log("Correct password");
      }
    });
  });
  return a;
}

export async function validateUsername(username: string) { // Brukes i registerpage
  let a = false;
  const dummy = await getDocs(query(usersCollection, where("username", "==", username))).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const userID = doc.id; // Itererer gjennom alle brukere i databasen og setter userID lik brukerens ID
      if (username === doc.data().username) {
        a = true;
        console.log("Username already exists");
      }
    });
  });
  return a;
}
