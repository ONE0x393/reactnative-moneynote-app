import { collection, query, where, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from "./firebase";

/* *** SELECT *** */

const getDataAll = async o => {
  const query = await getDocs(collection(db, o.collection));
  const retData = {query: query, data: []};

  query.forEach(doc => { retData["data"].push({id: doc.id, ...doc.data()}); });

  return retData;
}

const getDataByDoc = async o => {
  const docRef = doc(db, o.collection, o.doc);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? docSnap.data() : "No such document";
}

const getData= async o => {
  const docRef = doc(db, o.collection, o.doc);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? docSnap.data() : "No such document";
}


/* *** CREATE *** */

const addData = async o => {
  try {
    const docRef = await addDoc(collection(db, o.collection), o.data);

    console.log("Document written with ID: ", docRef.id);
  } catch (e) { console.error("Error adding document: ", e); }
};

const setData = async o => {
  try {
    await setDoc(doc(db, o.collection, o.doc), o.data);

    console.log("Document successfully written!");
  } catch (e) { console.error("Error setting document: ", e); }
}


/* *** UPDATE *** */

const updateData = async o => {
  const docRef = doc(db, o.collection, o.doc);

  try {
    await updateDoc(docRef, o.data);

    console.log("Document successfully updated!");
  } catch (e) { console.error("Error updating document: ", e); }
}


/* *** DELETE *** */

const deleteData = async o => {
  const docRef = doc(db, o.collection, o.doc);

  try {
    await deleteDoc(docRef);

    console.log("Document successfully deleted!");
  } catch (e) { console.error("Error deleting document: ", e); }
}

global.callFirestore = {
  getDataAll,
  getDataByDoc,
  getData,

  addData,
  setData,

  updateData,

  deleteData,
};