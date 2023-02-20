import { addDoc, collection, collectionGroup, deleteDoc, doc, DocumentData, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { app, storage } from "./firebase";
import { Ad, NewUser } from "../types/types";
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
  const newAd = await addDoc(collection(firestore, `adsCol`), {...adData});
  console.log(`New ad created${newAd.path}`)
};


// READ
export const usersCollection = collection(firestore, "users"); // USERS COLLECTION
export const adsCollection = collection(firestore, "adsCol"); // ADDS COLLECTION


// GET SPECIFIC USER
export const getUser = async (id: string) => {
  const document = doc(firestore, `users/${id}`);
  const user = await getDoc(document);
  console.log(`getUser: User with ID: ${id}`);
  return user;
};

// Get ad when clicking on ad
export const getAd = async (adId: string) => {
  const document = doc(firestore, `adsCol/${adId}`);
  const ad = await getDoc(document).then((ad) => {
  if (ad.exists()) {
    ad.data().userid !== undefined ? sessionStorage.setItem("userIDFromAd", ad.data().userid) : console.log("No user ID");
    return ad;
  }
  return ad;
  });
  return ad;
};

// Get all ads from a specific user
export const getUserAds = async (id: string) => {
  const querySnapshot = await getDocs(collection(firestore, `adsCol`));

  const userAds: DocumentData[] = [];
  const userAds2: Ad[] = [];
  const documentID: string[] = [];

  querySnapshot.forEach((doc) => {
    if (doc.data().userid === id) {
      // push id for doc
      documentID.push(doc.id);
      userAds.push(doc.data());
    }
  });

  userAds.forEach((ad, index) => {
    userAds2.push({
      id: documentID[index],
      userid: ad.userid,
      title: ad.title,
      description: ad.description,
      category: ad.category,
      price: ad.price,
      rental: ad.rental,
      address: ad.address,
      zip: ad.zip,
      city: ad.city,
      pictures: ad.pictures,
    });
  });
  return userAds2;
};








// UPDATE 
// UPDATE A USER


// UPDATE A ADD




// DELETE
// HELP FUNCTION FOR DELETING ALL ADS IN USERS COLLECTION
export const deleteUserAdsCollection = async (id: string) => {
  const querySnapshot = await getDocs(collection(firestore, `adsCol`));
  querySnapshot.forEach((doc) => {
      if (doc.data().userId === id) {
        deleteDoc(doc.ref);
      }
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
    const adsDoc = doc(firestore, `adsCol/${adId}`);
    if (adsDoc) { //TODO: Fiks denne if-setningen. Må sjekke om doc eksisterer i databasen på denne brukeren.
      await deleteDoc(adsDoc).then(() => {
        console.log(`Deleted ad with ID: ${adId}`);
      });
    } else {
      console.log(`No ad with ID: ${adId} found`);
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
  return urls;
}

