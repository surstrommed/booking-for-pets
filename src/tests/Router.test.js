import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignIn } from "../components/Auth/Signin";
import { SignUp } from "../components/Auth/Signup";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { store } from "../components/App";
import { theme } from "../assets/theme";

describe("ROUTES TESTS", () => {
  const signin = (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );

  const signup = (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );

  it("Sign in router test", async () => {
    render(signin);
    const goToSignUp = await screen.findByRole("button", { name: /sign up/i });
    userEvent.click(goToSignUp);
    const signUpWindowCheck = await screen.findAllByText(/sign up/i);
    expect(signUpWindowCheck).toHaveLength(1);
  });

  it("Sign up router test", async () => {
    render(signup);
    const goToSignIn = await screen.findByRole("button", { name: /sign in/i });
    userEvent.click(goToSignIn);
    const signInWindowCheck = await screen.findAllByText(/sign in/i);
    expect(signInWindowCheck).toHaveLength(1);
  });
});
