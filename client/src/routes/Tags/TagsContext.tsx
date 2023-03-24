import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type TagsContextType = {
	tags: string[];
	setTags: (tags: string[]) => void;
};
const TagsContext = createContext<TagsContextType>({} as TagsContextType);

export function useTags() {
	return useContext(TagsContext);
}

export function TagsProvider({ children }: { children: React.ReactNode }) {
	const [tags, setTags] = useState<string[]>([]);
	const memoizedChildren = useMemo(() => children, [children]);

	useEffect(() => {
		getDoc(doc(getFirestore(), `users/${getAuth().currentUser?.uid}`)).then(
			(doc) => {
				if (doc.exists()) {
					setTags(doc.data()?.tags ?? []);
				}
			},
		);
	}, []);

	return (
		<TagsContext.Provider value={{ tags, setTags }}>
			{memoizedChildren}
		</TagsContext.Provider>
	);
}
