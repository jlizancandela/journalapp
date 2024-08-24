import { describe, test, expect } from "vitest";
import userReducer, {
  checkUser,
  logoutUser,
  setError,
  setUser,
} from "./userReducer";
import { initialState, loggedState, logoutState } from "./dummyData";

describe("userReducer", () => {
  test("should return the initial state", () => {
    const state = userReducer(undefined, { type: "" });
    expect(state).toStrictEqual(initialState);
  });

  test("should set user", () => {
    const state = userReducer(initialState, setUser(loggedState));
    expect(state).toStrictEqual(loggedState);
  });

  test("should logout without error message", () => {
    const state = userReducer(loggedState, logoutUser());
    expect(state).toStrictEqual(logoutState);
  });

  test("should logout whith error message", () => {
    const error = "hay un error";
    const state = userReducer(logoutState, setError(error));
    expect(state).toStrictEqual({ ...logoutState, error: error });
  });

  test("should change the status to checking", () => {
    const state = userReducer(loggedState, checkUser());
    expect(state).toStrictEqual({ ...loggedState, status: "checking" });
  });
});
