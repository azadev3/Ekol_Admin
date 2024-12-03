import axios from "axios";
import React from "react";
import { URL } from "../Base";

export interface userInterface {
  _id: string;
  name_surname: string;
  email: string;
  user_role: string;
}

export const useUserInfos = () => {
  const [user, setUser] = React.useState<userInterface[]>([]);

  const getUser = async () => {
    try {
      const res = await axios.get(`${URL}/create_new_user`);

      if (res.data) {
        setUser(res.data);
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    user,
    getUser,
  };
};
