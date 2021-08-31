import firebase from "../utils/initFirebase";
import { useMutation, useQueryClient } from "react-query";

type TypeSendConnectionRequest = {
  userId: string;
  message: string;
  profileUrl: string;
  headline: string;
  fullName: string;
  username: string;
};

export const useSendConnectionRequest = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      userId,
      message,
      profileUrl,
      headline,
      fullName,
      username,
    }: TypeSendConnectionRequest) => {
      const LoggedInUserId = firebase.auth().currentUser?.uid;
      const connectionData = {
        userId: LoggedInUserId,
        message,
        profileUrl,
        headline,
        fullName,
        username,
      };
      await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .update({
          connectionRequestsReceived: firebase.firestore.FieldValue.arrayUnion(
            connectionData
          ),
        });

      return firebase
        .firestore()
        .collection("users")
        .doc(LoggedInUserId)
        .update({
          connectionRequestsSent: firebase.firestore.FieldValue.arrayUnion(
            userId
          ),
        });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries("userInfo");
      },
    }
  );
};
