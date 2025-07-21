import React, { useState } from "react";
import { useData } from "../../context/DataContext";

const allDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function Exercise() {
  const { exerciseData, setExerciseData } = useData();

  const [addState, setAddState] = useState({});
  const [newInputs, setNewInputs] = useState({});
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [confirmDeleteDay, setConfirmDeleteDay] = useState(null);
  const [editing, setEditing] = useState({}); // { day, id, value }

  const handleEdit = (day, id, currentName) => {
    setEditing({ day, id, value: currentName });
  };

  const handleEditChange = (value) => {
    setEditing((prev) => ({ ...prev, value }));
  };

  const handleEditSave = () => {
    const { day, id, value } = editing;
    setExerciseData((prev) => ({
      ...prev,
      [day]: prev[day].map((ex) =>
        ex.id === id ? { ...ex, name: value } : ex
      ),
    }));
    setEditing({});
  };


  const handleAddDay = (day) => {
    if (!exerciseData[day]) {
      setExerciseData({ ...exerciseData, [day]: [] });
    }
    setShowDayDropdown(false);
  };

  const toggleComplete = (day, id) => {
    setExerciseData((prev) => ({
      ...prev,
      [day]: prev[day].map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

  const deleteExercise = (day, id) => {
    setExerciseData((prev) => ({
      ...prev,
      [day]: prev[day].filter((item) => item.id !== id),
    }));
  };

  const handleAddClick = (day) => {
    setAddState((prev) => ({ ...prev, [day]: true }));
    setNewInputs((prev) => ({ ...prev, [day]: { name: "", sets: "" } }));
  };

  const handleInputChange = (day, field, value) => {
    setNewInputs((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const isValidInput = (input) =>
    input?.name?.trim().length >= 3 && input?.sets?.trim().length >= 3;

  const handleSaveExercise = (day) => {
    const input = newInputs[day];
    if (!isValidInput(input)) return;

    const newExercise = {
      id: Date.now(),
      name: `${input.name.trim()} - ${input.sets.trim()}`,
      completed: false,
    };

    setExerciseData((prev) => ({
      ...prev,
      [day]: [...prev[day], newExercise],
    }));

    setAddState((prev) => ({ ...prev, [day]: false }));
    setNewInputs((prev) => ({ ...prev, [day]: { name: "", sets: "" } }));
  };

  const confirmDelete = () => {
    if (confirmDeleteDay) {
      const updated = { ...exerciseData };
      delete updated[confirmDeleteDay];
      setExerciseData(updated);
      setConfirmDeleteDay(null);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🏋️ Exercise Records</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(exerciseData).map((day) => (
          <div
            key={day}
            className="rounded-xl p-4 shadow-sm bg-white border border-gray-300 text-gray-800"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{day}</h3>
              <button
                onClick={() => setConfirmDeleteDay(day)}
                className="text-red-500 text-sm hover:underline"
              >
                Delete Day
              </button>
            </div>

            {exerciseData[day].map((ex) => (
  <div key={ex.id} className="flex items-center justify-between mb-2">
    <div className="flex items-center gap-2 w-full">
      <input
        type="checkbox"
        checked={ex.completed}
        onChange={() => toggleComplete(day, ex.id)}
        className="accent-blue-500"
      />
      {editing.id === ex.id && editing.day === day ? (
        <input
          value={editing.value}
          onChange={(e) => handleEditChange(e.target.value)}
          className="flex-1 border rounded px-2 py-1 text-sm"
        />
      ) : (
        <span className={`flex-1 ${ex.completed ? "line-through text-gray-500" : ""}`}>
          {ex.name}
        </span>
      )}
    </div>
    <div className="flex items-center gap-2 text-sm">
      {editing.id === ex.id && editing.day === day ? (
        <>
          <button onClick={handleEditSave}>💾</button>
          <button onClick={() => setEditing({})}>❌</button>
        </>
      ) : (
        <>
          <button onClick={() => handleEdit(day, ex.id, ex.name)}>✏️</button>
          <button onClick={() => deleteExercise(day, ex.id)}>🗑️</button>
        </>
      )}
    </div>
  </div>
))}


            {addState[day] ? (
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex flex-col md:flex-row gap-2">w
                  <input
                    type="text"
                    placeholder="Exercise name"
                    className="p-2 border rounded w-full"
                    value={newInputs[day]?.name || ""}
                    onChange={(e) =>
                      handleInputChange(day, "name", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Sets/Duration"
                    className="p-2 border rounded w-full"
                    value={newInputs[day]?.sets || ""}
                    onChange={(e) =>
                      handleInputChange(day, "sets", e.target.value)
                    }
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() =>
                      setAddState((prev) => ({ ...prev, [day]: false }))
                    }
                    className="text-sm px-4 py-1 rounded border border-gray-400 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!isValidInput(newInputs[day])}
                    onClick={() => handleSaveExercise(day)}
                    className={`text-sm px-4 py-1 rounded text-white ${isValidInput(newInputs[day])
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-gray-300 cursor-not-allowed"
                      }`}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => handleAddClick(day)}
                className="mt-4 text-blue-600 hover:underline text-sm"
              >
                + Add Exercise
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Day Section */}
      <div className="mt-6 text-right">
        {!showDayDropdown ? (
          <button
            onClick={() => setShowDayDropdown(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Add Day
          </button>
        ) : (
          <div className="flex justify-end items-center gap-2">
            <select
              className="p-2 border rounded"
              onChange={(e) => handleAddDay(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select Day
              </option>
              {allDays
                .filter((day) => !exerciseData[day])
                .map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
            </select>
            <button
              onClick={() => setShowDayDropdown(false)}
              className="text-sm px-3 py-1 border border-gray-400 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Confirm Delete Modal */}
      {confirmDeleteDay && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md max-w-sm w-full">
            <p className="mb-4">
              Are you sure you want to delete all exercises for{" "}
              <strong>{confirmDeleteDay}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmDeleteDay(null)}
                className="px-4 py-1 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
