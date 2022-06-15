import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignIn } from "../components/Auth/Signin";
import { SignUp } from "../components/Auth/Signup";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { setupStore } from "../store/store";
import { App } from "../components/App";

const onSubmit = jest.fn((e) => {
  e.preventDefault();
  sessionStorage.setItem(
    "token",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImNybmdAdWtyLm5ldCIsImxvZ2luIjoiYWRtaW4iLCJmaXJzdE5hbWUiOiJBbnRvbiIsImxhc3ROYW1lIjoiWmFkb3JvemhueWkiLCJjdXJyZW5jeUlkIjozLCJjcmVhdGVkQXQiOjE2NTQxNTQ2MTkwMDAsInBpY3R1cmVVcmwiOiJodHRwczovL2kuaWJiLmNvL0t3ZmRHdFkvcG5ndHJlZS11c2VyLWF2YXRhci1ib3ktaW1hZ2UtMTQ4MjkzNy5qcGciLCJ3aXNobGlzdHMiOlt7Im5hbWUiOiJUZXN0IiwiaG90ZWxzSWQiOltdfSx7Im5hbWUiOiJTYXNBc3MiLCJob3RlbHNJZCI6WyJ3MGViTyJdfV0sImlkIjoxLCJwYXNzd29yZCI6IjIxMDUwMDEwMEFudG9uJCIsImp0aSI6ImFkMjZkMTM3LTVjYTQtNGJiYy04NmMyLTkyZDU4NDU1OGFkYSIsImlhdCI6MTY1NDYwMTg3MiwiZXhwIjoxNjU0NjA1NDcyfQ.9oPzVXpjWZGzGNZMC3kaGuUM0XWgs0c8RLR5MGpzDA0"
  );
});

describe("ROUTES TESTS", () => {
  it("Sign in page router test", async () => {
    const signin = (
      <Provider store={setupStore()}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );

    render(signin);
    const goToSignUp = await screen.findByRole("button", { name: /sign up/i });
    userEvent.click(goToSignUp);
    const signUpWindowCheck = await screen.findAllByText(/sign up/i);
    expect(signUpWindowCheck).toHaveLength(1);
  });

  it("Sign up page router test", async () => {
    const signup = (
      <Provider store={setupStore()}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );

    render(signup);
    const goToSignIn = await screen.findByRole("button", { name: /sign in/i });
    userEvent.click(goToSignIn);
    const signInWindowCheck = await screen.findAllByText(/sign in/i);
    expect(signInWindowCheck).toHaveLength(1);
  });

  it("Error page router test", () => {
    const app = (
      <MemoryRouter initialEntries={["/wrong-page"]}>
        <App />
      </MemoryRouter>
    );
    render(app);
    expect(screen.getByTestId("error-page")).toBeInTheDocument();
  });

  it("Profile page router test", async () => {
    const { unmount: signinUnmount } = render(
      <Provider store={setupStore()}>
        <BrowserRouter>
          <SignIn onSubmit={onSubmit} />
        </BrowserRouter>
      </Provider>
    );

    const submitBtn = await screen.findByRole("button", {
      name: /sign in/i,
    });

    fireEvent.click(submitBtn);

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());

    expect(sessionStorage.getItem("token")).toBeDefined();

    signinUnmount();

    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      await screen.findByRole("button", { name: /set image/i })
    ).toBeInTheDocument();
  });

  it("All hotels page router test", async () => {
    render(
      <MemoryRouter initialEntries={["/hotels"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      await screen.findAllByText(/found according to your request/i)
    ).toHaveLength(1);
  });

  it("Specific hotel page router test", async () => {
    render(
      <MemoryRouter
        initialEntries={[
          "/hotels/Kiev,%20Ukraine/1654706642000/1654793042000/1",
        ]}
      >
        <App />
      </MemoryRouter>
    );

    expect(
      await screen.findAllByText(/found according to your request/i)
    ).toHaveLength(1);
  });

  it("Hotel page router test", async () => {
    render(
      <MemoryRouter initialEntries={["/hotels/hotel/w0ebO"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      await screen.findByLabelText("Additional message for booking (optional)")
    ).toBeInTheDocument();
  });

  it("For owners page router test", async () => {
    render(
      <MemoryRouter initialEntries={["/for-owners"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      await screen.findByRole("button", { name: /create hotel/i })
    ).toBeInTheDocument();
  });

  it("Hotels in for owners page router test", async () => {
    render(
      <MemoryRouter initialEntries={["/for-owners/hotels"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findAllByText(/your hotels/i)).toHaveLength(1);
  });

  it("Requests page in owner`s hotel router test", async () => {
    render(
      <MemoryRouter initialEntries={["/for-owners/hotels/w0ebO/requests"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findAllByText(/pending requests/i)).toHaveLength(1);
    expect(await screen.findAllByText(/confirmed requests/i)).toHaveLength(1);
    expect(await screen.findAllByText(/rejected requests/i)).toHaveLength(1);
  });

  it("Notification page router test", async () => {
    render(
      <MemoryRouter initialEntries={["/notifications"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findAllByText(/your notifications/i)).toHaveLength(1);
  });

  it("Wishlists page router test", async () => {
    render(
      <MemoryRouter initialEntries={["/wishlists"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findAllByText(/wishlists/i)).toHaveLength(1);
  });

  it("Wishlist page router test", async () => {
    render(
      <MemoryRouter initialEntries={["/wishlists/wishlist/Test"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findAllByTestId("wishlist-name")).toHaveLength(1);
  });
});
