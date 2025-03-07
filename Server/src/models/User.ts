import { db } from "../utils/firebase"; // Firebase initialization
import { DocumentReference, FirestoreDataConverter } from "@google-cloud/firestore";
import { Timestamp } from "firebase-admin/firestore";

// TypeScript interface for User model
export interface User {
    uid: string;
    username: string;
    email: string;
    spokenLanguageId: number;
    learningLanguageId: number;
    streak: number;
    props: number[]; // List of prop IDs owned by the user
    animalId: number; // Animal ID representing the user's spirit animal
    createdAt: Timestamp;
}

const userConverter: FirestoreDataConverter<User> = {
    toFirestore: (user: User) => {
        return {
            uid: user.uid,
            username: user.username,
            email: user.email,
            spokenLanguageId: user.spokenLanguageId,
            learningLanguageId: user.learningLanguageId,
            streak: user.streak,
            props: user.props,
            animalId: user.animalId,
            createdAt: user.createdAt,
        };
    },
    fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot): User => {
        const data = snap.data();
        return {
            uid: data.uid,
            username: data.username,
            email: data.email,
            spokenLanguageId: data.spokenLanguageId,
            learningLanguageId: data.learningLanguageId,
            streak: data.streak,
            props: data.props,
            animalId: data.animalId,
            createdAt: data.createdAt,
        };
    },
};

// Helper functions to interact with Firestore

// Create a new user document
export const createUser = async (user: User): Promise<DocumentReference<User>> => {
    const userRef = db.collection("users").withConverter(userConverter);
    return userRef.add(user);
};

// Get user by UID
export const getUserByUid = async (uid: string): Promise<User | null> => {
    const userDoc = await db.collection("users").withConverter(userConverter).doc(uid).get();
    if (!userDoc.exists) {
        return null;
    }
    return userDoc.data()!;
};

// Update user's streak
export const updateStreak = async (uid: string, streak: number): Promise<void> => {
    const userRef = db.collection("users").withConverter(userConverter).doc(uid);
    await userRef.update({ streak });
};
