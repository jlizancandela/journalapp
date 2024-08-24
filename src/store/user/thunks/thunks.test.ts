import { beforeAll, describe, expect, test, vi } from "vitest";
import { getGoogleThunk } from "./getGoogleThunk";
import { checkUserThunk } from "./checkUserThunk";
import { loginUserThunk } from "./loginUserThunk";
import { logoutUserThunk } from "./logoutUserThunk";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../../apis";
import { registerUserThunk } from "./registerUserThunk";

// -----------------------------------------------
// Dummy Data
// -----------------------------------------------

const loggedState = {
  name: "test",
  email: "test",
  status: "connected",
  error: "",
  photoUrl: "test",
  uid: "test",
};

const unloggedState = {
  name: "",
  email: "",
  status: "disconnected",
  error: "test",
  photoUrl: "",
  uid: "",
};

const loggedResponse = {
  ok: true,
  displayName: loggedState.name,
  email: loggedState.email,
  photoURL: loggedState.photoUrl,
  uid: loggedState.uid,
};

const notLoggedResponse = {
  ok: false,
  errorMessage: "test",
};

// -----------------------------------------------
// Mocks
// -----------------------------------------------

const dispatch = vi.fn();

// ---------------

const mocks = vi.hoisted(() => ({
  googleConect: vi.fn(),
}));

vi.mock("../../../auth/helpers/googleConect", () => ({
  googleConect: () => mocks.googleConect(),
}));

// ---------------

const emailConectMock = vi.hoisted(() => ({
  emailConect: vi.fn(),
}));

vi.mock("../../../auth/helpers/emailConect", () => ({
  emailConect: () => emailConectMock.emailConect(),
}));

// ----------------

vi.mock("firebase/auth", async (importOriginal) => {
  const actual: typeof importOriginal = await importOriginal();
  return {
    ...actual,
    signOut: vi.fn(),
  };
});

// ---------------

const emailRegisterMock = vi.hoisted(() => ({
  emailRegister: vi.fn(),
}));

vi.mock("../../../auth/helpers/emailRegister", () => ({
  emailRegister: () => emailRegisterMock.emailRegister(),
}));

// -----------------------------------------------
// Tests
// -----------------------------------------------

describe("checkUser", () => {
  test("debe de llamar a dispatch con el checkUser", async () => {
    const thunk = checkUserThunk();
    await thunk(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: "user/checkUser",
    });
  });
});

describe("getGoogleThunks", () => {
  test("debe de llamar a setUser con datos de usuario loggeado", async () => {
    mocks.googleConect.mockResolvedValue(loggedResponse);
    const thunk = getGoogleThunk();
    await thunk(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: "user/checkUser",
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "user/setUser",
      payload: loggedState,
    });
    vi.clearAllMocks();
  });
  test("debe de llamar a setUser con datos de usuario no loggeado", async () => {
    mocks.googleConect.mockResolvedValue(notLoggedResponse);
    const thunk = getGoogleThunk();
    await thunk(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: "user/checkUser",
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "user/setUser",
      payload: unloggedState,
    });
    vi.clearAllMocks();
  });
});

describe("emailConect", () => {
  test("debe de llamar a setUser con datos de usuario loggeado", async () => {
    emailConectMock.emailConect.mockResolvedValue(loggedResponse);
    const thunk = loginUserThunk({ email: "test", password: "test" });
    await thunk(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: "user/checkUser",
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "user/setUser",
      payload: loggedState,
    });
    vi.clearAllMocks();
  });
  test("debe de llamar a setUser con datos de usuario no loggeado", async () => {
    emailConectMock.emailConect.mockResolvedValue(notLoggedResponse);
    const thunk = loginUserThunk({ email: "test", password: "test" });
    await thunk(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: "user/checkUser",
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "user/setUser",
      payload: { ...unloggedState, email: "test" },
    });
    vi.clearAllMocks();
  });
});

describe("logoutUserThunk", () => {
  beforeAll(async () => {
    const thunk = logoutUserThunk();
    await thunk(dispatch);
  });

  test("debe de llamar a signOut", () => {
    expect(signOut).toHaveBeenCalledWith(firebaseAuth);
  });

  test("debe de llamar a dispatch con el logoutUser", () => {
    expect(dispatch).toHaveBeenCalledWith({
      type: "user/logoutUser",
    });
  });
});

describe("emailRegister", () => {
  test("debe de llamar a setUser con datos de usuario loggeado", async () => {
    emailRegisterMock.emailRegister.mockResolvedValue(loggedResponse);
    const thunk = registerUserThunk({
      name: "test",
      email: "test",
      password: "test",
    });
    await thunk(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: "user/checkUser",
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "user/setUser",
      payload: loggedState,
    });
    vi.clearAllMocks();
  });

  test("debe de llamar a logoutUser", async () => {
    emailRegisterMock.emailRegister.mockResolvedValue(notLoggedResponse);
    const thunk = registerUserThunk({
      name: "test",
      email: "test",
      password: "test",
    });
    await thunk(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: "user/checkUser",
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "user/logoutUser",
    });
    vi.clearAllMocks();
  });
});
