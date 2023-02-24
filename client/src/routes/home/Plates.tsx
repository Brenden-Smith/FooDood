import { createRef, FC, LegacyRef, useEffect, useCallback } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  FlatList
} from "react-native";
import Swiper from "react-native-deck-swiper";
import data from "../../assets/data/theoutpost";
import { Transition } from "react-native-reanimated";
import {
	getDocs,
	query,
	collection,
	getFirestore,
	where,
	DocumentData,
  addDoc
} from "firebase/firestore";
// import "../services/firebase"
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { QueryKey } from "@/constants/QueryKey";
import { useLikes } from "@/hooks";


const { width } = Dimensions.get("window");

const stackSize = 4;
const colors = {
  red: "#d90404",
  blue: "#0063e6",
  gray: "#777777",
  white: "#ffffff",
  black: "#000000",
  green: "#aff7a8",
};
const ANIMATION_DURATION = 200;

const transition = (
  <Transition.Sequence>
    <Transition.Out
      type="slide-bottom"
      durationMs={ANIMATION_DURATION}
      interpolation="easeIn"
    />
    <Transition.Together>
      <Transition.In
        type="fade"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
      />
      <Transition.In
        type="slide-bottom"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
        interpolation="easeOut"
      />
    </Transition.Together>
  </Transition.Sequence>
);

const swiperRef: LegacyRef<
  Swiper<{
    id: string;
    name: string;
    price: string;
    desc: string;
    image: string;
  }>
> = createRef();
const transitionRef = createRef();

const CardDetails = ({ index }: any) => (
  <View key={data[index].id} style={{ alignItems: "center" }}>
    <Text style={[styles.text, styles.heading]} numberOfLines={2}>
      {data[index].name}
    </Text>
    <Text style={[styles.text, styles.price]}>{data[index].price}</Text>
  </View>
);

function PreviousLikesCard() {
  const likes = useLikes();

  return (
    <View style={[styles.card, {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      padding: 20,
    }]}>
      <View className="flex flex-col space-y-5 items-center mt-5">
      <Text className="text-2xl font-bold">Previous Likes</Text>
      {/* previous likes descripton */}
        <Text className="text-md">These are some of the plates you liked in the past! Choose from the following plates to order online!</Text>
        </View>
      <View className="flex flex-row flex-wrap justify-center items-center">
        <FlatList
          // limit the number of items shown in the flatlist to 5
          data={likes.data?.docs.splice(0, 4)}
          renderItem={({ item }) => (
            <View className="flex flex-row justify-center items-center rounded bg-slate-300 m-3" style={{
              height: 150,
              width: 150,
            }}>
              {/* <Image
                source={{ uri: like.data()?.image }}
                style={{ width: 100, height: 100 }}
              /> */}
              <Text className="text-lg text-gray-900">{item.data().plateId}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ alignItems: "center" }}
          
          numColumns={2}
        />
        

        <Text className="text-md">Or swipe to the right or left to see more plates!</Text>
      </View>
      
      
    </View>
  );

}


