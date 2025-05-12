import React from "react";
interface Props {
  CurrentPerson: string;
  CurrentUser: string;
}
const PersonsInfo = ({ CurrentPerson, CurrentUser }: Props) => {
  return (
    <div className="w-full h-1/12 bg-neutral-600 flex justify-center items-center">
      {CurrentUser} ----{">"}
      {CurrentPerson}
    </div>
  );
};

export default PersonsInfo;
