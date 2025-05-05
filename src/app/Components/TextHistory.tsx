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
    <div className="w-full h-5/6  ">
      {texthistory.map((messageinfo, index) => {
        console.log(messageinfo.Sender, User, "aaaa");
        const classname =
          messageinfo.Sender === User
            ? "flex flex-row items-end"
            : "flex flex-row-reverse items-start";
        // console.log(classname, messageinfo.Time.getHours());
        const hours = new Date(messageinfo.Time).getHours();
        return messageinfo.Sender === User ? (
          <div className={classname} key={index}>
            <li
              className={
                messageinfo.Sender === User
                  ? "w-auto border-1 rounded-xl h-10 mt-3 flex justify-center px-3 bg-gray-600"
                  : "w-auto border-1 rounded-xl h-10 mt-3 flex justify-center px-3 bg-gray-900"
              }
              // onClick={() => handleClickingPerson(person)}
            >
              {messageinfo.Message}
              <span className="text-xs">{`${hours}`}</span>
            </li>
          </div>
        ) : (
          ""
        );
      })}
    </div>
  );
};

export default TextHistory;
