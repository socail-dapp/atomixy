import React, { useState } from 'react'
import { ResponsiveSwarmPlot } from '@nivo/swarmplot'

const SwarmCharts = ({ data = mock_data /* see data tab */ }) => (
    <ResponsiveSwarmPlot
        data={data}
        groups={['group A', 'group B', 'group C']}
        identity="id"
        value="price"
        valueFormat="$.2f"
        valueScale={{ type: 'linear', min: 0, max: 500, reverse: false }}
        size={{
            key: 'volume',
            values: [
                4,
                20
            ],
            sizes: [
                6,
                20
            ]
        }}
        forceStrength={4}
        simulationIterations={100}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.6
                ],
                [
                    'opacity',
                    0.5
                ]
            ]
        }}
        margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
        axisTop={{
            orient: 'top',
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'group if vertical, price if horizontal',
            legendPosition: 'middle',
            legendOffset: -46
        }}
        axisRight={{
            orient: 'right',
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'price if vertical, group if horizontal',
            legendPosition: 'middle',
            legendOffset: 76
        }}
        axisBottom={{
            orient: 'bottom',
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'group if vertical, price if horizontal',
            legendPosition: 'middle',
            legendOffset: 46
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'price if vertical, group if horizontal',
            legendPosition: 'middle',
            legendOffset: -76
        }}
    />
)
export default React.memo(SwarmCharts)


