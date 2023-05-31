import React, { useEffect } from "react";
import { useAuth } from "../hooks/use-auth";
import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileHeader from "../components/profile/ProfileHeader";
import Header from "../components/Header";

export interface stateMan {
  user: {
    firstName: string,
    lastName: string, 
    email: string,
    id: string,
    token: string,
  }
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth, email} = useAuth();

  const userData = useSelector((state: stateMan) => state.user);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login"); // Перенаправляем на страницу входа, если неавторизован
    }
  }, [isAuth, navigate]);

  return (
    <div style={{ color: "black" }}>
      <Container maxWidth="md" disableGutters={true}>
        <Header/>
        <ProfileHeader/>
        <Typography
          variant="button"
          display="block"
          align="center"
          sx={{ mt: "1rem" }}
          gutterBottom
        >
          <div style={{ color: "black" }}>Profile {userData.firstName} email {email}</div>
        </Typography>
      </Container>
    </div>
  );
};

export default Profile;
