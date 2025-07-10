import React, { useState } from "react";
import { useData } from "../../context/DataContext";

export default function Notes() {
  const { notesData, setNotesData } = useData();

  const [newDate, setNewDate] = useState("");
  const [newTask, setNewTask] = useState("");
  const [confirmDeleteDate, setConfirmDeleteDate] = useState(null);

  const addNote = () => {
    if (!newDate.trim() || newTask.trim().length < 5) return;

    const newNote = {
      id: Date.now(),
      content: newTask.trim(),
      completed: false,
    };

    setNotesData((prev) => ({
      ...prev,
      [newDate]: [...(prev[newDate] || []), newNote],
    }));

    setNewDate("");
    setNewTask("");
  };

  const deleteNote = (date, id) => {
    setNotesData((prev) => ({
      ...prev,
      [date]: prev[date].filter((note) => note.id !== id),
    }));
  };

  const toggleCompleted = (date, id) => {
    setNotesData((prev) => ({
      ...prev,
      [date]: prev[date].map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      ),
    }));
  };

  const confirmDelete = () => {
    if (confirmDeleteDate) {
      const updated = { ...notesData };
      delete updated[confirmDeleteDate];
      setNotesData(updated);
      setConfirmDeleteDate(null);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📝 Notes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(notesData)
          .sort((a, b) => new Date(b) - new Date(a))
          .map((date) => (
            <div
              key={date}
              className="rounded-xl p-4 shadow-sm bg-white border border-gray-300 text-gray-800"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{date}</h3>
                <button
                  onClick={() => setConfirmDeleteDate(date)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete Date
                </button>
              </div>

              {notesData[date].map((note) => (
                <div
                  key={note.id}
                  className="flex justify-between items-center mb-2"
                >
                  <div className="flex items-center gap-2 w-full">
                    <input
                      type="checkbox"
                      checked={note.completed}
                      onChange={() => toggleCompleted(date, note.id)}
                    />
                    <span
                      className={`flex-grow ${
                        note.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {note.content}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteNote(date, note.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ))}
      </div>

      {/* Add new note */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-lg font-semibold mb-2">➕ Add New Task</h3>
        <div className="flex flex-col sm:flex-row gap-3 mb-2">
          <input
            type="date"
            className="p-2 border rounded w-full sm:w-[160px]"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter task..."
            className="p-2 border rounded w-full"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={addNote}
            disabled={!newDate || newTask.trim().length < 5}
            className={`px-4 py-2 rounded text-white ${
              newDate && newTask.trim().length >= 5
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Save
          </button>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {confirmDeleteDate && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md max-w-sm w-full">
            <p className="mb-4">
              Are you sure you want to delete all notes for{" "}
              <strong>{confirmDeleteDate}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmDeleteDate(null)}
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
