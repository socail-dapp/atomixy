import useChart from "@/helpers/hooks/useChart";
import useStore from "@/helpers/store";
import React, { useState } from "react";
import CustomDatePicker from "../CustomDatePicker";
import BarCharts from "./BarCharts";
import CalendarCharts from "./CalendarCharts";
import ChartMenu from "./ChartMenu";
import CircleParkCharts from "./CircleParkCharts";
import LineCharts from "./LineCharts";
import PoolBarCharts from "./PoolBarChart";
import PoolTimelineChart from "./PoolTimelineChart";
import RadarCharts from "./RadarCharts";
import SwarmCharts from "./SwarmCharts";

//change filter-name, not people lol
const people = [{ name: "By Node" }, { name: "By Timeline" }];

export default function ChartTabs({ elements }) {
  const [tabs, setTabs] = useState(0);
  const [selected, setSelected] = useState(people[0]);

  //getCurrentFlow

  return (
    <div className=" w-full h-5/6 mt-10  md:m-0  md:flex md:row ">
      <div className="w-full pb-3 md:w-1/5 flex row gap-2 md:flex-col overflow-x-scroll overflow-y-scroll">
        {/* date range */}
        {/* by timeline, by nodes */}
        {/* donation nodes: bar chart, line chart for timeline */}
        {/* activity/contributions/frequency:  line chart, timeline -> calendar --> *data will be accumulate from logs and versions */}
        {/* contributors: -> Swarm Plot , by nodes...overall */}
        {/* votes: -> circle parking layout (nodes) */}
        {/* views:  */}
        {/* my activity: -> radar chart  */}
        {[
          `Pools`,
          `Frequency`,
          `Contributors`,
          `Votes`,
          `Views`,
          `My Activity`,
        ].map((item, i) => (
          <div
            onClick={() => setTabs(i)}
            className={`p-2 mx-2 rounded-md backdrop-blur-lg ${
              tabs === i && `bg-slate-700`
            }  ${
              tabs === i ? `text-green-400` : `text-white`
            } cursor-pointer   hover:bg-slate-800`}
            key={i}
          >
            {item}
            {/* {i !== 0 && `-MOCKED`} */}
          </div>
        ))}
      </div>
      <div className="w-full text-white" style={{ minHeight: "40vh" }}>
        <div className="px-8 flex row gap-4 justify-between align-middle text-gray-700 z-40 ">
          <ChartMenu {...{ selected, setSelected }} />
          <CustomDatePicker />
        </div>
        <MemoizedChartOptions {...{ tabs, selected, elements }} />
        {/* {tabs === 0 && <BarCharts />}
                {tabs === 1 &&
                    <OnDevelopment>
                        <SwarmCharts />
                    </OnDevelopment>
                } */}
      </div>
    </div>
  );
}

const ChartOptions = ({ tabs = 0, selected, elements }) => {
  const { poolProject } = useChart();
  // console.log(poolProject, 'poolproject')
  // Pools
  if (tabs === 0 && selected?.name === "By Node")
    return <PoolBarCharts {...{ data: poolProject }} />;
  if (tabs === 0 && selected?.name === "By Timeline")
    return (
      <OnDevelopment>
        <PoolTimelineChart />
      </OnDevelopment>
    );

  // Frequency
  if (tabs === 1 && selected?.name === "By Node")
    return (
      <OnDevelopment>
        <LineCharts />
      </OnDevelopment>
    );
  if (tabs === 1 && selected?.name === "By Timeline")
    return (
      <OnDevelopment>
        <CalendarCharts />
      </OnDevelopment>
    );

  // Contributors people
  if (tabs === 2 && selected?.name === "By Node")
    return (
      <OnDevelopment>
        <SwarmCharts />
      </OnDevelopment>
    );
  if (tabs === 2 && selected?.name === "By Timeline")
    return (
      <OnDevelopment>
        <SwarmCharts />
      </OnDevelopment>
    );

  // Votes, comments
  if (tabs === 3 && selected?.name === "By Node")
    return (
      <OnDevelopment>
        <CircleParkCharts />
      </OnDevelopment>
    );
  if (tabs === 3 && selected?.name === "By Timeline")
    return (
      <OnDevelopment>
        <CircleParkCharts />
      </OnDevelopment>
    );

  // Views, country? analytics?
  if (tabs === 4 && selected?.name === "By Node")
    return (
      <OnDevelopment>
        <LineCharts />
      </OnDevelopment>
    );
  if (tabs === 4 && selected?.name === "By Timeline")
    return (
      <OnDevelopment>
        <LineCharts />
      </OnDevelopment>
    );

  // My Activity
  if (tabs === 5 && selected?.name === "By Node")
    return (
      <OnDevelopment>
        <RadarCharts />
      </OnDevelopment>
    );
  if (tabs === 5 && selected?.name === "By Timeline")
    return (
      <OnDevelopment>
        <RadarCharts />
      </OnDevelopment>
    );

  return <div className="text-6xl m-20">Something wrong</div>;
};
const MemoizedChartOptions = React.memo(ChartOptions);

const OnDevelopment = ({ children }) => {
  return (
    <>
      <div className=" absolute w-auto h-auto text-red-900 text-sm z-40 mt-2 mx-8">
        *On Development for V3-BETA, data is mocked up
      </div>
      {children}
    </>
  );
};
