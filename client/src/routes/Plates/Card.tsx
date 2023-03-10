import { Plate } from "@/types";
import { memo, useState } from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

export const Card = memo(({ plate }: { plate: Plate }) => {
	const [showDescription, setShowDescription] = useState(false);
	return (
		<View style={styles.card}>
			<Image source={{ uri: plate.image_url }} style={styles.cardImage} />
			<Text style={styles.heading}>{plate.name}</Text>
			<Text style={styles.price}>{plate.price}</Text>

			{showDescription && (
				<View style={styles.descContainer}>
					<Text style={styles.descText}>{plate.name}</Text>
					<Text style={styles.descText}>{plate.price}</Text>
					<Text style={styles.descText}>Description</Text>
					<Text style={styles.descText}>{plate.description}</Text>
				</View>
			)}
			{/* <LinearGradient 
                      locations={[0, 1.0]}  
                      colors= {['rgba(0,0,0,0.00)', 'rgba(0,0,0,0.80)']} 
                      style={styles.linearGradient}>
                  </LinearGradient> */}
		</View>
	);
});
