import React from "react";
import { CChangePassword } from "./../components/Profile/ChangePassword";
import { CChangeAvatar } from "./../components/Profile/ChangeAvatar";
import { CChangePersonalData } from "./../components/Profile/ChangePersonalData";
import { Preloader } from "./../components/Auxiliary/Preloader";
import { connect } from "react-redux";
import { RootState } from "../components/App";

export const Profile = connect((state: RootState) => ({
  promise: state.promise,
}))(({ promise }) => {
  return (
    <div>
      <Preloader
        promiseName={"userUpdate"}
        promiseState={promise}
        sub={<CChangeAvatar />}
      />
      <Preloader
        promiseName={"userUpdate"}
        promiseState={promise}
        sub={<CChangePersonalData />}
      />
      <Preloader
        promiseName={"userUpdate"}
        promiseState={promise}
        sub={<CChangePassword />}
      />
    </div>
  );
});
