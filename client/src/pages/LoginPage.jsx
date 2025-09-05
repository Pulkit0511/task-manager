import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login with:", email, password);
    // TODO: Call backend API
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField 
          label="Email" fullWidth margin="normal" 
          value={email} onChange={(e) => setEmail(e.target.value)} 
        />
        <TextField 
          label="Password" type="password" fullWidth margin="normal" 
          value={password} onChange={(e) => setPassword(e.target.value)} 
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Container>
  );
}

export default LoginPage;
