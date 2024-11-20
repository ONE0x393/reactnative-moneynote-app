import { collection, query, where, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from "./firebase";

/* *** SELECT *** */

const getDataAll = async o => {
  const query = await getDocs(collection(db, o.collection));
  const retData = {query: query, data: []};

  query.forEach(doc => { retData["data"].push({id: doc.id, ...doc.data()}); });

  return retData;
}

const getUserInfoByUID = async ({ UID }) => {
  try {
    const q = query(
      collection(db, "users"),
      where("uid", "==", UID)
    );

    const querySnapshot = await getDocs(q);
    const results = [];

    querySnapshot.forEach((doc) => { results.push(doc.data()); });

    return results;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

const getDataByUID = async ({ collectionName, UID}) => {
  try {
    const q = query(
      collection(db, collectionName),
      where("uid", "==", UID)//조건: UID
    );

    const querySnapshot = await getDocs(q); //조건으로 필터링된 데이터들
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

const getUserNameByUID = async (uid) => {
  try {
    const q = query(
      collection(db, 'users'),  // users 컬렉션에서
      where('uid', '==', uid)   // uid가 일치하는 문서를 조회합니다.
    );

    const querySnapshot = await getDocs(q); // 조건으로 필터링된 데이터들
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data().name; // 첫 번째 문서의 이름을 반환
    } else {
      console.error('해당 UID로 사용자 정보를 찾을 수 없습니다.');
      return '알 수 없는 사용자';
    }
  } catch (error) {
    console.error('사용자 이름 조회 중 오류 발생:', error);
    return '오류 발생';
  }
};

const getDataByDoc = async ({ collectionName, UID, date }) => {
  try {
    const q = query(
      collection(db, collectionName),
      where("uid", "==", UID),
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

const getDataByMonth = async ({ collectionName, UID, year, month }) => { //특정 년도와 월을 입력해 해당 시간대의 데이터들을 리턴
  try {
     // 지정한 년도와 월을 사용하여 해당 월의 시작일과 종료일 Timestamp 생성
     const startDate = new Date(Number(year), Number(month) - 1, 1); // 해당 월의 1일
     const endDate = new Date(Number(year), Number(month), 1); // 다음 월의 1일

    // Firestore 쿼리: ID와 월(YYYY-MM)을 기준으로 데이터 필터링
    const q = query(
      collection(db, collectionName),
      where("uid", "==", UID),
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

const updateDatabyDoc = async ({collectionName,searchUID, searchdate, searchcategory, searchamount, searchcontent, UID, date, category, amount, content}) => {
  try {
    const q = query( //기존 데이터로 검색
      collection(db, collectionName),
      where("uid","==",searchUID),
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
          uid:UID,
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

const updateCardbymoney = async ({collectionName, UID, bank, account, amount, type}) => {
  try {
    const q = query( //기존 데이터로 검색
      collection(db, collectionName),
      where("uid","==",UID),
      where("bank","==",bank),
      where("account","==",account),
    )
    
    const querySnapshot = await getDocs(q);
    if(!querySnapshot.empty){ //새 데이터로 업데이트
      querySnapshot.forEach(async (docSnap)=>{
        const docRef = doc(db, collectionName, docSnap.id);
        const docData = docSnap.data();
        let updateData = {};
        if (type === 0) {
          //지출이면 ex_amount 필드에 amount 더하기
          updateData = {
            ex_amount: (docData.ex_amount || 0) + amount,
          };
        } else if (type === 1) {
          //수익이면 in_amount 필드에 amount 더하기
          updateData = {
            in_amount: (docData.in_amount || 0) + amount,
          };
        }

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

const deleteDatabyDoc = async ({collectionName, UID, date, category, amount, content}) => {
  try {
    //console.log(UID);
    const q = query(
      collection(db, collectionName),
      where("uid","==",UID),
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

const deleteCardbymoney = async ({ collectionName, UID, bank, account }) => {
  try {
    const q = query( // 기존 데이터로 검색
      collection(db, collectionName),
      where("uid", "==", UID),
      where("bank", "==", bank),
      where("account", "==", account),
    );
    
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) { // 문서 삭제
      querySnapshot.forEach(async (docSnap) => {
        const docRef = doc(db, collectionName, docSnap.id);
        await deleteDoc(docRef);
        console.log("Document successfully deleted!");
      });
    } else if (querySnapshot.empty) {
      console.log('No matching documents found.');
    }
  } catch (e) { console.error("Error deleting document: ", e); }
};

global.callFirestore = {
  getDataAll,
  getDataByUID,
  getUserNameByUID,
  getDataByDoc,
  getDataByMonth,
  getData,
  getUserInfoByUID,

  addData,
  setData,

  updateData,
  updateDatabyDoc,
  updateCardbymoney,

  deleteData,
  deleteDatabyDoc,
  deleteCardbymoney,
};