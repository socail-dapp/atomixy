import useWindow from "@/helpers/store/useWindow";
import React, { useState } from "react";
import Button from "../Button";
import Input from "../forms/Input";
import { PanelWrapper } from "./TabWrapper";
import Tags from "./Tags";

// edit mode
export default function Detail({ isEdit = false, detail, _updateDetail }) {
  return (
    <PanelWrapper>
      <div>
        {/* this title will display on the flow
            <Input
                label={`Displayed Title*`}
                onChange={(title: string) => setState({ ...state, title })}
            />
            <br /> */}
        <Input
          label={`Title*`}
          value={detail?.title}
          onChange={(title: string) => {
            _updateDetail(
              "title",
              title,
              "titleCapsule",
              title?.substring(0, 20)
            );
          }}
        />
        <br />

        {/* TODO: change to markdown */}
        <Input
          label={`Description*`}
          onChange={(title: string) => _updateDetail("description", title)}
          style={{ minHeight: 200 }}
          multiline
          isArea
          value={detail?.description}
        />
        <br />
        {isEdit && (
          <>
            <Input label={`Reason to edit`} onChange={(title: string) => {}} />
            <br />
          </>
        )}
        <div className="w-full flex row justify-between align-middle">
          <Tags />
        </div>

        {/* float comments */}
      </div>
    </PanelWrapper>
  );
}

const options = [`EDIT`, `DONATE`, `SHARE`];

// todo: mockup POOLS, charts, contributors
export const DetailDisplay = ({ setEdit, detail }) => {
  const [state, setState] = useState({
    title: `The Primal Beast Update - Bugs Megathread`,
    description: `Please use this thread to report bugs you've encountered in the Primal Beast / 7.31 update. Check to see if others have already reported the same issue.
        Godspeed and stay safe fellow Dota brethren. DOTA can be a toxic community but I’m hoping people band together to help our brothers in these shitty times…
        `,
    // random
    tags: [`Bug`, `Reports`, `Crypto`],
  });

  const { setEditWindow, isEditWindow } = useWindow();

  return (
    <div>
      <div className=" text-2xl text-gray-700 font-semibold">
        {detail?.title}
      </div>
      <div className="flex row mx-0">
        {state?.tags?.map((item, i) => (
          <div
            key={i}
            className="bg-slate-400 my-3 mr-2 px-3 text-white text-xs"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="text-base text-gray-600 font-normal">
        {detail?.description}
      </div>

      <div className="flex row mx-0">
        {options?.map((item, i) => (
          <div
            onClick={() => {
              if (item === "EDIT") {
                setEditWindow(true);
                setEdit();
              }
            }}
            key={i}
            className="my-3 mr-2 pr-3 text-blue-600 text-sm cursor-pointer"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
