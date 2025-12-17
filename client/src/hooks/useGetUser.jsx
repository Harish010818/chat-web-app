import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthUser, setLoader } from "../useRedux/userSlice";
import axios from "axios";

export const useGetUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoader(true));
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/me`,
           {
             withCredentials: true,
           }
        );

        dispatch(setAuthUser(res.data.myProfile));
      } catch (err) {
        dispatch(setAuthUser(null));  //Ensure authUser is null on error
        console.error("Failed to fetch user:", err);
      } finally {
        dispatch(setLoader(false));
      }
    };

    fetchUser();
  }, []);
};