const mock_data = [
    {
        "id": "0.0",
        "group": "group A",
        "price": 225,
        "volume": 12
    },
    {
        "id": "0.1",
        "group": "group A",
        "price": 226,
        "volume": 13
    },
    {
        "id": "0.2",
        "group": "group C",
        "price": 421,
        "volume": 9
    },
    {
        "id": "0.3",
        "group": "group B",
        "price": 169,
        "volume": 10
    },
    {
        "id": "0.4",
        "group": "group B",
        "price": 500,
        "volume": 11
    },
    {
        "id": "0.5",
        "group": "group B",
        "price": 183,
        "volume": 5
    },
    {
        "id": "0.6",
        "group": "group A",
        "price": 317,
        "volume": 14
    },
    {
        "id": "0.7",
        "group": "group A",
        "price": 30,
        "volume": 12
    },
    {
        "id": "0.8",
        "group": "group C",
        "price": 365,
        "volume": 5
    },
    {
        "id": "0.9",
        "group": "group A",
        "price": 480,
        "volume": 14
    },
    {
        "id": "0.10",
        "group": "group C",
        "price": 433,
        "volume": 13
    },
    {
        "id": "0.11",
        "group": "group B",
        "price": 169,
        "volume": 11
    },
    {
        "id": "0.12",
        "group": "group B",
        "price": 469,
        "volume": 8
    },
    {
        "id": "0.13",
        "group": "group B",
        "price": 70,
        "volume": 20
    },
    {
        "id": "0.14",
        "group": "group B",
        "price": 431,
        "volume": 4
    },
    {
        "id": "0.15",
        "group": "group A",
        "price": 379,
        "volume": 14
    },
    {
        "id": "0.16",
        "group": "group C",
        "price": 301,
        "volume": 12
    },
    {
        "id": "0.17",
        "group": "group C",
        "price": 297,
        "volume": 13
    },
    {
        "id": "0.18",
        "group": "group C",
        "price": 215,
        "volume": 8
    },
    {
        "id": "0.19",
        "group": "group A",
        "price": 127,
        "volume": 13
    },
    {
        "id": "0.20",
        "group": "group C",
        "price": 241,
        "volume": 6
    },
    {
        "id": "0.21",
        "group": "group A",
        "price": 473,
        "volume": 11
    },
    {
        "id": "0.22",
        "group": "group B",
        "price": 52,
        "volume": 14
    },
    {
        "id": "0.23",
        "group": "group A",
        "price": 144,
        "volume": 16
    },
    {
        "id": "0.24",
        "group": "group B",
        "price": 185,
        "volume": 12
    },
    {
        "id": "0.25",
        "group": "group A",
        "price": 327,
        "volume": 9
    },
    {
        "id": "0.26",
        "group": "group A",
        "price": 461,
        "volume": 18
    },
    {
        "id": "0.27",
        "group": "group B",
        "price": 415,
        "volume": 15
    },
    {
        "id": "0.28",
        "group": "group A",
        "price": 135,
        "volume": 11
    },
    {
        "id": "0.29",
        "group": "group C",
        "price": 493,
        "volume": 20
    },
    {
        "id": "0.30",
        "group": "group C",
        "price": 217,
        "volume": 10
    },
    {
        "id": "0.31",
        "group": "group C",
        "price": 112,
        "volume": 7
    },
    {
        "id": "0.32",
        "group": "group A",
        "price": 95,
        "volume": 9
    },
    {
        "id": "0.33",
        "group": "group C",
        "price": 78,
        "volume": 13
    },
    {
        "id": "0.34",
        "group": "group A",
        "price": 387,
        "volume": 9
    },
    {
        "id": "0.35",
        "group": "group A",
        "price": 68,
        "volume": 16
    },
    {
        "id": "0.36",
        "group": "group A",
        "price": 432,
        "volume": 6
    },
    {
        "id": "0.37",
        "group": "group B",
        "price": 239,
        "volume": 6
    },
    {
        "id": "0.38",
        "group": "group B",
        "price": 254,
        "volume": 20
    },
    {
        "id": "0.39",
        "group": "group B",
        "price": 305,
        "volume": 10
    },
    {
        "id": "0.40",
        "group": "group A",
        "price": 21,
        "volume": 16
    },
    {
        "id": "0.41",
        "group": "group B",
        "price": 65,
        "volume": 19
    },
    {
        "id": "0.42",
        "group": "group A",
        "price": 164,
        "volume": 12
    },
    {
        "id": "0.43",
        "group": "group B",
        "price": 96,
        "volume": 12
    },
    {
        "id": "0.44",
        "group": "group B",
        "price": 91,
        "volume": 16
    },
    {
        "id": "0.45",
        "group": "group B",
        "price": 416,
        "volume": 14
    },
    {
        "id": "0.46",
        "group": "group C",
        "price": 337,
        "volume": 9
    },
    {
        "id": "0.47",
        "group": "group C",
        "price": 191,
        "volume": 19
    },
    {
        "id": "0.48",
        "group": "group C",
        "price": 184,
        "volume": 8
    },
    {
        "id": "0.49",
        "group": "group A",
        "price": 45,
        "volume": 7
    },
    {
        "id": "0.50",
        "group": "group C",
        "price": 223,
        "volume": 5
    },
    {
        "id": "0.51",
        "group": "group C",
        "price": 381,
        "volume": 20
    },
    {
        "id": "0.52",
        "group": "group B",
        "price": 202,
        "volume": 19
    },
    {
        "id": "0.53",
        "group": "group C",
        "price": 146,
        "volume": 4
    },
    {
        "id": "0.54",
        "group": "group B",
        "price": 26,
        "volume": 20
    },
    {
        "id": "0.55",
        "group": "group B",
        "price": 23,
        "volume": 17
    },
    {
        "id": "0.56",
        "group": "group B",
        "price": 321,
        "volume": 16
    },
    {
        "id": "0.57",
        "group": "group B",
        "price": 98,
        "volume": 6
    },
    {
        "id": "0.58",
        "group": "group A",
        "price": 35,
        "volume": 9
    },
    {
        "id": "0.59",
        "group": "group C",
        "price": 213,
        "volume": 4
    },
    {
        "id": "0.60",
        "group": "group C",
        "price": 252,
        "volume": 15
    },
    {
        "id": "0.61",
        "group": "group C",
        "price": 257,
        "volume": 18
    },
    {
        "id": "1.0",
        "group": "group C",
        "price": 231,
        "volume": 9
    },
    {
        "id": "1.1",
        "group": "group B",
        "price": 341,
        "volume": 15
    },
    {
        "id": "1.2",
        "group": "group C",
        "price": 97,
        "volume": 18
    },
    {
        "id": "1.3",
        "group": "group B",
        "price": 88,
        "volume": 20
    },
    {
        "id": "1.4",
        "group": "group C",
        "price": 244,
        "volume": 8
    },
    {
        "id": "1.5",
        "group": "group C",
        "price": 493,
        "volume": 18
    },
    {
        "id": "1.6",
        "group": "group B",
        "price": 156,
        "volume": 18
    },
    {
        "id": "1.7",
        "group": "group A",
        "price": 421,
        "volume": 14
    },
    {
        "id": "1.8",
        "group": "group A",
        "price": 167,
        "volume": 4
    },
    {
        "id": "1.9",
        "group": "group A",
        "price": 158,
        "volume": 9
    },
    {
        "id": "1.10",
        "group": "group C",
        "price": 438,
        "volume": 8
    },
    {
        "id": "1.11",
        "group": "group A",
        "price": 177,
        "volume": 4
    },
    {
        "id": "1.12",
        "group": "group C",
        "price": 348,
        "volume": 19
    },
    {
        "id": "1.13",
        "group": "group A",
        "price": 364,
        "volume": 18
    },
    {
        "id": "1.14",
        "group": "group A",
        "price": 125,
        "volume": 9
    },
    {
        "id": "1.15",
        "group": "group A",
        "price": 189,
        "volume": 16
    },
    {
        "id": "1.16",
        "group": "group B",
        "price": 121,
        "volume": 4
    },
    {
        "id": "1.17",
        "group": "group B",
        "price": 416,
        "volume": 6
    },
    {
        "id": "1.18",
        "group": "group C",
        "price": 141,
        "volume": 18
    },
    {
        "id": "1.19",
        "group": "group B",
        "price": 408,
        "volume": 18
    },
    {
        "id": "1.20",
        "group": "group C",
        "price": 332,
        "volume": 13
    },
    {
        "id": "1.21",
        "group": "group C",
        "price": 195,
        "volume": 4
    },
    {
        "id": "1.22",
        "group": "group C",
        "price": 170,
        "volume": 9
    },
    {
        "id": "1.23",
        "group": "group C",
        "price": 334,
        "volume": 5
    },
    {
        "id": "1.24",
        "group": "group B",
        "price": 366,
        "volume": 18
    },
    {
        "id": "1.25",
        "group": "group C",
        "price": 210,
        "volume": 13
    },
    {
        "id": "1.26",
        "group": "group B",
        "price": 304,
        "volume": 20
    },
    {
        "id": "1.27",
        "group": "group A",
        "price": 169,
        "volume": 9
    },
    {
        "id": "1.28",
        "group": "group B",
        "price": 481,
        "volume": 16
    },
    {
        "id": "1.29",
        "group": "group C",
        "price": 376,
        "volume": 19
    },
    {
        "id": "1.30",
        "group": "group C",
        "price": 72,
        "volume": 4
    },
    {
        "id": "1.31",
        "group": "group C",
        "price": 492,
        "volume": 12
    },
    {
        "id": "1.32",
        "group": "group C",
        "price": 232,
        "volume": 7
    },
    {
        "id": "1.33",
        "group": "group C",
        "price": 124,
        "volume": 7
    },
    {
        "id": "1.34",
        "group": "group C",
        "price": 37,
        "volume": 7
    },
    {
        "id": "1.35",
        "group": "group A",
        "price": 141,
        "volume": 19
    },
    {
        "id": "1.36",
        "group": "group C",
        "price": 13,
        "volume": 7
    },
    {
        "id": "1.37",
        "group": "group B",
        "price": 380,
        "volume": 12
    },
    {
        "id": "1.38",
        "group": "group B",
        "price": 310,
        "volume": 20
    },
    {
        "id": "1.39",
        "group": "group B",
        "price": 489,
        "volume": 11
    },
    {
        "id": "1.40",
        "group": "group C",
        "price": 196,
        "volume": 16
    },
    {
        "id": "1.41",
        "group": "group A",
        "price": 238,
        "volume": 14
    },
    {
        "id": "1.42",
        "group": "group B",
        "price": 154,
        "volume": 12
    },
    {
        "id": "1.43",
        "group": "group B",
        "price": 456,
        "volume": 18
    },
    {
        "id": "1.44",
        "group": "group B",
        "price": 27,
        "volume": 20
    },
    {
        "id": "1.45",
        "group": "group B",
        "price": 499,
        "volume": 7
    },
    {
        "id": "1.46",
        "group": "group B",
        "price": 8,
        "volume": 7
    },
    {
        "id": "1.47",
        "group": "group B",
        "price": 38,
        "volume": 8
    },
    {
        "id": "1.48",
        "group": "group C",
        "price": 126,
        "volume": 12
    },
    {
        "id": "1.49",
        "group": "group A",
        "price": 397,
        "volume": 9
    },
    {
        "id": "1.50",
        "group": "group C",
        "price": 107,
        "volume": 17
    },
    {
        "id": "1.51",
        "group": "group C",
        "price": 437,
        "volume": 5
    },
    {
        "id": "1.52",
        "group": "group C",
        "price": 498,
        "volume": 10
    },
    {
        "id": "1.53",
        "group": "group C",
        "price": 33,
        "volume": 18
    },
    {
        "id": "1.54",
        "group": "group A",
        "price": 25,
        "volume": 13
    },
    {
        "id": "1.55",
        "group": "group B",
        "price": 44,
        "volume": 19
    },
    {
        "id": "1.56",
        "group": "group A",
        "price": 211,
        "volume": 17
    },
    {
        "id": "1.57",
        "group": "group A",
        "price": 279,
        "volume": 7
    },
    {
        "id": "1.58",
        "group": "group A",
        "price": 78,
        "volume": 15
    },
    {
        "id": "1.59",
        "group": "group C",
        "price": 89,
        "volume": 16
    },
    {
        "id": "1.60",
        "group": "group B",
        "price": 283,
        "volume": 13
    },
    {
        "id": "1.61",
        "group": "group B",
        "price": 342,
        "volume": 5
    },
    {
        "id": "1.62",
        "group": "group A",
        "price": 130,
        "volume": 12
    },
    {
        "id": "1.63",
        "group": "group C",
        "price": 76,
        "volume": 17
    },
    {
        "id": "1.64",
        "group": "group A",
        "price": 145,
        "volume": 10
    },
    {
        "id": "1.65",
        "group": "group C",
        "price": 15,
        "volume": 19
    },
    {
        "id": "1.66",
        "group": "group C",
        "price": 75,
        "volume": 17
    },
    {
        "id": "1.67",
        "group": "group B",
        "price": 261,
        "volume": 8
    },
    {
        "id": "1.68",
        "group": "group C",
        "price": 256,
        "volume": 18
    },
    {
        "id": "1.69",
        "group": "group C",
        "price": 120,
        "volume": 4
    },
    {
        "id": "1.70",
        "group": "group C",
        "price": 226,
        "volume": 9
    },
    {
        "id": "1.71",
        "group": "group B",
        "price": 388,
        "volume": 10
    },
    {
        "id": "1.72",
        "group": "group C",
        "price": 234,
        "volume": 7
    },
    {
        "id": "1.73",
        "group": "group B",
        "price": 25,
        "volume": 11
    },
    {
        "id": "1.74",
        "group": "group A",
        "price": 499,
        "volume": 18
    },
    {
        "id": "1.75",
        "group": "group C",
        "price": 191,
        "volume": 17
    },
    {
        "id": "1.76",
        "group": "group B",
        "price": 154,
        "volume": 7
    },
    {
        "id": "1.77",
        "group": "group C",
        "price": 485,
        "volume": 15
    },
    {
        "id": "1.78",
        "group": "group B",
        "price": 125,
        "volume": 10
    },
    {
        "id": "2.0",
        "group": "group C",
        "price": 346,
        "volume": 4
    },
    {
        "id": "2.1",
        "group": "group B",
        "price": 312,
        "volume": 10
    },
    {
        "id": "2.2",
        "group": "group C",
        "price": 219,
        "volume": 12
    },
    {
        "id": "2.3",
        "group": "group B",
        "price": 143,
        "volume": 10
    },
    {
        "id": "2.4",
        "group": "group C",
        "price": 305,
        "volume": 9
    },
    {
        "id": "2.5",
        "group": "group A",
        "price": 311,
        "volume": 10
    },
    {
        "id": "2.6",
        "group": "group A",
        "price": 356,
        "volume": 5
    },
    {
        "id": "2.7",
        "group": "group A",
        "price": 330,
        "volume": 19
    },
    {
        "id": "2.8",
        "group": "group B",
        "price": 282,
        "volume": 7
    },
    {
        "id": "2.9",
        "group": "group C",
        "price": 121,
        "volume": 20
    },
    {
        "id": "2.10",
        "group": "group B",
        "price": 148,
        "volume": 13
    },
    {
        "id": "2.11",
        "group": "group C",
        "price": 218,
        "volume": 18
    },
    {
        "id": "2.12",
        "group": "group B",
        "price": 129,
        "volume": 13
    },
    {
        "id": "2.13",
        "group": "group C",
        "price": 153,
        "volume": 19
    },
    {
        "id": "2.14",
        "group": "group A",
        "price": 427,
        "volume": 16
    },
    {
        "id": "2.15",
        "group": "group C",
        "price": 14,
        "volume": 12
    },
    {
        "id": "2.16",
        "group": "group B",
        "price": 108,
        "volume": 11
    },
    {
        "id": "2.17",
        "group": "group C",
        "price": 455,
        "volume": 16
    },
    {
        "id": "2.18",
        "group": "group A",
        "price": 82,
        "volume": 10
    },
    {
        "id": "2.19",
        "group": "group C",
        "price": 268,
        "volume": 5
    },
    {
        "id": "2.20",
        "group": "group A",
        "price": 494,
        "volume": 19
    },
    {
        "id": "2.21",
        "group": "group B",
        "price": 462,
        "volume": 6
    },
    {
        "id": "2.22",
        "group": "group A",
        "price": 450,
        "volume": 20
    },
    {
        "id": "2.23",
        "group": "group C",
        "price": 486,
        "volume": 8
    },
    {
        "id": "2.24",
        "group": "group A",
        "price": 44,
        "volume": 10
    },
    {
        "id": "2.25",
        "group": "group C",
        "price": 8,
        "volume": 17
    },
    {
        "id": "2.26",
        "group": "group C",
        "price": 433,
        "volume": 12
    },
    {
        "id": "2.27",
        "group": "group B",
        "price": 322,
        "volume": 20
    },
    {
        "id": "2.28",
        "group": "group B",
        "price": 313,
        "volume": 9
    },
    {
        "id": "2.29",
        "group": "group A",
        "price": 96,
        "volume": 14
    },
    {
        "id": "2.30",
        "group": "group C",
        "price": 112,
        "volume": 9
    },
    {
        "id": "2.31",
        "group": "group C",
        "price": 61,
        "volume": 20
    },
    {
        "id": "2.32",
        "group": "group A",
        "price": 207,
        "volume": 16
    },
    {
        "id": "2.33",
        "group": "group A",
        "price": 5,
        "volume": 5
    },
    {
        "id": "2.34",
        "group": "group A",
        "price": 153,
        "volume": 10
    },
    {
        "id": "2.35",
        "group": "group A",
        "price": 6,
        "volume": 18
    },
    {
        "id": "2.36",
        "group": "group A",
        "price": 370,
        "volume": 18
    },
    {
        "id": "2.37",
        "group": "group C",
        "price": 348,
        "volume": 16
    },
    {
        "id": "2.38",
        "group": "group A",
        "price": 292,
        "volume": 8
    },
    {
        "id": "2.39",
        "group": "group A",
        "price": 103,
        "volume": 15
    },
    {
        "id": "2.40",
        "group": "group C",
        "price": 197,
        "volume": 5
    },
    {
        "id": "2.41",
        "group": "group B",
        "price": 147,
        "volume": 13
    },
    {
        "id": "2.42",
        "group": "group A",
        "price": 489,
        "volume": 19
    },
    {
        "id": "2.43",
        "group": "group B",
        "price": 373,
        "volume": 4
    },
    {
        "id": "2.44",
        "group": "group C",
        "price": 300,
        "volume": 4
    },
    {
        "id": "2.45",
        "group": "group C",
        "price": 153,
        "volume": 5
    },
    {
        "id": "2.46",
        "group": "group C",
        "price": 121,
        "volume": 14
    },
    {
        "id": "2.47",
        "group": "group A",
        "price": 222,
        "volume": 14
    },
    {
        "id": "2.48",
        "group": "group B",
        "price": 206,
        "volume": 20
    },
    {
        "id": "2.49",
        "group": "group A",
        "price": 216,
        "volume": 12
    },
    {
        "id": "2.50",
        "group": "group C",
        "price": 317,
        "volume": 14
    },
    {
        "id": "2.51",
        "group": "group C",
        "price": 256,
        "volume": 17
    },
    {
        "id": "2.52",
        "group": "group C",
        "price": 294,
        "volume": 16
    },
    {
        "id": "2.53",
        "group": "group B",
        "price": 167,
        "volume": 15
    },
    {
        "id": "2.54",
        "group": "group C",
        "price": 63,
        "volume": 16
    },
    {
        "id": "2.55",
        "group": "group B",
        "price": 173,
        "volume": 7
    },
    {
        "id": "2.56",
        "group": "group B",
        "price": 390,
        "volume": 9
    },
    {
        "id": "2.57",
        "group": "group B",
        "price": 191,
        "volume": 20
    },
    {
        "id": "2.58",
        "group": "group B",
        "price": 142,
        "volume": 19
    },
    {
        "id": "2.59",
        "group": "group B",
        "price": 253,
        "volume": 7
    },
    {
        "id": "2.60",
        "group": "group C",
        "price": 386,
        "volume": 13
    },
    {
        "id": "2.61",
        "group": "group A",
        "price": 473,
        "volume": 12
    },
    {
        "id": "2.62",
        "group": "group C",
        "price": 416,
        "volume": 12
    },
    {
        "id": "2.63",
        "group": "group A",
        "price": 230,
        "volume": 11
    },
    {
        "id": "2.64",
        "group": "group B",
        "price": 405,
        "volume": 5
    },
    {
        "id": "2.65",
        "group": "group B",
        "price": 197,
        "volume": 9
    },
    {
        "id": "2.66",
        "group": "group A",
        "price": 82,
        "volume": 18
    },
    {
        "id": "2.67",
        "group": "group A",
        "price": 255,
        "volume": 10
    },
    {
        "id": "2.68",
        "group": "group B",
        "price": 423,
        "volume": 19
    }
]