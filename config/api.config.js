import { collection, query, where, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from "./firebase";

/* *** SELECT *** */

const getDataAll = async o => {
  const query = await getDocs(collection(db, o.collection));
  const retData = {query: query, data: []};

  query.forEach(doc => { retData["data"].push({id: doc.id, ...doc.data()}); });

  return retData;
}

const getDataByDoc = async ({ collectionName, ID, date }) => {
  try {
    const q = query(
      collection(db, collectionName),
      where("ID", "==", ID),
      where("date", "==", date)
    );
    const querySnapshot = await getDocs(q);
    const results = [];
    
    querySnapshot.forEach((doc) => {
      results.push(doc.data());
    });

    return results; // 조건에 맞는 모든 문서의 데이터를 배열로 반환
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

const getDataByMonth = async ({ collectionName, ID, year, month }) => {
  try {
     // 지정한 년도와 월을 사용하여 해당 월의 시작일과 종료일 Timestamp 생성
     const startDate = new Date(Number(year), Number(month) - 1, 1); // 해당 월의 1일
     const endDate = new Date(Number(year), Number(month), 1); // 다음 월의 1일

    // Firestore 쿼리: ID와 월(YYYY-MM)을 기준으로 데이터 필터링
    const q = query(
      collection(db, collectionName),
      where("ID", "==", ID),
      where("realTime", ">=", Timestamp.fromDate(startDate)),  // 해당 월의 1일부터
      where("realTime", "<", Timestamp.fromDate(endDate))  // 해당 월의 다음달 1일 전까지
    );

    const querySnapshot = await getDocs(q);
    const results = [];

    querySnapshot.forEach((doc) => {
      results.push(doc.data());
    });

    return results; // 해당 월에 해당하는 모든 문서의 데이터를 배열로 반환
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};
/*
const getDataByDoc = async o => {
  const docRef = doc(db, o.collection, o.doc);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? docSnap.data() : "No such document";
}
*/

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

const updateDatabyDoc = async ({collectionName,searchID, searchdate, searchcategory, searchamount, searchcontent, ID, date, category, amount, content}) => {
  try {
    const q = query( //기존 데이터로 검색
      collection(db, collectionName),
      where("ID","==",searchID),
      where("date","==",searchdate),
      where("amount","==",searchamount),
      where("category","==",searchcategory),
      where("content","==",searchcontent),
    )
    
    const querySnapshot = await getDocs(q);
    if(!querySnapshot.empty){ //새 데이터로 업데이트
      querySnapshot.forEach(async (docSnap)=>{
        const docRef = doc(db, collectionName, docSnap.id);
        const updateData = {
          ID,
          date,
          category,
          amount,
          content
        };
        await updateDoc(docRef,updateData);
        console.log("Document successfully updated!");
      });
    }
    else if (querySnapshot.empty) {
      console.log('No matching documents found.');
    }
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

const deleteDatabyDoc = async ({collectionName, ID, date, category, amount, content}) => {
  try {
    const q = query(
      collection(db, collectionName),
      where("ID","==",ID),
      where("date","==",date),
      where("amount","==",amount),
      where("category","==",category),
      where("content","==",content),
    )
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docSnap)=>{
      const docRef = doc(db, collectionName, docSnap.id);
      await deleteDoc(docRef);
    });
    if (querySnapshot.empty) {
      console.log('No matching documents found.');
    }

    console.log("Document successfully deleted!");
  } catch (e) { console.error("Error deleting document: ", e); }
}

global.callFirestore = {
  getDataAll,
  getDataByDoc,
  getDataByMonth,
  getData,

  addData,
  setData,

  updateData,
  updateDatabyDoc,

  deleteData,
  deleteDatabyDoc,
};