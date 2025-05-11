"use client";
import React, { useEffect, useState } from "react";
import PersonsInfo from "./Peoplesinfo";
import { cursorTo } from "readline";
import TextHistory from "./TextHistory";
import InputArea from "./InputArea";
import { useUserInfo } from "@/context/userinfo";
import { useAPIcalls } from "@/hooks/APICalls";
import { measureMemory } from "vm";
interface Props {
  list: string[];
  CurrentPerson: string;
}
const TextArea = ({ CurrentPerson, list }: Props) => {
  const [messagelist, setmessagelist] = useState<
    Array<{
      Sender: string;
      Receiver: string;
      Message: string;
      Time: Date;
    }>
  >([]);
  const { userindex } = useUserInfo();
  const { UpdateMessageLogs, FetchMessageLogs } = useAPIcalls();
  async function handlemessage(e: string) {
    var now = new Date();
    // console.log(...messagelist);
    // console.log({
    //   user: list[userindex!],
    //   otherside: CurrentPerson,
    //   time: now,
    //   message: e,
    // });

    const temp = [
      ...messagelist,
      {
        Sender: list[userindex!],
        Receiver: CurrentPerson,
        Time: now,
        Message: e,
      },
    ];
    // console.log(temp);
    setmessagelist(temp);
    UpdateMessageLogs({
      messagehistory: temp,
    });
  }
  useEffect(() => {
    async function getMessageLogs() {
      const temp = await FetchMessageLogs({
        sender: list[userindex!],
        receiver: CurrentPerson,
      });
      console.log(temp);
      //   console.log(temp)
      setmessagelist(temp ? temp : []);
    }
    console.log("changed currentperson");
    if (CurrentPerson) {
      getMessageLogs();
    }
    // setmessagelist(temp);
  }, [CurrentPerson]);
  console.log(messagelist, "this is message list");
  return (
    <div className="h-full w-5/6 bg-neutral-900 flex-col flex">
      <PersonsInfo
        CurrentPerson={CurrentPerson}
        CurrentUser={typeof userindex === "number" ? list[userindex] : ""}
      ></PersonsInfo>
      <TextHistory
        texthistory={messagelist}
        User={typeof userindex === "number" ? list[userindex] : ""}
      ></TextHistory>
      <InputArea handleSendingMessage={(e) => handlemessage(e)}></InputArea>
    </div>
  );
};

export default TextArea;
