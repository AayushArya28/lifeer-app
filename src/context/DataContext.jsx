import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  const [notesData, setNotesData] = useState({});
  const [exerciseData, setExerciseData] = useState({});

  const fetchUserData = async () => {
    if (!user) return;

    const userDoc = doc(db, "users", user.uid);
    const snapshot = await getDoc(userDoc);

    if (snapshot.exists()) {
      const data = snapshot.data();
      setNotesData(data.notesData || {});
      setExerciseData(data.exerciseData || {});
    }
  };

  const saveUserData = async (newNotes, newExercises) => {
    if (!user) return;
    const userDoc = doc(db, "users", user.uid);

    await setDoc(
      userDoc,
      {
        notesData: newNotes,
        exerciseData: newExercises,
      },
      { merge: true }
    );
  };

  // Fetch on login
  useEffect(() => {
    fetchUserData();
  }, [user]);

  // Save when notes or exercise changes
  useEffect(() => {
    if (user) saveUserData(notesData, exerciseData);
  }, [notesData, exerciseData]);

  return (
    <DataContext.Provider
      value={{
        notesData,
        setNotesData,
        exerciseData,
        setExerciseData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
