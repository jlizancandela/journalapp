import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { logoutUser, setUser, useAppDispatch, UserState } from "../../store";
import { firebaseAuth } from "../../apis";

export const useObserver = () => {
  const { status } = useSelector((state: { user: UserState }) => state.user);
  const dispatch = useAppDispatch();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        dispatch(
          setUser({
            name: user.displayName || "",
            email: user.email || "",
            status: "connected",
            error: "",
            photoUrl: user.photoURL || "",
            uid: user.uid,
          })
        );
      } else {
        dispatch(logoutUser());
      }
      setChecking(false);
    });
  }, [dispatch]);

  return { status, checking };
};
