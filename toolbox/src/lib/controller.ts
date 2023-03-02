import { addDoc, collection, deleteDoc, doc, DocumentData, getDoc, getDocs, getFirestore, Query, query, updateDoc, where } from "firebase/firestore";
import { app, storage } from "./firebase";
import { Ad, NewUser, UpdateAd, User } from "../types/types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const firestore = getFirestore(app);


// CRUD FUNCTIONS

// CREATE
// CREATE A NEW USER
export const addUser = async (userData: NewUser) => {
  const newUser = await addDoc(usersCollection, { ...userData });
  console.log(`New user created${newUser.path}`)
};

// CREATE A NEW ADD
export const addAd = async (adData: any) => {
  const newAd = await addDoc(collection(firestore, `ads`), { ...adData });
  // add string adId to user's myAds array
  const userDoc = doc(firestore, `users/${adData.userid}`);
  const user = await getDoc(userDoc);
  if (user.exists()) {
    const userData = user.data();
    const myAds = userData.myAds || []; // use default empty array if myAds is undefined
    myAds.push(newAd.id);
    await updateDoc(userDoc, { myAds });
  } else {
    console.log("No such user!");
  }
  console.log(`New ad created${newAd.path}`)
};


// READ
export const usersCollection = collection(firestore, "users"); // Get all users
export const adsCollection = collection(firestore, "ads"); // Get all ads



// Query for filtering ads by category, price (min, max), location (zip) and search term
export const AdsQuery = async (
  search: string | undefined = undefined,
  category: string | undefined = undefined,
  minPrice: number | undefined = undefined,
  maxPrice: number | undefined = undefined,
) => {
  let qTitle: Query<DocumentData> = adsCollection;
  let qPrice: Query<DocumentData> = adsCollection;
  let qCategory: Query<DocumentData> = adsCollection;
  let qDescription: Query<DocumentData> = adsCollection;

  if (search) {
    qTitle = query(qTitle, where("title", ">=", search));
    qTitle = query(qTitle, where("title", "<=", search + "\uf8ff"));
    qDescription = query(qDescription, where("description", ">=", search));
    qDescription = query(qDescription, where("description", "<=", search + "\uf8ff"));
  }

  minPrice = Number(minPrice)
  maxPrice = Number(maxPrice)
  if (minPrice) {
    qPrice = query(qPrice, where("price", ">=", minPrice));
  }
  if (maxPrice) {
    qPrice = query(qPrice, where("price", "<=", maxPrice));
  }

  if (category) {
    qTitle = query(qTitle, where("category", "==", category));
    qPrice = query(qPrice, where("category", "==", category));
    qCategory = query(qCategory, where("category", "==", category));
    qDescription = query(qDescription, where("category", "==", category));
  }

  const [titleSnapshot, descriptionSnapshot, priceSnapshot, categorySnapshot] = await Promise.all([
    getDocs(qTitle),
    getDocs(qDescription),
    getDocs(qPrice),
    getDocs(qCategory),
  ]);

  const titleAds: Ad[] = [];
  titleSnapshot.forEach((doc) => {
    titleAds.push({
      id: doc.id,
      userid: doc.data().userid,
      title: doc.data().title,
      description: doc.data().description,
      category: doc.data().category,
      price: doc.data().price,
      address: doc.data().address,
      zip: doc.data().zip,
      city: doc.data().city,
      pictures: doc.data().pictures,
    });
  });

  const descriptionAds: Ad[] = [];
  descriptionSnapshot.forEach((doc) => {
    descriptionAds.push({
      id: doc.id,
      userid: doc.data().userid,
      title: doc.data().title,
      description: doc.data().description,
      category: doc.data().category,
      price: doc.data().price,
      address: doc.data().address,
      zip: doc.data().zip,
      city: doc.data().city,
      pictures: doc.data().pictures,
    });
  });

  const priceAds: Ad[] = [];
  priceSnapshot.forEach((doc) => {
    priceAds.push({
      id: doc.id,
      userid: doc.data().userid,
      title: doc.data().title,
      description: doc.data().description,
      category: doc.data().category,
      price: doc.data().price,
      address: doc.data().address,
      zip: doc.data().zip,
      city: doc.data().city,
      pictures: doc.data().pictures,
    });
  });

  const categoryAds: Ad[] = [];
  categorySnapshot.forEach((doc) => {
    categoryAds.push({
      id: doc.id,
      userid: doc.data().userid,
      title: doc.data().title,
      description: doc.data().description,
      category: doc.data().category,
      price: doc.data().price,
      address: doc.data().address,
      zip: doc.data().zip,
      city: doc.data().city,
      pictures: doc.data().pictures,
    });
  });


  let ads = categoryAds.filter((ad) =>
    priceAds.find((priceAd) => priceAd.id === ad.id)
  );
  ads = ads.filter((ad) => 
    titleAds.find((titleAd) => titleAd.id === ad.id) || descriptionAds.find((descriptionAd) => descriptionAd.id === ad.id)
  );

  return ads;
};





// GET SPECIFIC USER
export const getUser = async (id: string) => {
  const document = doc(firestore, `users/${id}`);
  const user = await getDoc(document);
  console.log(`getUser: User with ID: ${id}`);
  return user;
};

