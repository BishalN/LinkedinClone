import firebase from "../utils/initFirebase";
import { useQuery } from "react-query";

export const useGetAllUsers = () => {
  return useQuery("users", async () => {
    const LoggedInUserId = firebase.auth().currentUser?.uid;
    let users: Array<firebase.firestore.DocumentData> = [];
    const userSnapshots = await firebase
      .firestore()
      .collection("users")
      .where("uuid", "!=", LoggedInUserId)
      .get();
    userSnapshots.forEach((doc) => users.push(doc.data()));
    return users;
  });
};
