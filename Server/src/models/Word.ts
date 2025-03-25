import { db } from '../utils/firebase';
import {
  FirestoreDataConverter,
  DocumentReference,
} from '@google-cloud/firestore';

export interface Word {
  id?: string;
  word: string;
  translation: string;
  categoryId: string;
}

const wordConverter: FirestoreDataConverter<Word> = {
  toFirestore: (word: Word) => ({
    word: word.word,
    translation: word.translation,
    categoryId: word.categoryId,
  }),
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      word: data.word,
      translation: data.translation,
      categoryId: data.categoryId,
    };
  },
};

export const addWordToCategory = async (
  categoryId: string,
  word: string,
  translation: string
): Promise<DocumentReference<Word>> => {
  const wordRef = db.collection('words').withConverter(wordConverter);
  return wordRef.add({ word, translation, categoryId });
};

export const getWordsInCategory = async (
  categoryId: string
): Promise<Word[]> => {
  const snapshot = await db
    .collection('words')
    .withConverter(wordConverter)
    .where('categoryId', '==', categoryId)
    .get();
  return snapshot.docs.map((doc) => doc.data());
};
