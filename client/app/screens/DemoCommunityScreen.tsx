// data.json

// [
//     {
//         "title": "Pancakes",
//         "price": "5.49",
//         "description": "Two pancakes with whipped butter\n Contains milk, soy & wheat",
//         "image": "https://lexica.art/prompt/fb701536-f182-467a-8f4e-76a38836bda4"
//     },
//     {
//         "title": "Two Egg Breakfast",
//         "price": "5.29",
//         "description": "Two eggs any style, shredded hash brown potatoes, and toast\n Contains eggs & wheat",
//         "image": "https://lexica.art/prompt/3c48a5d4-212e-4275-8d37-72602cf6905b"
//     },
//     {
//         "title": "French Toast",
//         "price": "5.49",
//         "description": "Two slices of French toast with whipped butter\n Contains milk, soy & wheat",
//         "image": "https://lexica.art/prompt/3bcb847e-8982-40a1-ae38-28f71d8042f7"
//     },
//     {
//         "title": "Two Eggs with Meat",
//         "price": "7.29",
//         "description": "Choice of smoked bacon, ham, sausage, turkey sausage, or spam, with two eggs any style, shredded hash brown potatoes, and toast\n Contains eggs & wheat",
//         "image": "https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/gncabvrs/0812161c-2841-42cc-a78a-a4b850aadc3e.JPG" 
//     },
//     {
//         "title": "Roma Bagel Sandwich",
//         "price": "5.49",
//         "description": "Over hard egg, pesto cream cheese, tomato, and balsamic glaze, on an everything bagel\n Contains eggs, wheat & milk",
//         "image": "https://lh3.googleusercontent.com/14MNWCMtncidKTr2_vgxw-5FGGDYVEBhTHyuCccKUNHJtChyAwpB8hAldGIdfp21zJIkJvrFD9PnuMQcLeACHAP9KtwJzvV0t_w=w1800-h1800-c-rj-v1-e365"
//     },
//     {
//         "title": "The B.E.T. Bagel Sandwich",
//         "price": "6.59",
//         "description": "Bacon, over hard egg, cheddar cheese, tomato, sriracha mayo and shredded hash brown potatoes, on an everything bagel\n Contains eggs, wheat & milk",
//         "image": "https://www.wenthere8this.com/wp-content/uploads/2020/12/bagel-breakfast-sandwich-6.jpg"
//     },
//     {
//         "title": "Croissant Sandwich",
//         "price": "6.79",
//         "description": "Choice of smoked bacon, ham, sausage, turkey sausage, or spam, with two eggs any style, shredded hash brown potatoes, and toast\n Contains eggs & wheat",
//         "image": "https://www.culinaryhill.com/wp-content/uploads/2021/03/Turkey-BLT-Croissant-Sandwich-Culinary-Hill-900x600-1.jpg"
//     },
//     {
//         "tite": "Sunrise Bagel Sandwich",
//         "price": "4.19",
//         "description": "Over easy egg, cheddar cheese, tomato, and sriracha mayo, on an everything bagel\n Contains eggs, wheat & milk",
//         "image": "https://lh3.googleusercontent.com/14MNWCMtncidKTr2_vgxw-5FGGDYVEBhTHyuCccKUNHJtChyAwpB8hAldGIdfp21zJIkJvrFD9PnuMQcLeACHAP9KtwJzvV0t_w=w1800-h1800-c-rj-v1-e365"
//     },
//     {
//         "title": "49er Bagel Sandwich",
//         "price": "6.19",
//         "description": "Choice of smoked bacon, ham, sausage, turkey sausage, or spam, with two eggs any style, shredded hash brown potatoes, and toast\n Contains eggs & wheat",
//         "image": "https://themom100.com/wp-content/uploads/2021/03/bagel-breakfast-sandwich-043.jpg"
//     }
// ]



import React, { FC, useRef } from "react"
import { Image, ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle, StyleSheet } from "react-native"
import { ListItem, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { spacing } from "../theme"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"
import { isRTL } from "../i18n"


const chainReactLogo = require("../../assets/images/cr-logo.png")
const reactNativeLiveLogo = require("../../assets/images/rnl-logo.png")
const reactNativeRadioLogo = require("../../assets/images/rnr-logo.png")
const reactNativeNewsletterLogo = require("../../assets/images/rnn-logo.png")

const foodData = require("../../assets/data.json")

import CardsSwipe from "react-native-cards-swipe"

export const DemoCommunityScreen: FC<DemoTabScreenProps<"DemoCommunity">> =
  function DemoCommunityScreen(_props) {
    const swiper = useRef(null);
    return (
      <Screen>
        <View style={styles.container}>
          <CardsSwipe
            ref={swiper}
            cards={foodData}
            containerStyle={styles.cardsSwipeContainer}
            cardContainerStyle={styles.cardContainer}
            loop={false}
            renderCard={(card) => (
              <View style={styles.card}>
                <Image style={styles.cardImg} source={{uri: card.src}} />
              </View>
            )}
            renderNoMoreCard={() => (
              <View style={styles.noMoreCard}>
                <Text>{'No more Cards!'}</Text>
              </View>
            )}
            renderYep={() => (
              <View style={styles.like}>
                <Text style={styles.likeLabel}>YEP</Text>
              </View>
            )}
            renderNope={() => (
              <View style={styles.nope}>
                <Text style={styles.nopeLabel}>NOPE</Text>
              </View>
            )}
          />
          <View style={styles.controlRow}>
            <TouchableOpacity
              onPress={() => {
                if (swiper.current) swiper.current.swipeLeft();
              }}
              style={[styles.button, styles.leftBtn]}
            >
              <Image
                source={require('../../assets/images/thumbs-down-solid.png')}
                style={styles.dislikeIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (swiper.current) swiper.current.swipeRight();
              }}
              style={[styles.button, styles.rightBtn]}
            >
              <Image
                source={require('../../assets/images/thumbs-up-solid.png')}
                style={styles.likeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Screen>
    )
  }


// @demo remove-file
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsSwipeContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: 600,
    zIndex: 1,
    elevation: 1,
  },
  cardContainer: {
    width: '92%',
    height: '100%',
  },
  card: {
    width: 150,
    height: 300,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.07,
    shadowRadius: 3.3,
    elevation: 6,
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
  },
  noMoreCard: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 200,
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    padding: 14,
    borderWidth: 3,
    borderRadius: 35,
  },
  rightBtn: {
    borderColor: '#00D400',
  },
  leftBtn: {
    borderColor: '#E60000',
  },
  likeIcon: {
    width: 40,
    height: 40,
    top: -3,
  },
  dislikeIcon: {
    width: 40,
    height: 40,
    top: 3,
  },
  nope: {
    borderWidth: 5,
    borderRadius: 6,
    padding: 8,
    marginRight: 30,
    marginTop: 25,
    borderColor: 'red',
    transform: [{ rotateZ: '22deg' }],
  },
  nopeLabel: {
    fontSize: 32,
    color: 'red',
    fontWeight: 'bold',
  },
  like: {
    borderWidth: 5,
    borderRadius: 6,
    padding: 8,
    marginLeft: 30,
    marginTop: 20,
    borderColor: 'lightgreen',
    transform: [{ rotateZ: '-22deg' }],
  },
  likeLabel: {
    fontSize: 32,
    color: 'lightgreen',
    fontWeight: 'bold',
  },
});