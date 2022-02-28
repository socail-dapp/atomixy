import useComment from "@/helpers/store/useComment";
import React from "react";
import Button from "../Button";
import Input from "../forms/Input";
import InfoBeta from "../InfoBeta";

export default function Reply() {
  const { reply, replyTo } = useComment();
  return (
    <div className="fixed z-30 rounded-md p-4 border backdrop-blur-sm w-full md:w-1/2 right-0 bottom-3">
      <div className="text-lg text-gray-700 font-semibold flex row">
        {!!reply ? `Reply` : `Comment`} <InfoBeta />{" "}
      </div>
      <Input
        // label={`Comment as`}
        onChange={(title: string) => {}}
        style={{ minHeight: 60 }}
        value={reply}
        multiline
        isArea
      />
      <br />
      <Button className={`float-right`}>{!!reply ? `Reply` : `Comment`}</Button>
      {!!reply && (
        <div
          onClick={() => replyTo(null)}
          className="float-right mr-6 mt-1 cursor-pointer"
        >
          Cancel
        </div>
      )}
    </div>
  );
}
