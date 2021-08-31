import firebase from "../utils/initFirebase";
import { useQuery, useQueryClient } from "react-query";

export const useGetAllUsers = () => {
  const client = useQueryClient();
  return useQuery("users", async () => {
    //We can pull this information out of the querycache if we want to
    const userId = firebase.auth().currentUser?.uid;
    const alreadyConnectedUsers: Array<string> = [];
    const userDoc = await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get();

    userDoc
      .data()!
      .connections.map((connection: string) =>
        alreadyConnectedUsers.push(connection)
      );

    const LoggedInUserId = firebase.auth().currentUser?.uid;
    let users: Array<firebase.firestore.DocumentData> = [];
    let userQuery = firebase.firestore().collection("users");

    const userSnapshots = await userQuery
      .where("uuid", "!=", LoggedInUserId)
      .get();

    userSnapshots.forEach((doc) => {
      //filter the users that are pushed to users
      if (!alreadyConnectedUsers.includes(doc.data().uuid))
        users.push(doc.data());
    });

    return users;
  });
};
