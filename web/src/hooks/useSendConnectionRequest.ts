import firebase from "../utils/initFirebase";
import { useMutation, useQueryClient } from "react-query";

type TypeSendConnectionRequest = {
  userId: string;
  message: string;
  profileUrl: string;
  headline: string;
  fullName: string;
};

//the problem is we have to send our information to the recieved array rather then
// theirs information

export const useSendConnectionRequest = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      userId,
      message,
      profileUrl,
      headline,
      fullName,
    }: TypeSendConnectionRequest) => {
      const LoggedInUserId = firebase.auth().currentUser?.uid;
      const connectionData = {
        userId,
        message,
        profileUrl,
        headline,
        fullName,
      };
      console.log(connectionData);
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
