import firebase from "firebase/compat/app";
import { authfirebase } from "./firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return createUserWithEmailAndPassword(authfirebase, email, password);
};

export const dosigInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(authfirebase, email, password);
};

export const dosginout = async (email: string, password: string) => {
  return authfirebase.signOut();
};
