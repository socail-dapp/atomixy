import type { NextPage } from "next";
import Head from "next/head";
import useFetch from "@/helpers/hooks/useFetch";
import Wrapper from "@/components/tools/Wrapper";
import { useEffect, useState } from "react";
import { ICommit } from "@/helpers/types";
import useWallet from "@/helpers/hooks/useWallet";
import moment from "moment";
import store from "store";
import ButtonVersions from "@/components/versions/ButtonVersions";

export default ({ cookies }) => {
  const { data, loading, setVersion, selectedVersion } = useFetch();

  console.log(data, loading, "usefecttcch in slug");
  const [expandVersion, setExpandVersion] = useState(false);
  //ONLY SHOWS THE CURRENT ONE

  return (
    <div className="w-full h-full">
      {/* <div className="absolute">
        information to click (authority: current version)
      </div> */}
      <div className="absolute  w-full z-20">
        <ButtonVersions
          {...{
            selectedVersion,
            // data,
            onChange: (v) => setVersion(v),
          }}
        />
      </div>
      {/* <div className="absolute modal border p-3 bg-amber-200  z-50 right-1/2">
        <button
          onClick={() => {
            console.log("expand click");
            setExpandVersion(!expandVersion);
          }}
        >
          Versions click: currentVersion {selectedVersion?.sequence}
        </button>

        {expandVersion && (
          <VersionTab
            {...{
              data,
              onChange: (v) => setVersion(v),
            }}
          />
        )}
      </div> */}

      {loading && (
        <div className="backdrop-blur-sm  text-3xl z-30 absolute w-full h-full cursor-wait grid place-items-center text-white">
          loading...
        </div>
      )} 


        <Wrapper
          {...{ data: selectedVersion, isEdit: false, isCreate: false }}
        />

    </div>
  );
};

// const VersionTab = ({ data, onChange }) => {
//   const { data: dataWallet } = useWallet();

//   // item as currentFlow
//   const onApprove = async (item: ICommit) => {
//     //show modal -> approving this flow as a main?
//     //transaction
//     // if current is already matched-> cannot add

//     const ACCOUNT = dataWallet?.accountId;

//     const approvedCommit = {
//       ...item,
//       approvedBy: ACCOUNT,
//       approvedAt: moment().unix(),
//     };

//     // add approved commit to main versions track
//     const versions = data?.versions;
//     versions.unshift(approvedCommit);

//     const payloadFlow = {
//       ...data,
//       currentVersion: approvedCommit,
//       updatedBy: ACCOUNT,
//       updatedAt: moment().unix(),
//       sequence: item?.sequence,
//       versions,
//     };

//     try {
//       await store.set("flows", payloadFlow);
//       alert("Success approving new version");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="bg-blue-300">
//       {/* <div>current version: {data?.sequence}
//                 &nbsp;  &nbsp;
//                 {<button
//                     onClick={() => onChange(data?.currentSource)}
//                 >Change to this version</button>}
//             </div> */}
//       <br />
//       <div className="border-rose-300 bg-stone-400">
//         {" "}
//         version sugggested:
//         <br />
//         {data?.versionSuggested?.map((item, i) => (
//           <div onClick={() => onChange(item)} className="border-lime-300">
//             createdBy: {item?.createdBy}, {item?.sequence}
//             &nbsp; &nbsp;
//             <button onClick={() => onApprove(item)}>
//               Approve to this version
//             </button>
//             <br />
//           </div>
//         ))}
//       </div>
//       <br />
//       <br />
//       <div className="border-red-600 bg-purple-400">
//         {" "}
//         history:
//         <br />
//         {data?.versions?.map((item, i) => (
//           <div onClick={() => onChange(item)} className="border-lime-300">
//             createdBy: {item?.createdBy}, {item?.sequence}
//             &nbsp; &nbsp;
//             <button onClick={() => onApprove(item)}>
//               Approve to this version
//             </button>
//             <br />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// border displaying it's matched  with current version + button to change the version
// const ListVersion

// export async function getServerSideProps({ req, res }) {
//     // Create a cookies instance
//     const cookies = new Cookies(req, res)
//     // Get a cookie
//     const curr = cookies.get('flows')
//     // Set a cookie
//     // console.log(JSON.parse(curr), 'curr')
//     return {
//         props: {
//             cookies: curr
//         }
//     }
// }
