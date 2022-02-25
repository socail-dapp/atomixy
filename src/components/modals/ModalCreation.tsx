import useStore from "@/helpers/store";
import React, { useState } from "react";
import Button from "../Button";
import Input from "../forms/Input";
import VerticalSelect from "../forms/RadioGroup";

export default function ModalCreation() {
  const { addFlow, closeModal } = useStore();
  const [state, setState] = useState({
    title: null,
    description: null,
  });
  return (
    <div className="p-5 bg-gray-200 border-white border rounded-md md:w-2/3">
      <h2 className="font-bold  text-3xl text-gray-700">Create Project</h2>
      <p className="text-gray-400 mb-5">
        Tell us, what's the name of flow/project/map
      </p>
      <br />

      <div className="w-full xl:w-1/2">
        <Input
          label={`Title*`}
          onChange={(title: string) => setState({ ...state, title })}
        />
        <br />
        <Input
          label={`Description*`}
          onChange={(description: string) =>
            setState({ ...state, description })
          }
        />
        <br />
        <VerticalSelect
          value={authority[0]}
          label="Authority"
          onChange={() => {}}
          options={authority}
        />
      </div>
      <br />
      <br />
      <Button
        className={``}
        onClick={() => {
          addFlow({
            ...default_flow,
            state,
          });
          closeModal();
        }}
      >
        Create
      </Button>
    </div>
  );
}
// title, description
// fix: private/public, authority:
const authority = [
  {
    name: "Owner",
    description: "Only project owner can approve the update submission",
    value: 1,
  },
  {
    name: "DAO",
    value: 2,
    description: "DAO will control the versions. \n*Currently not available",
  },
];

const default_commit: ICommit = {
  type: "create", // tips // edit // create
  description: "",
  title: "",
  createdBy: "",
  createdAt: null,
  approvedAt: null,
  approvedBy: null,
  sequence: 0,
  elements: [],
  pools: [], //grant or bounty pools ??
  //prevSequenceArray ? so I can identify from which upgrade
};

const default_flow = {
  title: "just created",
  description: "",
  status: "public",
  versions: [
    // default_commit
  ], //first one is current
  versionSuggested: [], //first one is last updated
  versionByUser: {
    // [user]: []
  },
  currentVersion: default_commit,
  createdAt: "",
  createdBy: "",
  updatedAt: "",
  updatedBy: "", //lastUpda
  sequence: 0, // --> verrsions.length
  // pools: [] //grant or bounty pools --> maybe split it not by []
  poolsId: null,
  versionGrants: [], //--> only for grants
};
