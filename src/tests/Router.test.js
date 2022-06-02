import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignIn } from "../components/Auth/Signin";
import { SignUp } from "../components/Auth/Signup";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "../assets/theme";
import "@testing-library/jest-dom";
import { store } from "../store/store";
import { App } from "../components/App";

describe("ROUTES TESTS", () => {
  it("Sign in router test", async () => {
    const signin = (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <SignIn />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );

    // render(signin);
    const goToSignUp = await screen.findByRole("button", { name: /sign up/i });
    userEvent.click(goToSignUp);
    const signUpWindowCheck = await screen.findAllByText(/sign up/i);
    expect(signUpWindowCheck).toHaveLength(1);
  });

  it("Sign up router test", async () => {
    const signup = (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <SignUp />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );

    // render(signup);
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
    // render(app);
    expect(screen.getByTestId("error-page")).toBeInTheDocument();
  });
});
