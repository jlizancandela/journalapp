import { LoginPage } from "./login.tsx";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../store/user/userReducer.ts";
import { MemoryRouter } from "react-router-dom";
import { getGoogleThunk } from "../../store/user/thunks/getGoogleThunk";
import { loginUserThunk } from "../../store/user/thunks/loginUserThunk.ts";

// Dummy data
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
// Mocks
store.dispatch = vi.fn();

vi.mock("../../store/user/thunks/getGoogleThunk", () => ({
  getGoogleThunk: vi.fn(),
}));

vi.mock("../../store/user/thunks/loginUserThunk.ts", () => ({
  loginUserThunk: vi.fn(() => {}),
}));

// Tests
describe("login", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });
  test("should render login", () => {
    const title = screen.getAllByText("Login");
    expect(title.length).toBeGreaterThanOrEqual(1);
  });

  test("should call handleGoogle", () => {
    const button = screen.getByLabelText("google");
    fireEvent.click(button);
    expect(store.dispatch).toHaveBeenCalledWith(getGoogleThunk());
  });

  test("should call handleLogin", () => {
    const button = screen.getByLabelText("loginButton");

    fireEvent.click(button);
    expect(store.dispatch).toHaveBeenCalledWith(
      loginUserThunk({ email: "", password: "" })
    );
  });

  test("should call handleLogin with values", () => {
    const button = screen.getByLabelText("loginButton");
    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");

    fireEvent.change(email, {
      target: { value: "test" },
    });
    fireEvent.change(password, {
      target: { value: "test" },
    });

    fireEvent.click(button);
    expect(store.dispatch).toHaveBeenCalledWith(
      loginUserThunk({ email: "test", password: "test" })
    );
  });
});
