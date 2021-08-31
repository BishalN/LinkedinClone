import firebase from "../utils/initFirebase";
import { useMutation, useQueryClient } from "react-query";

type TypeAcceptConnection = {
  //this data are our side of information that we need to store so that we know we are connected
  userId: string;
  profileUrl: string;
  headline: string;
  fullName: string;
  message: string;
  //we also need the same but our own information so that we can save the information in other part of the data
  currentUserId: string;
};

export const useAcceptConnection = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      userId,
      profileUrl,
      headline,
      fullName,
      message,
      currentUserId,
    }: TypeAcceptConnection) => {
      //adding the data to connections array
      await firebase
        .firestore()
        .collection("users")
        .doc(currentUserId)
        .update({
          connections: firebase.firestore.FieldValue.arrayUnion(userId),
        });

      //removing the data from the connections requests array
      //we nedd the message thing too in order to completely remove the object from the array
      await firebase
        .firestore()
        .collection("users")
        .doc(currentUserId)
        .update({
          connectionRequestsReceived: firebase.firestore.FieldValue.arrayRemove(
            { userId, profileUrl, headline, fullName, message }
          ),
        });

      //updating the other part of the data
      return firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .update({
          connections: firebase.firestore.FieldValue.arrayUnion(currentUserId),
        });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries("userInfo");
      },
    }
  );
};
