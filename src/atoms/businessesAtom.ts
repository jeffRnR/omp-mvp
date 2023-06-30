import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';

export interface Business {
  id: string;
  address: string;
  businessCategory: string;
  businessDescription: string;
  businessPhoneNumner: string;
  businessEmployees: number;
  businessTillNumber: number;
  businessOwner: string;
  numberOfRecommendations: number;
  createdAt?: Timestamp;
  imageURL?: string;
}

export interface BusinessSnippet {
  businessId: string;
  isOwner?: boolean;
  imageURL?: string;
}

interface BusinessState {
  mySnippets: BusinessSnippet[];
  currentBusiness?: Business;
}

const defaultBusinessState: BusinessState = {
  mySnippets: [],
};

export const businessState = atom<BusinessState>({
  key: 'businessState',
  default: defaultBusinessState,
});
