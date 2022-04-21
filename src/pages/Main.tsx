import React from "react";
import { Routes, Route } from "react-router-dom";
import Page404 from "./Page404";
import { CProfile } from "./Profile";
import Login from "./Login";
import Register from "./Register";
import { PrivateRoute } from "./../components/Auxiliary/PrivateRoute";
import { CHotels } from "./Hotels";
import { CHotelPage } from "./../components/Hotels/HotelPage";
import { Preloader } from "./../components/Auxiliary/Preloader";
import { connect } from "react-redux";
import { RootState } from "../components/App";
import { CWishlists } from "./Wishlists";
import { CWishlistPage } from "./../components/Wishlist/WishlistPage";

function MainPage() {
  return (
    <div className="Main">
      <div className="Top">
        <div className="MainImageBoard">
          <img
            src="https://i.ibb.co/qyX9783/febvuibvbi3v.jpg"
            alt="Main image board"
          />
        </div>
      </div>
    </div>
  );
}

const Main = ({ promise }) => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route
        path="/signup"
        element={
          <PrivateRoute>
            <Register />
          </PrivateRoute>
        }
      />
      <Route
        path="/signin"
        element={
          <PrivateRoute>
            <Login />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <CProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/hotels/:location/:arrival/:departure/:number"
        element={<CHotels />}
      />
      <Route
        path="/hotels/hotel/:hotelId"
        element={
          <Preloader
            promiseName={"getHotels"}
            promiseState={promise}
            sub={<CHotelPage />}
          />
        }
      />
      <Route
        path="/wishlists"
        element={
          <PrivateRoute>
            <CWishlists />
          </PrivateRoute>
        }
      />
      <Route
        path="/wishlists/wishlist/:wishlistName"
        element={
          <PrivateRoute>
            <CWishlistPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export const CMain = connect((state: RootState) => ({
  promise: state.promise,
}))(Main);
