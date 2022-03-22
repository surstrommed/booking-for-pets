import React from "react";
import { CChangePassword } from "./../components/Profile/ChangePassword";
import { CChangeAvatar } from "./../components/Profile/ChangeAvatar";
import { CChangePersonalData } from "./../components/Profile/ChangePersonalData";

export const Profile = () => {
  return (
    <div className="profilePage">
      <CChangeAvatar />
      <CChangePersonalData />
      <CChangePassword />
    </div>
  );
};
