// import { Text, TouchableOpacity, View, SafeAreaView, FlatList } from "react-native";
// import { memo, useCallback, useEffect, useState } from "react";
// import {
//   collection,
//   DocumentData,
//   getFirestore,
//   where,
//   query,
//   QueryDocumentSnapshot,
//   deleteDoc,
//   getDocs,
//   doc,
//   DocumentReference,
//   onSnapshot,
// } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { useFirestoreQuery } from "@react-query-firebase/firestore";
// import { QueryKey } from "@/constants";

// export default function Likes() {
//   const [likedPlates, setLikedPlates] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
//   const likesQuery = query(
//     collection(getFirestore(), "likes"),
//     where("customerId", "==", getAuth().currentUser?.uid)
//   );

//   useEffect(() => {
//     const unsubscribe = onSnapshot(likesQuery, (snapshot) => {
//       const newLikedPlates: QueryDocumentSnapshot<DocumentData>[] = [];
//       snapshot.docs.forEach((doc) => {
//         newLikedPlates.push(doc);
//       });
//       setLikedPlates(newLikedPlates);
//     });

//     return unsubscribe;
//   }, []);

//   const removeLikedPlate = useCallback(async (plateId: any) => {
//     const likedPlateQuery = query(
//       collection(getFirestore(), "likes"),
//       where("customerId", "==", getAuth().currentUser?.uid),
//       where("plateId", "==", plateId)
//     );
//     const likedPlateDocs = await getDocs(likedPlateQuery);
//     likedPlateDocs.forEach(async (doc: any) => {
//       await deleteDoc(doc.ref);
//     });
//   }, []);

//   const renderItem = useCallback(
//     ({ item }: { item: QueryDocumentSnapshot<DocumentData> }) => (
//       <ListItem item={item} removeLikedPlate={removeLikedPlate} />
//     ),
//     [removeLikedPlate]
//   );

//   return (
//     <SafeAreaView className="flex-1 bg-white justify-center items-center">
//       <FlatList
//         ListHeaderComponent={
//           <Text className="text-2xl p-2">CustomerID: Plate</Text>
//         }
//         data={likedPlates}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         className="rounded w-4/5 py-5 bg-slate-200 my-5"
//       />
//     </SafeAreaView>
//   );
// }

// const ListItem = memo(
//   ({
//     item,
//     removeLikedPlate,
//   }: {
//     item: QueryDocumentSnapshot<DocumentData>;
//     removeLikedPlate: Function;
//   }) => {
//     return (
//       <View style={{ flexDirection: "row", alignItems: "center" }}>
//         <Text className="text-xl p-2">
//           {item.data().customerId}: {item.data().plateId}
//         </Text>
//         <TouchableOpacity
//           onPress={() => removeLikedPlate(item.data().plateId)}
//         >
//           <Text style={{ color: "red", fontSize: 10 }}>remove</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// );



import { Text, TouchableOpacity, View, SafeAreaView, FlatList } from "react-native";
import { memo, useCallback, useEffect, useState } from "react";
import {
  collection,
  DocumentData,
  getFirestore,
  where,
  query,
  QueryDocumentSnapshot,
  deleteDoc,
  getDocs,
  doc,
  DocumentReference,
  onSnapshot,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { QueryKey } from "@/constants";

export default function Likes() {
  const [likedPlates, setLikedPlates] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const likesQuery = query(
    collection(getFirestore(), "likes"),
    where("customerId", "==", getAuth().currentUser?.uid)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(likesQuery, (snapshot) => {
      const newLikedPlates: QueryDocumentSnapshot<DocumentData>[] = [];
      snapshot.docs.forEach((doc) => {
        newLikedPlates.push(doc);
      });
      setLikedPlates(newLikedPlates);
    });

    return unsubscribe;
  }, []);

  const removeLikedPlate = useCallback(async (plateId: any) => {
    const likedPlateQuery = query(
      collection(getFirestore(), "likes"),
      where("customerId", "==", getAuth().currentUser?.uid),
      where("plateId", "==", plateId)
    );
    const likedPlateDocs = await getDocs(likedPlateQuery);
    likedPlateDocs.forEach(async (doc: any) => {
      await deleteDoc(doc.ref);
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: QueryDocumentSnapshot<DocumentData> }) => (
      <ListItem item={item} removeLikedPlate={removeLikedPlate} />
    ),
    [removeLikedPlate]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center"}}>
      <View style={{ width: "85%", backgroundColor: "lightgrey", borderRadius: 10, padding: 10, marginTop: 30 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, marginTop: 10 }}>CustomerID: Plate</Text>
        <FlatList
          data={likedPlates}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}

const ListItem = memo(
  ({
    item,
    removeLikedPlate,
  }: {
    item: QueryDocumentSnapshot<DocumentData>;
    removeLikedPlate: Function;
  }) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <Text style={{ fontSize: 18 }}>
          {item.data().customerId}: {item.data().plateId}
        </Text>
        <TouchableOpacity
          onPress={() => removeLikedPlate(item.data().plateId)}
          style={{ backgroundColor: "red", padding: 5, borderRadius: 5 }}
        >
          <Text style={{ color: "white", fontSize: 12 }}>remove</Text>
        </TouchableOpacity>
      </View>
    );
  }
);