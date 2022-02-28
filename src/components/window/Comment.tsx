import useComment from "@/helpers/store/useComment";
import React from "react";
export default () => {
  return (
    <div>
      <br />
      <div className="w-full  border border-slate-300" />
      {MOCK_COMMENTS.map((item, i) => (
        <Comments key={i} {...{ item }} />
      ))}

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

const Comments = ({ item }) => {
  const { replyTo } = useComment();

  return (
    <div className="w-full my-4 pb-2 flex row">
      <div className="col-span-1 pr-2">
        <div
          className="rounded-full  bg-red-400"
          style={{ height: 36, width: 36 }}
        >
          {" "}
        </div>
      </div>
      <div className="col-span-auto w-full ">
        <div className=" text-md mb-1 text-gray-700 font-semibold">
          {item?.name}
        </div>
        <div className=" text-sm mb-2 text-gray-500 font-normal">
          {item?.comments}
        </div>
        <div className="flex row mx-0 cursor-pointer">
          <UpArrow />{" "}
          <div className="mr-2 text-green-600 text-sm font-semibold ">
            {item?.upvotes}
          </div>{" "}
          <DownArrow /> &nbsp; &nbsp;
          {[`Reply`, `Share`].map((_, i) => (
            <div
              onClick={() => {
                if (i === 0) {
                  replyTo(`@${item?.name}`);
                }
              }}
              key={i}
              className="mr-2 text-gray-600 text-sm"
            >
              {_}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const UpArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="green"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
      clipRule="evenodd"
    />
  </svg>
);
const DownArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="darkred"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
      clipRule="evenodd"
    />
  </svg>
);

const MOCK_COMMENTS = [
  {
    name: "No_brain_no_life",
    comments: `Most people from both countries dislike the conflict. They don't care about about Putin's weird ideas or goals. Are there Russians and Ukrainians who dislike the other? Sure. I find that most just dislike Putin.`,
    upvotes: 200,
  },
  {
    name: "No_brain_no_life",
    comments: `Most people from both countries dislike the conflict. They don't care about about Putin's weird ideas or goals. Are there Russians and Ukrainians who dislike the other? Sure. I find that most just dislike Putin.`,
    upvotes: 200,
  },
  {
    name: "No_brain_no_life",
    comments: `Most people from both countries dislike the conflict. They don't care about about Putin's weird ideas or goals. Are there Russians and Ukrainians who dislike the other? Sure. I find that most just dislike Putin.`,
    upvotes: 200,
  },
  {
    name: "No_brain_no_life",
    comments: `Most people from both countries dislike the conflict. They don't care about about Putin's weird ideas or goals. Are there Russians and Ukrainians who dislike the other? Sure. I find that most just dislike Putin.`,
    upvotes: 200,
  },
  {
    name: "No_brain_no_life",
    comments: `Most people from both countries dislike the conflict. They don't care about about Putin's weird ideas or goals. Are there Russians and Ukrainians who dislike the other? Sure. I find that most just dislike Putin.`,
    upvotes: 200,
  },
  {
    name: "No_brain_no_life",
    comments: `Most people from both countries dislike the conflict. They don't care about about Putin's weird ideas or goals. Are there Russians and Ukrainians who dislike the other? Sure. I find that most just dislike Putin.`,
    upvotes: 200,
  },
  {
    name: "No_brain_no_life",
    comments: `Most people from both countries dislike the conflict. They don't care about about Putin's weird ideas or goals. Are there Russians and Ukrainians who dislike the other? Sure. I find that most just dislike Putin.`,
    upvotes: 200,
  },
  {
    name: "No_brain_no_life",
    comments: `Most people from both countries dislike the conflict. They don't care about about Putin's weird ideas or goals. Are there Russians and Ukrainians who dislike the other? Sure. I find that most just dislike Putin.`,
    upvotes: 200,
  },
];
