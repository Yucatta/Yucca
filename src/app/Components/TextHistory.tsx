import React from "react";
interface Props {
  texthistory: Array<{
    Sender: string;
    Receiver: string;
    Message: string;
    Time: Date;
  }>;
  User: string;
}
const TextHistory = ({ texthistory, User }: Props) => {
  return (
    <div className="w-full h-5/6 flex flex-col ">
      {texthistory.map((messageinfo, index) => {
        console.log(messageinfo.Sender, User, "aaaa");
        // cons;ole.log(classname, messageinfo.Time.getHours());
        const date = new Date(messageinfo.Time);
        // const hours = new Date(messageinfo.Time).getHours();
        // const minutes = new Date(messageinfo.Time).getHours();
        const leftrem = messageinfo.Message.length * 4;
        console.log(leftrem);
        console.log(
          `text-xs relative left-[${messageinfo.Message.length}px] top-6 text-neutral-400`
        );
        return messageinfo.Sender === User ? (
          <div className={"flex flex-col items-end"} key={index}>
            <li
              className={
                "w-auto border-1 rounded-xl h-10 mt-3 flex justify-center px-3 bg-gray-600"
              }
              // onClick={() => handleClickingPerson(person)}
            >
              {messageinfo.Message}
              <span
                className={`text-xs relative  top-6 text-neutral-400`}
                // style={{ left: `${leftrem * 1.5 + 30}px` }}
              >{`${date.getHours()}:${date.getMinutes()}`}</span>
            </li>
          </div>
        ) : (
          <div className={"flex  "} key={index}>
            <li
              className={
                "w-auto border-1  rounded-xl h-10 mt-3 flex justify-center px-3 bg-gray-900"
              }
              // onClick={() => handleClickingPerson(person)}
            >
              <span>{messageinfo.Message}</span>
              <span
                //    right-[${messageinfo.Message.length}rem]
                className={`text-xs relative top-6  text-neutral-400`}
                // style={{ left: `${leftrem * 1.5 + 30}px` }}
              >{`${date.getHours()}:${date.getMinutes()}`}</span>
            </li>
          </div>
        );
      })}
    </div>
  );
};

export default TextHistory;
