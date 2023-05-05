import { useNavigation, useUserData } from "@/hooks";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import SaveButton from "./SaveButton";

type TagsContextType = {
	tags: string[];
	setTags: (tags: string[]) => void;
};
const TagsContext = createContext<TagsContextType>({} as TagsContextType);

export function useTags() {
	return useContext(TagsContext);
}

export function TagsProvider({ children }: { children: React.ReactNode }) {
	const user = useUserData();
	const [tags, setTags] = useState<string[]>(user.data?.data()?.tags ?? []);
	const memoizedChildren = useMemo(() => children, [children]);
	const navigation = useNavigation();

	const onPress = useCallback(
		() =>
			updateDoc(
				doc(getFirestore(), `users/${getAuth().currentUser?.uid}`),
				{
					tags,
				},
			),
		[tags, getAuth().currentUser?.uid],
	);

	useEffect(() => setTags(user.data?.data()?.tags ?? []), [user.data]);

	useEffect(() => {
		if (!tags.every((tag) => user.data?.data()?.tags.includes(tag))) {
			navigation.setOptions({
				headerRight: () => <SaveButton onPress={onPress} />,
			});
		} else {
			navigation.setOptions({
				headerRight: () => <SaveButton disabled />,
			});
		}
	}, [tags, user.data, navigation]);

	return (
		<TagsContext.Provider value={{ tags, setTags }}>
			{memoizedChildren}
		</TagsContext.Provider>
	);
}
