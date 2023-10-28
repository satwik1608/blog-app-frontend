import React, { useEffect, useMemo, useState } from "react";
import { getCurrentUser } from "./services/authService";
import { getAuthorId } from "./services/apiService";
import { useQuery } from "react-query";

const UserContext = React.createContext(null);

export const UserProvider = (props) => {
  const [id, setId] = React.useState(0);
  console.log("WE are where");
  console.log("The author is", id);

  useEffect(() => {
    async function fetchData() {
      const currentUser = getCurrentUser();
      // const auth2 = await getAuthorId(currentUser.username);
      // const auth = await getAuthorId(currentUser.username);
      // console.log("2 - Check it when it comes");
      // console.log("Business Stuff", currentUser, auth.data);
      setId({
        _id: "cldszd9qr00012wuueiwbf2c9",
        name: "Satwik",
        username: "annhilator",
        email: "minimilitiapro6@gmail.com",
        category: [],
        password:
          "$2b$10$8upbJMf49P1HiDIAMXTzDO2rHTjAuyMn2K554MSASykZEaW.SV2lO",
        blogs: [
          "cldszl3740000p0uuf45g9zo9",
          "clf3m4zsq00001amgczysh2a7",
          "clf3mog35000019mn7z410vzj",
          "clfjyr8ua00007suug863b2zr",
          "clfumpejd0000msuueatmahbv",
          "clg4phtu9000018mt8txgbnjz",
          "clg4pib9c000118mth9pu9k17",
        ],
        liked: [
          "cldunui3a000019mn97nz2dur",
          "cldunukhd000019lggmlbhiin",
          "cldyq9u9g00011amf4v652vft",
          "cldunugvy000017l169mn8hr5",
          "cldw0sc2y000018mde9rr01ns",
          "clfjyr8ua00007suug863b2zr",
          "clf57jni1000018mja3qo4uw0",
          "clfumpejd0000msuueatmahbv",
          "clg4pib9c000118mth9pu9k17",
          "clg2osfyx000018l21s9mg11g",
        ],
        lists: [
          "cldw0sc2y000018mde9rr01ns",
          "cldyq9u9g00011amf4v652vft",
          "clf57jni1000018mja3qo4uw0",
          "clg2osfyx000018l21s9mg11g",
          "clg4pib9c000118mth9pu9k17",
        ],
        following: [
          "clduj079v000019mma1l95i0v",
          "cle14h6e8000019kycb1lbjko",
          "cldvn4007000019mpe1rp7r69",
          "clf54srws000019jdhslx0otk",
          "clfg7sbuw000019mj2dbw70fg",
          "cleo5vsz400001amm0be8emu9",
          "cldug2ehf000019ma5o9detjr",
          "clf55gr7z000218lbh6w7f6yg",
          "clfsf0cja000019mf3f9s5q4d",
          "clfugzr4d000019l6bw04gwxf",
          "cldypgbql000018l67fzh2i02",
          "clfjznga5000019lee8fygk6y",
          "clg2jeiaf000019jk3kmaeswj",
          "clf56dno1000019l56a7418bz",
          "cldyphqyg00001amfe0a09dp7",
          "clg2gylfd00004fmub6tjc8t9",
          "clg2nsr6b000018l3ccqlb39m",
          "cldvob843000019mg44uxd1e0",
          "clkxwpd7p00010sjm50mqcmj7",
        ],
        followers: [
          "cldug2ehf000019ma5o9detjr",
          "cldvn4007000019mpe1rp7r69",
          "cldvob843000019mg44uxd1e0",
          "clfsf0cja000019mf3f9s5q4d",
          "clg2gylfd00004fmub6tjc8t9",
          "clg2nsr6b000018l3ccqlb39m",
        ],
        __v: { $numberInt: "193" },
        imgThumb:
          "https://firebasestorage.googleapis.com/v0/b/image-uploader-9d58d.appspot.com/o/authorImg%2FWhatsApp%20Image%202023-02-07%20at%201.15.13%20AM.PNG12838444-2b54-4517-845b-e664179b67c2?alt=media&token=7486ece6-53d4-4d82-85e7-43f1d1e6143d",
        description: "Give up on your dreams and die\n",
        profession: "Web developer",
        verified: true,
      });
    }
    console.log("Check it when it comes");
    console.log("1.5 - Check it when it comes");
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ id, setId }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
