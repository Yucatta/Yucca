import React from "react";
interface Props {
  texthistory: Array<{
    Sender: string;
    Receiver: string;
    Message: string;
    Time: Date;
  }>;
}
const TextHistory = ({ texthistory }: Props) => {
  return (
    <div className="w-full h-5/6 flex items-end flex-col justify-center">
      {texthistory.map((messageinfo, index) => {
        return (
          <li
            key={index}
            className="w-auto border-1 rounded-xl h-10 mt-3 flex justify-center px-3 bg-green-900"
            // onClick={() => handleClickingPerson(person)}
          >
            {messageinfo.Message}
          </li>
        );
      })}
    </div>
  );
};

export default TextHistory;
