import { Timestamp } from "firebase/firestore";

export type Like = {
  id: string;
  customerId: string;
  plateId: string;
  timestamp: Timestamp;
  name: string;
  image_url: string;
}