// Get ad when clicking on ad
export const getAd = async (adId: string) => {
  const document = doc(firestore, `ads/${adId}`);
  try {
    const ad = await getDoc(document);
    if (ad.exists()) {
      if (ad.data().userid) {
        sessionStorage.setItem("userIDFromAd", ad.data().userid);
      } else {
        console.log("No user ID");
      }
      return ad;
    } else {
      throw new Error(`Ad with ID ${adId} does not exist`);
    }
  } catch (error) {
    console.error(`Error getting ad with ID ${adId}: ${error}`);
    throw error;
  }
};

// Get all ads from a specific user
export const getUserAds = async (id: string) => {
  const user = await getUser(id);
  const userAds: Ad[] = [];
  if (user.exists() && user.data().myAds) {
    const myAds = user.data().myAds;
    const adPromises = myAds.map(async (adId: string) => {
      const ad = await getAd(adId);
      if (ad.exists()) {
        return {
          id: ad.id,
          userid: ad.data().userid,
          title: ad.data().title,
          description: ad.data().description,
          category: ad.data().category,
          price: ad.data().price,
          address: ad.data().address,
          zip: ad.data().zip,
          city: ad.data().city,
          pictures: ad.data().pictures,
        };
      }
      return null;
    });
    const adResults = await Promise.all(adPromises);
    userAds.push(...adResults.filter((ad) => ad !== null));
  }
  return userAds;
};





// UPDATE 
// UPDATE A USER
export const updateUser = async (id: string, userData: User) => {
  const document = doc(firestore, `users/${id}`);
  await updateDoc(document, { ...userData });
  console.log(`Updated user with ID: ${id}`);
};


// UPDATE A ADD
export const updateAd = async (adId: string, adData: UpdateAd) => {
  const document = doc(firestore, `ads/${adId}`);
  await updateDoc(document, { ...adData });
  console.log(`Updated ad with ID: ${adId}`);
};




// Delete user's ads collection
// Delete user's ads collection
export const deleteUserAdsCollection = async (id: string) => {
  const userRef = doc(firestore, `users/${id}`);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists() && userSnap.data()?.myAds) {
    const myAds = userSnap.data().myAds;
    await Promise.all(myAds.map(async (adId: string) => {
      await deleteAd(adId);
    }));
    console.log(`Deleted ads with userId: ${id}`);
  }
};

// Delete user
export const deleteUser = async (id: string) => {
  try {
    await deleteUserAdsCollection(id);
    const userRef = doc(firestore, `users/${id}`);
    await deleteDoc(userRef);
    console.log(`Deleted user with ID: ${id}`);
  } catch (error) {
    console.error(`Error deleting user with ID: ${id}`, error);
  }
};

// DELETE AN AD
export const deleteAd = async (adId: string) => {
  try {
    const adRef = doc(firestore, `ads/${adId}`);
    await deleteDoc(adRef);
    console.log(`Deleted ad with ID: ${adId}`);
  } catch (error) {
    console.error(`Error deleting ad with ID: ${adId}`, error);
  }
};




// HELP FUNCTIONS
export function addToSessionStorage(username: string) { // Brukes i loginpage og registerpage
  sessionStorage.setItem("username", username);
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

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    const response = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(response.ref);
    return url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}


export const uploadImages = async (files: FileList): Promise<string[]> => {
  try {
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const url = await uploadImage(files[i]);
      urls.push(url);
    }
    return urls;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
}


// HELP FUNCTIONS FOR SAVED ADS

// check if ad is owned by user
export async function isOwned(userId: string, adId: string) {
  const userRef = doc(firestore, `users/${userId}`);
  const userSnap = await getDoc(userRef);
  const myAds = userSnap.data()?.myAds || [];
  return myAds.includes(adId);
}

// boolean function: check if ad is saved by user
export async function isSaved(userId: string, adId: string) {
  const userRef = doc(firestore, `users/${userId}`);
  const userSnap = await getDoc(userRef);
  const savedAds = userSnap.data()?.savedAds || [];
  return savedAds.includes(adId);
}

// remove ad from savedAds collection in user document
export async function removeAdFromUser(userId: string, adId: string) {
  const userRef = doc(firestore, `users/${userId}`);
  const userSnap = await getDoc(userRef);
  const savedAds = userSnap.data()?.savedAds || [];
  if (savedAds.includes(adId)) {
    const index = savedAds.indexOf(adId);
    savedAds.splice(index, 1);
    await updateDoc(userRef, { savedAds });
  }
}


// save ad to savedAds collection in user document
export async function saveAdToUser(userId: string, adId: string) {
  const userRef = doc(firestore, `users/${userId}`);
  const userSnap = await getDoc(userRef);
  const savedAds = userSnap.data()?.savedAds || [];
  if (!savedAds.includes(adId)) {
    savedAds.push(adId);
    await updateDoc(userRef, { savedAds });
  }
}

// get all saved ads for user
// Get all ads from a specific user
export const getSavedAdsFromUser = async (id: string) => {
  const user = await getUser(id);
  const userAds: Ad[] = [];

  if (user.exists() && user.data().savedAds) {
    const savedAds = user.data().savedAds;
    const adPromises = savedAds.map(async (adId: string) => {
      const ad = await getAd(adId);
      if (ad.exists()) {
        return {
          id: ad.id,
          userid: ad.data().userid,
          title: ad.data().title,
          description: ad.data().description,
          category: ad.data().category,
          price: ad.data().price,
          address: ad.data().address,
          zip: ad.data().zip,
          city: ad.data().city,
          pictures: ad.data().pictures,
        };
      }
      return null;
    });
    const adResults = await Promise.all(adPromises);
    userAds.push(...adResults.filter((ad) => ad !== null));
  }

  return userAds;
};

