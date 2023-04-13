import { Plate } from "@/types";
import { memo, useState } from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";

export const Card = memo(
	({
		plate,
		liked,
	}: {
		plate: QueryDocumentSnapshot<DocumentData>;
		liked: boolean;
	}) => {
		const [showDescription, setShowDescription] = useState(false);
		return (
			<View style={styles.card}>
				<Image
					source={{ uri: plate.data().image_url }}
					style={styles.cardImage}
				/>
				<Text style={styles.heading}>{plate.data()?.name}</Text>
				<Text style={styles.price}>{plate.data()?.price}</Text>
				{liked && (
					<View style={styles.likeBadge}>
						<AntDesign name="star" size={24} color="white" />
					</View>
				)}

				{showDescription && (
					<View style={styles.descContainer}>
						<Text style={styles.descText}>
							{plate.data()?.name}
						</Text>
						<Text style={styles.descText}>
							{plate.data()?.price}
						</Text>
						<Text style={styles.descText}>Description</Text>
						<Text style={styles.descText}>
							{plate.data()?.description}
						</Text>
					</View>
				)}
				{/* <LinearGradient 
                    locations={[0, 1.0]}  
                    colors= {['rgba(0,0,0,0.00)', 'rgba(0,0,0,0.80)']} 
                    style={styles.linearGradient}>
                  </LinearGradient> */}
			</View>
		);
	},
);
