import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);

  useEffect(() => {
    const savedHabits = localStorage.getItem("habits");
    if (savedHabits) {
      try {
        setHabits(JSON.parse(savedHabits));
      } catch (error) {
        console.error("Error parsing habits from localStorage:", error);
        localStorage.removeItem("habits");
      }
    }
  }, []);

  useEffect(() => {
    if (habits.length > 0) {
      localStorage.setItem("habits", JSON.stringify(habits));
    }
  }, [habits]);

  const addHabit = () => {
    if (habit.trim() === "") return;
    const newHabit = {
      name: habit,
      date: new Date().toLocaleString(),
    };
    setHabits([...habits, newHabit]);
    setHabit("");
  };

  const deleteSelectedHabit = () => {
    if (selectedHabit !== null) {
      setHabits(habits.filter((_, index) => index !== selectedHabit));
      setSelectedHabit(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addHabit();
    }
  };

  return (
    <div className="container">
      
  <div className="habit-box">
    <h2 className="habit-title">Habit List</h2> {}
    <table className="habit-table">
      <thead>
        <tr>
          <th>Habit</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {habits.map((h, index) => (
          <tr 
            key={index} 
            className={selectedHabit === index ? "selected" : ""}
            onClick={() => setSelectedHabit(selectedHabit === index ? null : index)}
          >            
            <td>{h.name}</td>
            <td>{h.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="input-section">
      <input
        type="text"
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter habit"
      />
      <button onClick={addHabit}>Add Habit</button>
      <button onClick={deleteSelectedHabit} disabled={selectedHabit === null}>Delete Selected Habit</button>
    </div>
  </div>
</div>
  );
}

export default App;