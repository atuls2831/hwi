export interface Prescription {
  _id: string;
  medicines: string[];
  idCheck: boolean;
  verified: boolean;
  awaitingRefil: boolean;
  imageURL: string;
  createdAt: Date;
}
