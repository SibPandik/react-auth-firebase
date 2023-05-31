import React, { useState } from "react";

import Logo4E4 from "../components/Logo4E4";

import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { setUser } from "../store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";

const Registration: React.FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  const auth = getAuth();
  const handleReg = async (email: any, password: any) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            firstName,
            lastName,
            email: user.email,
            id: user.uid,
            token: user.getIdToken(),
          })
        );
        navigate("/");


        const db = getFirestore();
        const curUser = auth.currentUser;
        
        const userData = {
          firstName,
          lastName,
          id: user.uid,
        };

        if (curUser) {
          const userId = user.uid;
          const userDocRef = doc(db, "users", userId);
          setDoc(userDocRef, userData)
            .then(() => {
              console.log(
                "Документ пользователя успешно добавлен в коллекцию 'users'."
              );
            })
            .catch((error) => {
              console.error(
                "Ошибка при добавлении документа пользователя:",
                error
              );
            });
        } else {
          console.log("Пользователь не в системе");
        }
      })
      .catch((error) => console.log("Invalid user!!!", error));
  };

  return (
    <Container sx={{ mt: "50px" }}>
      <Logo4E4 />
      <div className="LoginForm">
        <TextField
          label="Имя"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{
            mb: "1rem",
          }}
        />
        <TextField
          label="Фамилия"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          sx={{
            mb: "1rem",
          }}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          sx={{
            mb: "1rem",
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          name="password"
          label="Пароль"
          type="password"
          sx={{
            mb: "1rem",
          }}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => handleReg(email, pass)}
        >
          Зарегистрироваться
        </Button>
        <Typography
          variant="button"
          display="block"
          align="right"
          sx={{ mt: "1rem" }}
          gutterBottom
        >
          Or
          <Link to="/" className="link">
            {" "}
            Sign in
          </Link>
        </Typography>
      </div>
    </Container>
  );
};

export default Registration;
