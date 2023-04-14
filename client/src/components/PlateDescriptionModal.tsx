import { useCallback, useMemo } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "@/constants";
import { Plate } from "@/types";
import { usePlateData } from "@/hooks";
import { styles } from "./PlatesDescriptionModalStyles";

type PlateDescriptionModalProps = {
  visible: boolean;
  onDismiss: () => void;
  plateID: string;
};

export function PlateDescriptionModal({
  visible,
  onDismiss,
  plateID,
}: PlateDescriptionModalProps) {
  const plateData = usePlateData(plateID);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}><View style={styles.imageContainer}>
              <Image
                source={{ uri: plateData.data?.data()?.image_url }}
                style={styles.modalImage}
              />
            </View>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{plateData.data?.data()?.name}</Text>
            <TouchableOpacity onPress={onDismiss}>
              <MaterialCommunityIcons name="close" size={30} color="white" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalBody}>
            

            <Text style={styles.subHeading}>Business Name</Text>
            <Text style={styles.modalText}>{plateData.data?.data()?.businessName}</Text>

            <Text style={styles.subHeading}>Description</Text>
            <Text style={styles.modalText}>{plateData.data?.data()?.description}</Text>

            <Text style={styles.subHeading}>Price</Text>
            <Text style={styles.modalText}>{plateData.data?.data()?.price}</Text>

            <View style={styles.modalTagsContainer}>
              <Text style={styles.subHeading}>Tags</Text>
              {plateData.data?.data()?.tags.map((tag: string) => (
                <Text style={styles.modalTag} key={tag}>
                  {tag}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
