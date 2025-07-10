import React from "react";
import { useData } from "../../context/DataContext";

export default function Home() {
  const { notesData, exerciseData } = useData();

  const todayDate = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
  const todayDay = new Date().toLocaleDateString("en-US", { weekday: "long" }); // e.g., "Thursday"

  const todaysExercises = exerciseData[todayDay] || [];
  const todaysNotes = notesData[todayDate] || [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Welcome back!</h2>

      {/* Exercises Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Today's Exercises</h3>
        {todaysExercises.length === 0 ? (
          <p className="text-gray-500">No exercises added for today.</p>
        ) : (
          <ul className="list-disc pl-5">
            {todaysExercises.map((ex) => (
              <li
                key={ex.id}
                className={ex.completed ? "line-through text-gray-500" : ""}
              >
                {ex.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Notes Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Today's Notes</h3>
        {todaysNotes.length === 0 ? (
          <p className="text-gray-500">No notes added for today.</p>
        ) : (
          <ul className="list-disc ml-6 space-y-1">
            {todaysNotes.map((note) => (
              <li
                key={note.id}
                className={note.completed ? "line-through text-gray-500" : ""}
              >
                {note.content}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
