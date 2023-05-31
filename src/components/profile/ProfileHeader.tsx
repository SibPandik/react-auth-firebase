import { Avatar } from "@mui/material";
import React from "react";

import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { stateMan } from "../../pages/Profile";

const ProfileHeader = () => {

    const userData = useSelector((state: stateMan) => state.user);
  return (
    <div>
      <div style={{ height: "120px" }}>
        <img
          src="https://c4.wallpaperflare.com/wallpaper/564/391/588/blue-landscape-night-sky-desert-dune-wallpaper-preview.jpg"
          alt="Фото профиля сзади"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        ></img>
      </div>
      <div className="profile_wrapper">
        <Avatar 
            alt="Alex Sasha"
            src="https://v1.popcornnews.ru/k2/news/1200/upload/news/446128934473.jpg"
            sx={{
                height: '90px',
                width: '90px',
            }}
        />
        <Typography
          variant="h6"
          display="block"
          align="center"
          sx={{ mt: "1rem",
                display: 'flex',
                pl: '18px',
            }}
          gutterBottom
        >
            <div>{userData.firstName}</div>
            <div>&nbsp;</div>
            <div>{userData.lastName}</div>
        </Typography>
      </div>
    </div>
  );
};

export default ProfileHeader;
