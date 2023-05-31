import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { setUser } from "../store/slices/userSlice";

import Logo4E4 from "../components/Logo4E4";

import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Container } from "@mui/material";

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.getIdToken(),
          })
        );
  
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);
  
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const firstName = userData.firstName;
          const lastName = userData.lastName;
  
          dispatch(
            setUser({
              firstName,
              lastName,
              email: user.email,
              id: user.uid,
              token: user.getIdToken(),
            })
          );
  
          console.log(userData);
          navigate("/");
        } else {
          console.log("Документ не найден");
        }
      })
      .catch(() => alert("Ошибка входа в систему"));
  };

  return (
    <Container
      sx={{
        mt: "50px",
      }}
    >
      <Logo4E4 />
      <form className="LoginForm">
        <TextField
          label="email"
          type="email"
          value={email}
          sx={{
            mt: "2rem",
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          label="Пароль"
          value={password}
          sx={{
            mt: "1rem",
            mb: "1rem",
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleLogin(email, password)}
        >
          Войти
        </Button>
        <Typography
          variant="button"
          display="block"
          align="right"
          sx={{ mt: "1rem" }}
          gutterBottom
        >
          Or
          <Link to="/signup" className="link">
            {" "}
            Sign up
          </Link>
        </Typography>
      </form>
    </Container>
  );
};

export default Login;
