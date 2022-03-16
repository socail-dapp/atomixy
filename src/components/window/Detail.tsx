import useSelectContract from "@/helpers/hooks/useSelectContract";
import useFlow from "@/helpers/store/useFlow";
import useWindow from "@/helpers/store/useWindow";
import { ethers } from "ethers";
import React, { useCallback, useState } from "react";
import Button from "../Button";
import Input from "../forms/Input";
import ModalDialog from "../ModalDialog";
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
          onChange={(value: string) => _updateDetail("description", value)}
          style={{ minHeight: 200 }}
          multiline
          isArea
          value={detail?.description}
        />
        <br />

        {/* v2: system vest the grants? -> using system address */}
        <Input
          label={`Pool Address (optional)`}
          onChange={(value: string) => _updateDetail("poolAddress", value)}
          value={detail?.poolAddress}
        />
        {/* add: paste/clipboard */}
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

const options = [`EDIT`, `GRANT`, `SHARE`];

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

  const [isOpened, setOpen] = useState(false);

  function onOpen() {
    setOpen(true);
  }
  function onClose() {
    setOpen(false);
  }

  const [amount, setAmount] = useState<number>(0);

  // get nodeId

  const _contract = useSelectContract();
  const { key } = useFlow();
  // const parsedAmount = ethers.utils.parseEther("4")

  const onGrant = useCallback(async () => {
    if (!_contract) return alert("Connect wallet");
    if (amount < 0) return alert("amount is way too small?");
    // console.log(_contract, 'contract',
    //   detail?.poolAddress,
    //   ethers.utils.parseEther(String(amount)), //parsed
    //   Number(key),
    //   detail?.id
    // )
    console.log(_contract, 'USEELECT',

      detail?.poolAddress,
      ethers.utils.parseEther(String(amount)), //parsed
      Number(key),
      detail?.id
    )

    try {
      const tx = await _contract?.sendMoney(
        detail?.poolAddress,
        ethers.utils.parseEther(String(amount)), //parsed
        Number(key),
        detail?.id
        // address payable receiver, uint256 amount, uint256 _projectId, string memory _nodeId
      );

      console.log(`Loading - ${tx.hash}`);
      await tx.wait();
      console.log(`Success - ${tx.hash}`);
      onClose();
      alert(`Success - ${tx.hash}`);
    } catch (error) {
      console.log(error, "error grant");
      onClose();
      alert("Something error, perhaps wrong network? or pool Address is empty?");
    }
  }, [_contract, key, amount, detail]);

  return (
    <div>
      <ModalDialog
        title={`Grant this section`}
        // desc={`Are you sure you want to save this Flow?`}
        // confirmText
        onConfirm={() => {
          onGrant();
        }}
        {...{
          onClose,
          onOpen,
          isOpened,
        }}
        hasChildren
      >
        <div className="my-2">
          <Input
            //TODO: number only
            label={`set number (ETH)`}
            onChange={(v: any) => {
              setAmount(v);
            }}
            value={amount}
            // onKeyPress={(event) => {
            //   if (!/\d+((\.|,)\d+)?/.test(event.key)) {
            //     event.preventDefault()
            //   }
            // }}
            type="number"
            pattern="^(\d*\.)?\d+$"
          />

          <br />
        </div>
      </ModalDialog>

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

              if (item === "GRANT") {
                //open modal for grant
                onOpen();
              }
            }}
            key={i}
            className="my-3 mr-2 pr-3 text-blue-600 text-sm cursor-pointer"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Donate/Tips/Fund/Grant */}
    </div>
  );
};
