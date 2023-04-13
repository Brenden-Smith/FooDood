import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { firestore } from "firebase-admin";
import axios from "axios";

// Initialize Firebase Admin SDK
initializeApp();

type Business = {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: string;
  categories: Array<{ alias: string; title: string }>;
  rating: string;
  coordinates: { latitude: string; longitude: string };
  transactions: Array<string>;
  price?: string;
  location: {
    address1?: string;
    address2?: string;
    address3?: string;
    city?: string;
    zip_code?: string;
    country?: string;
    state?: string;
    display_address: Array<string>;
    cross_streets?: string;
  };
  phone: string;
  display_phone: string;
  distance?: string;
  hours?: Array<{
    open: Array<{
      is_overnight: boolean;
      start: string;
      end: string;
      day: number;
    }>;
    hour_type: string;
    is_open_now: boolean;
  }>;
  attributes?: Array<any>;
};

type RawPlate = {
  name: string;
  description: string;
  price: string;
  image_url: string;
};

export const getRecommendations = functions.https.onCall(
  async (data, context) => {
    // Get parameters
    const { radius, longitude, latitude, lucky } = data;

    // Get calling user
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "The function must be called while authenticated."
      );
    }

    // Get user's tags
    const categories = lucky
      ? await firestore()
          .collection("likes")
          .where("customerId", "==", context.auth?.uid)
          .get()
          .then((snapshot) =>
            snapshot.docs
              .map((doc) => doc.data().tags)
              .flat()
              .reduce((acc, tag) => {
                if (!acc[tag]) {
                  acc[tag] = 1;
                } else {
                  acc[tag]++;
                }
                return acc;
              }, {} as Record<string, number>)
              .sort((a: any, b: any) => b[1] - a[1])
              .slice(0, 10)
          )
      : await firestore()
          .collection("users")
          .doc(context.auth?.uid)
          .get()
          .then((doc) => doc.data()?.tags.join(","));

    // Get businesses from Yelp API
    const businesses: Business[] = await axios
      .get("https://api.yelp.com/v3/businesses/search", {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
        params: {
          radius,
          longitude,
          latitude,
          categories,
          limit: 20,
        },
      })
      .then((response) => response.data.businesses)
      .catch((error) => {
        functions.logger.error(error);
        return [];
      });

    // Populate Firestore with businesses and plates
    await Promise.all(
      businesses.map(async (business) => {
        // Check if business is in Firestore
        const businessDoc = await firestore()
          .collection("businesses")
          .doc(business.id)
          .get();

        // If business is in Firestore and is not expired, no action needed
        if (
          businessDoc.exists &&
          Date.now() - businessDoc.data()?.timestamp.toDate().getTime() <=
            businessDoc.data()?.ttl
        ) {
          functions.logger.info(
            `${business.id} (${business.name}) is in Firestore`
          );
          return;
        }

        // If business is in Firestore but is expired, delete plates from Firestore
        functions.logger.info("Getting plates from Yelp");
        if (businessDoc.exists) {
          await firestore()
            .collection("plates")
            .where("businessId", "==", business.id)
            .get()
            .then((querySnapshot) =>
              Promise.all(querySnapshot.docs.map((doc) => doc.ref.delete()))
            );
        }

        // Call scrapeMenu using gcloud CLI
        const plateData: RawPlate[] = await axios
          .get(
            "https://us-central1-foodood-cloud.cloudfunctions.net/scrapeMenu",
            {
              params: {
                url: business.url.replace("yelp.com/biz", "yelp.com/menu"),
              },
            }
          )
          .then((response) => response.data)
          .catch((error) => {
            functions.logger.error(error);
            return [];
          });

        // Add plates to Firestore
        await Promise.all(
          plateData?.map((plate) =>
            firestore()
              .collection("plates")
              .add({
                businessId: business.id,
                name: plate.name,
                description: plate.description,
                price: plate.price,
                image_url: plate.image_url,
                tags: business.categories.map((category) => category.alias),
                businessName: business.name,
              })
          )
        );

        // Add business to Firestore
        await firestore()
          .collection("businesses")
          .doc(business.id)
          .set({
            name: business.name,
            image_url: business.image_url,
            is_closed: business.is_closed,
            url: business.url,
            review_count: business.review_count,
            categories: business.categories,
            rating: business.rating,
            coordinates: business.coordinates,
            transactions: business.transactions,
            price: business.price ?? "",
            location: business.location,
            phone: business.phone,
            display_phone: business.display_phone,
            distance: business.distance ?? "",
            hours: business.hours ?? [],
            attributes: business.attributes ?? [],
            timestamp: firestore.FieldValue.serverTimestamp(),
            ttl: 86400000,
          });
      })
    );

    // Shuffle items based on timestamp 3 times
    for (let i = 0; i < 3; i++) {
      businesses.sort(() => Math.random() - 0.5);
    }

    return businesses;
  }
);
