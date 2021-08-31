import firebase from "../utils/initFirebase";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useGetUserInfo = (userId: string) => {
  return useQuery(["user", userId], async () => {
    const userInfo = await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get();
    return userInfo.data();
  });
};
