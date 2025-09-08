import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup with:", email, password);
    // TODO: Call backend API
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>Signup</Typography>
      <form onSubmit={handleSignup}>
        <TextField 
          label="Email" fullWidth margin="normal" 
          value={email} onChange={(e) => setEmail(e.target.value)} 
        />
        <TextField 
          label="Password" type="password" fullWidth margin="normal" 
          value={password} onChange={(e) => setPassword(e.target.value)} 
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Signup
        </Button>
      </form>
    </Container>
  );
}

export default SignupPage;
