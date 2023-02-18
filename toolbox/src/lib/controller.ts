import { addDoc, collection, collectionGroup, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { app, storage } from "./firebase";
import { NewUser } from "../types/types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";



const firestore = getFirestore(app);


// CRUD FUNCTIONS

// CREATE
// CREATE A NEW USER
export const addUser = async (userData: NewUser) => {
  const newUser = await addDoc(usersCollection, {...userData});
  console.log(`New user created${newUser.path}`)
};

// CREATE A NEW ADD
export const addAd = async (adData: any) => {
  const userId = sessionStorage.getItem("userID"); // Get userId from sessionStorage
  const newAd = await addDoc(collection(firestore, `users/${userId}/ads`), {...adData});
  console.log(`New ad created${newAd.path}`)
};


// READ
export const usersCollection = collection(firestore, "users"); // USERS COLLECTION
export const adsCollection = collectionGroup(firestore, "ads"); // ADDS COLLECTION
// GET SPECIFIC USER
export const getUser = async (id: string) => {
  const document = doc(firestore, `users/${id}`);
  const user = await getDoc(document);
  console.log(`getUser: User with ID: ${id}`);
  return user;
};

// Get ad when clicking on ad
export const getAd = async (adId: string, userID: string) => {
  const document = doc(firestore, `users/${userID}/ads/${adId}`);
  const ad = await getDoc(document);
  return ad;
};

// Get user associated with ad
export const getUserFromAdId = async (adId: string) => {
  console.log("Ad ID: " + adId)
  //Loop through all users and find the one with the adId in the ads array
  const querySnapshot = await getDocs(usersCollection).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // get ads from doc
      const adCollection = collection(firestore, `users/${doc.id}/ads`);
      getDocs(adCollection).then((querySnapshot2) => {
        for (const ads of querySnapshot2.docs) {
            if (ads.id === adId) {
            sessionStorage.setItem("userIDFromAd", doc.id);
            console.log("User ID after set backend: 2 " + doc.id);
            return doc.id;
          }
        }});
      });
  });
};

/* // Get user associated with ad
export const getUserFromAdId = async (adId: string) => {
  console.log("Ad ID: " + adId)
  //Loop through all users and find the one with the adId in the ads array
  const querySnapshot = await getDocs(usersCollection).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // get ads from doc
      const adCollection = collection(firestore, `users/${doc.id}/ads`);
      getDocs(adCollection).then((querySnapshot2) => {
        for (const doc2 of querySnapshot2.docs) {
            if (doc2.id === adId) {
            sessionStorage.setItem("userIDFromAd", doc.id);
            console.log("User ID after set backend: 2 " + doc.id);
            return doc.id;
          }
        }});
      });
  });
}; */






// UPDATE 
// UPDATE A USER
export const updateUser = async (id: string, userData: NewUser) => {
  const document = doc(firestore, `users/${id}`);
  await updateDoc(document, {...userData});
  console.log(`Updated user with ID: ${id}`);
};

// UPDATE A ADD
export const updateAd = async (adId: string, adData: any) => {
  const userId = sessionStorage.getItem("userId"); // Get userId from sessionStorage
  const document = doc(firestore, `users/${userId}/ads/${adId}`);
  await updateDoc(document, {...adData});
  console.log(`Updated ad with ID: ${adId}`);
}



// DELETE
// HELP FUNCTION FOR DELETING ALL ADS IN USERS COLLECTION
export const deleteUserAdsCollection = async (id: string) => {
    const querySnapshot = await getDocs(collection(firestore, `users/${id}/ads`));
    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
    });
};

// DELETE A USER
export const deleteUser = async (id: string) => {
    const document = doc(firestore, `users/${id}`);
    await deleteUserAdsCollection(id).then(() => {
      console.log(`Deleted ads with userId: ${id}`)});
    await deleteDoc(document).then(() => {
      console.log(`Deleted user with ID: ${id}`);
    });
  };


// DELETE A AD
export const deleteAd = async ( adId: string ) => { 
    const userID = sessionStorage.getItem("userID"); // Get userId from sessionStorage
    const adsDoc = doc(firestore, `users/${userID}/ads/${adId}`);
    if (adsDoc) { //TODO: Fiks denne if-setningen. Må sjekke om doc eksisterer i databasen på denne brukeren.  
      await deleteDoc(adsDoc).then(() => {
        console.log(`Deleted ad with ID: ${adId} from user with ID: ${userID}`);
      });
    } else {
      console.log(`No ad with ID: ${adId} found in user with ID: ${userID}`);
    }
  };
  


// HELP FUNCTIONS
export function addToSessionStorage(username: string) { // Brukes i loginpage og registerpage
  sessionStorage.setItem("username", username ); 
  console.log("Username sessionstorage set to: " + sessionStorage.getItem("username"));
  getDocs(query(usersCollection, where("username", "==", username))).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const userID = doc.id; // Itererer gjennom alle brukere i databasen og setter userID lik brukerens ID
      sessionStorage.setItem("userID", userID);
      console.log("User ID sessionstorage: " + sessionStorage.getItem("userID"));
    });
  });
}

export function removeFromSessionStorage() { // Brukes i logoutbutton
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("userID");
  console.log("Username and userID removed from sessionstorage");
}


export async function validateUser(username: string, password: string) { // Brukes i loginpage
  let a = false;
  await getDocs(query(usersCollection, where("username", "==", username))).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
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

export async function validateDuplicateUsername(username: string) { // Brukes i registerpage
  let a = false;
  await getDocs(query(usersCollection, where("username", "==", username))).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (username === doc.data().username) {
        a = true;
        console.log("Username already exists");
      }
    });
  });
  return a;
}


// upload image to firebase storage
export const uploadImage = async (file: any) => {
  console.log("file backend: " + file);
  console.log("Upload image backend")
  const storageRef = ref(storage, `images/${file.name}`);
  const response = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(response.ref);
  return url;
}

// upload several images to firebase storage
export const uploadImages = async (files: any) => {
  const urls = [];
  for (let i = 0; i < files.length; i++) {
    const url = await uploadImage(files[i]);
    urls.push(url);
  }
  console.log("urls backend " + urls);
  return urls;
}

