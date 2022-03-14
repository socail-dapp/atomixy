import { ResponsiveLine } from "@nivo/line";

export default ({ data = mock_data /* see data tab */ }) => (
  <ResponsiveLine
    data={_randomData()}
    lineWidth={1}
    enableGridX={false}
    enableGridY={false}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    // axisBottom={{
    //     orient: 'bottom',
    //     tickSize: 5,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: 'transportation',
    //     legendOffset: 36,
    //     legendPosition: 'middle'
    // }}
    axisLeft={{
      // orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "count",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    pointSize={1}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

const _randomData = () =>
  Array.from({ length: Math.floor(Math.random() * 8) + 1 }, (_, i) => ({
    id: Math.random().toString(5).substring(3),
    data: Array.from({ length: 31 }, (_, i) => ({
      x: `${i + 1}`,
      y: Math.floor(Math.random() * 1000) + 1,
    })),
  }));

console.log(_randomData());

const mock_data = [
  {
    id: "japan",
    color: "hsl(127, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 1,
      },
      {
        x: "helicopter",
        y: 124,
      },
      {
        x: "boat",
        y: 126,
      },
      {
        x: "train",
        y: 137,
      },
      {
        x: "subway",
        y: 193,
      },
      {
        x: "bus",
        y: 85,
      },
      {
        x: "car",
        y: 274,
      },
      {
        x: "moto",
        y: 143,
      },
      {
        x: "bicycle",
        y: 133,
      },
      {
        x: "horse",
        y: 277,
      },
      {
        x: "skateboard",
        y: 42,
      },
      {
        x: "others",
        y: 230,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(87, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 172,
      },
      {
        x: "helicopter",
        y: 198,
      },
      {
        x: "boat",
        y: 9,
      },
      {
        x: "train",
        y: 233,
      },
      {
        x: "subway",
        y: 152,
      },
      {
        x: "bus",
        y: 203,
      },
      {
        x: "car",
        y: 125,
      },
      {
        x: "moto",
        y: 199,
      },
      {
        x: "bicycle",
        y: 69,
      },
      {
        x: "horse",
        y: 133,
      },
      {
        x: "skateboard",
        y: 188,
      },
      {
        x: "others",
        y: 159,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(40, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 166,
      },
      {
        x: "helicopter",
        y: 172,
      },
      {
        x: "boat",
        y: 145,
      },
      {
        x: "train",
        y: 12,
      },
      {
        x: "subway",
        y: 126,
      },
      {
        x: "bus",
        y: 187,
      },
      {
        x: "car",
        y: 208,
      },
      {
        x: "moto",
        y: 81,
      },
      {
        x: "bicycle",
        y: 198,
      },
      {
        x: "horse",
        y: 170,
      },
      {
        x: "skateboard",
        y: 270,
      },
      {
        x: "others",
        y: 20,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(263, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 83,
      },
      {
        x: "helicopter",
        y: 291,
      },
      {
        x: "boat",
        y: 68,
      },
      {
        x: "train",
        y: 281,
      },
      {
        x: "subway",
        y: 138,
      },
      {
        x: "bus",
        y: 263,
      },
      {
        x: "car",
        y: 91,
      },
      {
        x: "moto",
        y: 242,
      },
      {
        x: "bicycle",
        y: 268,
      },
      {
        x: "horse",
        y: 255,
      },
      {
        x: "skateboard",
        y: 286,
      },
      {
        x: "others",
        y: 37,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(21, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 105,
      },
      {
        x: "helicopter",
        y: 168,
      },
      {
        x: "boat",
        y: 104,
      },
      {
        x: "train",
        y: 10,
      },
      {
        x: "subway",
        y: 59,
      },
      {
        x: "bus",
        y: 271,
      },
      {
        x: "car",
        y: 172,
      },
      {
        x: "moto",
        y: 68,
      },
      {
        x: "bicycle",
        y: 135,
      },
      {
        x: "horse",
        y: 81,
      },
      {
        x: "skateboard",
        y: 193,
      },
      {
        x: "others",
        y: 37,
      },
    ],
  },
];
