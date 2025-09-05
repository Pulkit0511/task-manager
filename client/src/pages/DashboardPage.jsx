import { useState } from "react";
import { Container, Typography, Button, TextField, List, ListItem, Checkbox } from "@mui/material";

function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (!task) return;
    setTasks([...tasks, { id: Date.now(), title: task, done: false }]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>

      <TextField 
        label="New Task" fullWidth 
        value={task} onChange={(e) => setTask(e.target.value)} 
      />
      <Button variant="contained" sx={{ mt: 2 }} onClick={addTask}>
        Add Task
      </Button>

      <List>
        {tasks.map((t) => (
          <ListItem key={t.id}>
            <Checkbox checked={t.done} onChange={() => toggleTask(t.id)} />
            {t.title}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default DashboardPage;
