import { db } from '../utils/firebase'; // Firebase db initialization
import {
  FirestoreDataConverter,
  DocumentReference,
} from '@google-cloud/firestore';

export interface Category {
  id?: string;
  name: string;
  createdBy: string;
}

const categoryConverter: FirestoreDataConverter<Category> = {
  toFirestore: (category: Category) => ({
    name: category.name,
    createdBy: category.createdBy,
  }),
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      name: data.name,
      createdBy: data.createdBy,
    };
  },
};

export const createCategory = async (
  category: Omit<Category, 'id'>
): Promise<DocumentReference<Category>> => {
  const categoryRef = db
    .collection('categories')
    .withConverter(categoryConverter);
  return categoryRef.add(category);
};

export const getAllCategories = async (): Promise<Category[]> => {
  const snapshot = await db
    .collection('categories')
    .withConverter(categoryConverter)
    .get();
  return snapshot.docs.map((doc) => doc.data());
};
