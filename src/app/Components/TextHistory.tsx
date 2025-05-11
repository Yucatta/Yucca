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
        const date = new Date(messageinfo.Time);
        const prevdate = new Date(
          texthistory[index - 1 > -1 ? index - 1 : index].Time
        );
        return (
          <div
            className={
              messageinfo.Sender === User
                ? "flex flex-col items-end"
                : "flex flex-col items-start"
            }
            key={index}
          >
            {date.getDate() + date.getMonth() + date.getFullYear() ===
            prevdate.getDate() +
              prevdate.getMonth() +
              prevdate.getFullYear() ? (
              ""
            ) : (
              <div className="self-center w-auto h-auto p-2 bg-neutral-700 rounded-lg">
                {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
              </div>
            )}
            <li
              className={
                messageinfo.Sender === User
                  ? "w-auto border-1 rounded-xl h-10 mt-3 flex justify-center px-3 bg-gray-600"
                  : "w-auto border-1  rounded-xl h-10 mt-3 flex justify-center px-3 bg-gray-900"
              }
            >
              {messageinfo.Message}
              <span
                className={`text-xs relative  top-6 text-neutral-400`}
                // style={{ left: `${leftrem * 1.5 + 30}px` }}
              >{`${date.getHours()}:${date.getMinutes()}`}</span>
            </li>
          </div>
        );
        // messageinfo.Sender === User ? (
        //   ""
        // ) : (
        //   <div className={"flex  "} key={index}>
        //     {date.getDate() + date.getMonth() + date.getFullYear() ===
        //     prevdate.getDate() +
        //       prevdate.getMonth() +
        //       prevdate.getFullYear() ? (
        //       ""
        //     ) : (
        //       <div className="self-center h-10 text-xs">
        //         {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
        //       </div>
        //     )}
        //     <li
        //       className={
        //         "w-auto border-1  rounded-xl h-10 mt-3 flex justify-center px-3 bg-gray-900"
        //       }
        //     >
        //       <span>{messageinfo.Message}</span>
        //       <span
        //         className={`text-xs relative top-6  text-neutral-400`}
        //         // style={{ left: `${leftrem * 1.5 + 30}px` }}
        //       >{`${date.getHours()}:${date.getMinutes()}`}</span>
        //     </li>
        //   </div>
        // );
      })}
    </div>
  );
};

export default TextHistory;
