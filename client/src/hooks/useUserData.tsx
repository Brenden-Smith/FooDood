import { useAuthUser } from '@react-query-firebase/auth';
import { useFirestoreDocument } from '@react-query-firebase/firestore';
import { QueryKey } from '@/constants';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc } from 'firebase/firestore';

export function useUserData() {
  const user = useAuthUser(QueryKey.USER, getAuth());
  return useFirestoreDocument(
    [QueryKey.USER_DATA, user.data?.uid],
    doc(getFirestore(), `users/${user.data?.uid}`),
    {},
    {
      enabled: !!user.data?.uid,
    }
  );
}
