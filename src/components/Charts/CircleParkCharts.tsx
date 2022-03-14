import { ResponsiveCirclePacking } from "@nivo/circle-packing";

export default ({ data = mock_data /* see data tab */ }) => (
  <ResponsiveCirclePacking
    data={data}
    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    id="name"
    value="loc"
    colors={{ scheme: "nivo" }}
    childColor={{
      from: "color",
      modifiers: [["brighter", 0.4]],
    }}
    padding={4}
    enableLabels={true}
    labelsFilter={function (n) {
      return 2 === n.node.depth;
    }}
    labelsSkipRadius={10}
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.5]],
    }}
    defs={[
      {
        id: "lines",
        type: "patternLines",
        background: "none",
        color: "inherit",
        rotation: -45,
        lineWidth: 5,
        spacing: 8,
      },
    ]}
    fill={[
      {
        match: {
          depth: 1,
        },
        id: "lines",
      },
    ]}
  />
);

const mock_data = {
  name: "nivo",
  color: "hsl(163, 70%, 50%)",
  children: [
    {
      name: "viz",
      color: "hsl(171, 70%, 50%)",
      children: [
        {
          name: "stack",
          color: "hsl(158, 70%, 50%)",
          children: [
            {
              name: "cchart",
              color: "hsl(173, 70%, 50%)",
              loc: 23064,
            },
            {
              name: "xAxis",
              color: "hsl(150, 70%, 50%)",
              loc: 32409,
            },
            {
              name: "yAxis",
              color: "hsl(249, 70%, 50%)",
              loc: 134122,
            },
            {
              name: "layers",
              color: "hsl(52, 70%, 50%)",
              loc: 88997,
            },
          ],
        },
        {
          name: "ppie",
          color: "hsl(123, 70%, 50%)",
          children: [
            {
              name: "chart",
              color: "hsl(147, 70%, 50%)",
              children: [
                {
                  name: "pie",
                  color: "hsl(153, 70%, 50%)",
                  children: [
                    {
                      name: "outline",
                      color: "hsl(164, 70%, 50%)",
                      loc: 142951,
                    },
                    {
                      name: "slices",
                      color: "hsl(336, 70%, 50%)",
                      loc: 12456,
                    },
                    {
                      name: "bbox",
                      color: "hsl(90, 70%, 50%)",
                      loc: 184794,
                    },
                  ],
                },
                {
                  name: "donut",
                  color: "hsl(307, 70%, 50%)",
                  loc: 144453,
                },
                {
                  name: "gauge",
                  color: "hsl(15, 70%, 50%)",
                  loc: 16567,
                },
              ],
            },
            {
              name: "legends",
              color: "hsl(268, 70%, 50%)",
              loc: 12165,
            },
          ],
        },
      ],
    },
    {
      name: "colors",
      color: "hsl(251, 70%, 50%)",
      children: [
        {
          name: "rgb",
          color: "hsl(18, 70%, 50%)",
          loc: 153914,
        },
        {
          name: "hsl",
          color: "hsl(145, 70%, 50%)",
          loc: 14264,
        },
      ],
    },
    {
      name: "utils",
      color: "hsl(83, 70%, 50%)",
      children: [
        {
          name: "randomize",
          color: "hsl(38, 70%, 50%)",
          loc: 193405,
        },
        {
          name: "resetClock",
          color: "hsl(260, 70%, 50%)",
          loc: 190260,
        },
        {
          name: "noop",
          color: "hsl(187, 70%, 50%)",
          loc: 116420,
        },
        {
          name: "tick",
          color: "hsl(94, 70%, 50%)",
          loc: 120920,
        },
        {
          name: "forceGC",
          color: "hsl(46, 70%, 50%)",
          loc: 31227,
        },
        {
          name: "stackTrace",
          color: "hsl(259, 70%, 50%)",
          loc: 152265,
        },
        {
          name: "dbg",
          color: "hsl(151, 70%, 50%)",
          loc: 56182,
        },
      ],
    },
    {
      name: "generators",
      color: "hsl(203, 70%, 50%)",
      children: [
        {
          name: "address",
          color: "hsl(117, 70%, 50%)",
          loc: 32049,
        },
        {
          name: "city",
          color: "hsl(223, 70%, 50%)",
          loc: 181674,
        },
        {
          name: "animal",
          color: "hsl(173, 70%, 50%)",
          loc: 83054,
        },
        {
          name: "movie",
          color: "hsl(97, 70%, 50%)",
          loc: 58676,
        },
        {
          name: "user",
          color: "hsl(300, 70%, 50%)",
          loc: 36603,
        },
      ],
    },
    {
      name: "set",
      color: "hsl(332, 70%, 50%)",
      children: [
        {
          name: "clone",
          color: "hsl(218, 70%, 50%)",
          loc: 107761,
        },
        {
          name: "intersect",
          color: "hsl(75, 70%, 50%)",
          loc: 45487,
        },
        {
          name: "merge",
          color: "hsl(56, 70%, 50%)",
          loc: 82449,
        },
        {
          name: "reverse",
          color: "hsl(22, 70%, 50%)",
          loc: 69606,
        },
        {
          name: "toArray",
          color: "hsl(359, 70%, 50%)",
          loc: 54203,
        },
        {
          name: "toObject",
          color: "hsl(293, 70%, 50%)",
          loc: 45167,
        },
        {
          name: "fromCSV",
          color: "hsl(321, 70%, 50%)",
          loc: 123530,
        },
        {
          name: "slice",
          color: "hsl(8, 70%, 50%)",
          loc: 174275,
        },
        {
          name: "append",
          color: "hsl(210, 70%, 50%)",
          loc: 146327,
        },
        {
          name: "prepend",
          color: "hsl(178, 70%, 50%)",
          loc: 80718,
        },
        {
          name: "shuffle",
          color: "hsl(185, 70%, 50%)",
          loc: 76265,
        },
        {
          name: "pick",
          color: "hsl(214, 70%, 50%)",
          loc: 71116,
        },
        {
          name: "plouc",
          color: "hsl(95, 70%, 50%)",
          loc: 107931,
        },
      ],
    },
    {
      name: "text",
      color: "hsl(33, 70%, 50%)",
      children: [
        {
          name: "trim",
          color: "hsl(212, 70%, 50%)",
          loc: 59045,
        },
        {
          name: "slugify",
          color: "hsl(110, 70%, 50%)",
          loc: 21137,
        },
        {
          name: "snakeCase",
          color: "hsl(28, 70%, 50%)",
          loc: 192223,
        },
        {
          name: "camelCase",
          color: "hsl(104, 70%, 50%)",
          loc: 169557,
        },
        {
          name: "repeat",
          color: "hsl(127, 70%, 50%)",
          loc: 72321,
        },
        {
          name: "padLeft",
          color: "hsl(76, 70%, 50%)",
          loc: 176913,
        },
        {
          name: "padRight",
          color: "hsl(208, 70%, 50%)",
          loc: 15622,
        },
        {
          name: "sanitize",
          color: "hsl(94, 70%, 50%)",
          loc: 37138,
        },
        {
          name: "ploucify",
          color: "hsl(230, 70%, 50%)",
          loc: 24576,
        },
      ],
    },
    {
      name: "misc",
      color: "hsl(312, 70%, 50%)",
      children: [
        {
          name: "greetings",
          color: "hsl(23, 70%, 50%)",
          children: [
            {
              name: "hey",
              color: "hsl(79, 70%, 50%)",
              loc: 181123,
            },
            {
              name: "HOWDY",
              color: "hsl(233, 70%, 50%)",
              loc: 144888,
            },
            {
              name: "aloha",
              color: "hsl(258, 70%, 50%)",
              loc: 138955,
            },
            {
              name: "AHOY",
              color: "hsl(105, 70%, 50%)",
              loc: 44620,
            },
          ],
        },
        {
          name: "other",
          color: "hsl(105, 70%, 50%)",
          loc: 28563,
        },
        {
          name: "path",
          color: "hsl(347, 70%, 50%)",
          children: [
            {
              name: "pathA",
              color: "hsl(218, 70%, 50%)",
              loc: 196865,
            },
            {
              name: "pathB",
              color: "hsl(42, 70%, 50%)",
              children: [
                {
                  name: "pathB1",
                  color: "hsl(244, 70%, 50%)",
                  loc: 91173,
                },
                {
                  name: "pathB2",
                  color: "hsl(131, 70%, 50%)",
                  loc: 111122,
                },
                {
                  name: "pathB3",
                  color: "hsl(83, 70%, 50%)",
                  loc: 150990,
                },
                {
                  name: "pathB4",
                  color: "hsl(5, 70%, 50%)",
                  loc: 65624,
                },
              ],
            },
            {
              name: "pathC",
              color: "hsl(130, 70%, 50%)",
              children: [
                {
                  name: "pathC1",
                  color: "hsl(308, 70%, 50%)",
                  loc: 96539,
                },
                {
                  name: "pathC2",
                  color: "hsl(125, 70%, 50%)",
                  loc: 197209,
                },
                {
                  name: "pathC3",
                  color: "hsl(156, 70%, 50%)",
                  loc: 131902,
                },
                {
                  name: "pathC4",
                  color: "hsl(314, 70%, 50%)",
                  loc: 31067,
                },
                {
                  name: "pathC5",
                  color: "hsl(55, 70%, 50%)",
                  loc: 140109,
                },
                {
                  name: "pathC6",
                  color: "hsl(63, 70%, 50%)",
                  loc: 134038,
                },
                {
                  name: "pathC7",
                  color: "hsl(263, 70%, 50%)",
                  loc: 192337,
                },
                {
                  name: "pathC8",
                  color: "hsl(56, 70%, 50%)",
                  loc: 188520,
                },
                {
                  name: "pathC9",
                  color: "hsl(277, 70%, 50%)",
                  loc: 1984,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
