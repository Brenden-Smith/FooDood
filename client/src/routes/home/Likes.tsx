import { View, Text, SafeAreaView } from 'react-native';
import { TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getDocs, query, collection, getFirestore, where, DocumentData } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ScrollView } from 'react-native-gesture-handler';

export default function Likes() {
  const [likes, setLikes] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchLikes = async () => {
      const likesCollection = collection(getFirestore(), "likes");
      const userLikesQuery = query(likesCollection, where("customerId", "==", getAuth().currentUser?.uid));
      const likesSnapshot = await getDocs(userLikesQuery);
      const likesData = likesSnapshot.docs.map(doc => doc.data());
      setLikes(likesData);
    };
    fetchLikes();
  }, []);

  const profilePic = (
    <TouchableOpacity>
      <Image
        style={{ width: 60, height: 60, borderRadius: 30, marginLeft: 10, marginTop: 10 }}
        source={{ uri: 'https://picsum.photos/200/300' }} // temp photo
      />
    </TouchableOpacity>
  );

  const settingsButton = (
    <TouchableOpacity>
      <Image
        style={{ width: 40, height: 40, borderRadius: 30, marginRight: 10, marginTop: 10 }}
        source={require('../../assets/icons/settings-gear.png')}
      />
    </TouchableOpacity>
  );
//   lets create a styles object to center scrollview


  return (
    <View className='flex-1 bg-white items-center justify-center'>
      <View className='flex-2 bg-white items-center justify-center flex-row justify-between w-full'>
        {profilePic}                
        <Text className="text-4xl font-bold">Likes</Text>
        {settingsButton}
      </View>
      <ScrollView className="flex-1 rounded w-4/5 py-5 bg-slate-200 my-5">
        <Text className="text-2xl p-2">CustomerID: Plate</Text>
        <View className="grid">
            
          {likes.map((like, index) => (
            <Text key={index} className="text-xl p-2">{like.customerId}: {like.plateId}</Text>
          ))}
          
        </View>
      
      </ScrollView>
    </View>
  );
}