export const PlatesScreen = function PlatesScreen(_props: any) {
  const [index, setIndex] = useState(0);
  const [numInteractions, setNumInteractions] = useState(0);
  const [showPreviousLikes, setShowPreviousLikes] = useState(false);
  const onSwiped = () => {
    setIndex((index + 1) % data.length);
    
  };

  function likePlate(card: any) {
    addDoc(collection(getFirestore(), "likes"), {
      plateId: card.id,
      customerId: getAuth().currentUser?.uid,
    });
  }
  const [showDescription, setShowDescription] = useState(false);
  const Card = ({ card }: any) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: card.image }} style={styles.cardImage} />
        <Text style={styles.heading}>{card.name}</Text>
        <Text style={styles.price}>{card.price}</Text>

        {showDescription && (
          <View style={styles.descContainer}>
            <Text style={styles.descText}>{card.name}</Text>
            <Text style={styles.descText}>{card.price}</Text>
            <Text style={styles.descText}>Description</Text>
            <Text style={styles.descText}>{card.desc}</Text>
          </View>
        )}
        {/* <LinearGradient 
                        locations={[0, 1.0]}  
                        colors= {['rgba(0,0,0,0.00)', 'rgba(0,0,0,0.80)']} 
                        style={styles.linearGradient}>
                    </LinearGradient> */}
      </View>
    );
  };

  const renderCard = useCallback((card: {
      id: string;
      name: string;
      price: string;
      desc: string;
      image: string;
    },
    index: number
  ) => showPreviousLikes ? <PreviousLikesCard /> : <Card card={card} />, [showPreviousLikes]);


  return (
    <SafeAreaView style={styles.container}      
    >
      <View style={{ flex: 0.2 }} />
      <View style={{ flex: 1, width: '100%' }}>
        <Swiper
          cards={data}
          onSwipedRight={(index) => 
            {likePlate(data[index])
              setNumInteractions(numInteractions + 1)
              if (numInteractions % 6 == 5) {
                // show the previous likes card which is the last card in the data array
                setShowPreviousLikes(true);
              }
              else {
                setShowPreviousLikes(false);
              }
            }
          }
          cardIndex={index}
          renderCard={renderCard}
          infinite
          backgroundColor={"transparent"}
          onSwiped={onSwiped}
          cardVerticalMargin={40}
          stackSize={stackSize}
          stackScale={8}
          stackSeparation={30}
          stackAnimationFriction={7}
          stackAnimationTension={40}
          disableBottomSwipe
          animateOverlayLabelsOpacity
          animateCardOpacity
          showSecondCard={showPreviousLikes ? false : true}
        ref={swiperRef}
          overlayLabels={{
            left: {
              title: "DisLike",
              style: {
                label: {
                  backgroundColor: colors.red,
                  borderColor: colors.red,
                  color: colors.white,
                  borderWidth: 1,
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 500,
                  marginLeft: -20,
                },
              },
            },
            right: {
              title: "Like",
              style: {
                label: {
                  backgroundColor: colors.blue,
                  borderColor: colors.blue,
                  color: colors.white,
                  borderWidth: 1,
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 500,
                  marginLeft: 20,
                },
              },
            },
          }}
        />
        </View>
        <View style={{flex: 1}} />
      {/* add like and dislike buttons underneath the swiper which act as manual buttons for swiping */}
      {/* container for the buttons */}
      {/* <View style={styles.bottomContainerButtons}>
        <TouchableOpacity style={styles.likeButton} onPress={() => swiperRef.current.swipeRight()}>
          <Image source={require("../../assets/icons/like.png")} style={styles.btnImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => setShowDescription(!showDescription)}
        >
          
          <Image source={require("../../assets/icons/view.png")} style={styles.btnImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dislikeButton}
          onPress={() => swiperRef.current.swipeLeft()}
        >
          
          <Image source={require("../../assets/icons/x.png")} style={styles.btnImage} />
        </TouchableOpacity>
      </View> */}

      {/* <View style={styles.bottomContainer}>
                    <Transitioning.View
                        transition={transition}
                        style={styles.bottomContainerMeta}
                    >
                        <CardDetails index={index} />
                    </Transitioning.View>
                </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e3dfde",
    flex: 1,
  },
  swiperContainer: {
    flex: 0.55,
  },
  bottomContainer: {
    flex: 0.45,
    justifyContent: "space-evenly",
  },
  bottomContainerMeta: { alignContent: "flex-end", alignItems: "center" },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    flex: 1,
    resizeMode: "cover",
  },
  card: {
    height: "80%",
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    elevation: 5,
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
    textBreakStrategy: "simple",
    alignSelf: "stretch",
    lineHeight: 50,
  },
  heading: {
    position: "absolute",
    bottom: 30,
    left: 10,
    fontSize: 28,
    lineHeight: 28,
    marginTop: 10,
    marginBottom: 10,
    color: colors.white,
    shadowRadius: 25,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
    padding: 5,
    fontWeight: "700",
    overflow: "visible",
  },
  price: {
    position: "absolute",
    bottom: 0,
    left: 10,
    color: colors.green,
    marginBottom: 10,
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "500",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
    overflow: "visible",
    padding: 5,
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: colors.white,
    backgroundColor: "transparent",
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  likeButton: {
    width: 100,
    height: 100,
    backgroundColor: colors.blue,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  likeText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "700",
  },
  dislikeButton: {
    width: 100,
    height: 100,
    backgroundColor: colors.red,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  dislikeText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "700",
  },
  bottomContainerButtons: {
    flexDirection: "row-reverse",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "transparent",
  },
  btnImage: {
    width: 40,
    height: 40,
    tintColor: colors.white,
  },
  infoButton: {
    width: 75,
    height: 75,
    backgroundColor: "#ff6a14",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  descContainer: {
    position: "absolute",
    backgroundColor: colors.white,
    color: colors.white,
    top: 0,
    width: "100%",
    height: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  descText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "500",
    padding: 30,
    bottom: 0,
  },
});

export default PlatesScreen;
