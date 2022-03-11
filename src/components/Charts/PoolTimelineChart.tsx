import { ResponsiveLine } from '@nivo/line'

const formatData = (elem: any[]) => elem?.map((item, i) => ({
    "country": item?.detail?.titleCapsule, //titleName //titleCapsule
    "value": item?.detail?.pool?.value || 0, //pool?.value || 0
    "color": item?.detail?.colorBg, //colorBg
}))

export default ({ data = mock_data /* see data tab */ }) => (
    <ResponsiveLine
        data={mock_data}
        lineWidth={1}
        enableGridX={false}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
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
            legend: '$ USD',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={2}
        // pointColor={{ theme: 'background' }}
        pointBorderWidth={1}
        // pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)

const mock_data = [
    {
        "id": "node2",
        "color": "#03dac6",
        "data": [
            {
                "x": "1Mar",
                "y": 0
            },
            {
                "x": "2Mar",
                "y": 0
            },
            {
                "x": "3Mar",
                "y": 0
            },
            {
                "x": "4Mar",
                "y": 0
            },
            {
                "x": "5Mar",
                "y": 0
            },
            {
                "x": "6Mar",
                "y": 0
            },
            {
                "x": "7Mar",
                "y": 0
            },
            {
                "x": "8Mar",
                "y": 0
            },
            {
                "x": "9Mar",
                "y": 1000
            },
            {
                "x": "10Mar",
                "y": 1000
            },
            {
                "x": "11Mar",
                "y": 1000
            },
            {
                "x": "12Mar",
                "y": 1000
            },
            {
                "x": "13Mar",
                "y": 1000
            },
            {
                "x": "14Mar",
                "y": 1000
            },
            {
                "x": "15Mar",
                "y": 1000
            },
            {
                "x": "16Mar",
                "y": 1000
            },
            {
                "x": "17Mar",
                "y": 1000
            },
            {
                "x": "18Mar",
                "y": 1000
            },
        ]
    },
    {
        "id": "node3",
        "color": "#cf6679",
        "data": [
            {
                "x": "1Mar",
                "y": 0
            },
            {
                "x": "2Mar",
                "y": 0
            },
            {
                "x": "3Mar",
                "y": 0
            },
            {
                "x": "4Mar",
                "y": 0
            },
            {
                "x": "5Mar",
                "y": 0
            },
            {
                "x": "6Mar",
                "y": 0
            },
            {
                "x": "7Mar",
                "y": 0
            },
            {
                "x": "8Mar",
                "y": 0
            },
            {
                "x": "9Mar",
                "y": 1000
            },
            {
                "x": "10Mar",
                "y": 1000
            },
            {
                "x": "11Mar",
                "y": 2000
            },
            {
                "x": "12Mar",
                "y": 1000
            },
            {
                "x": "13Mar",
                "y": 3000
            },
            {
                "x": "14Mar",
                "y": 0
            },
            {
                "x": "15Mar",
                "y": 0
            },
            {
                "x": "16Mar",
                "y": 0
            },
            {
                "x": "17Mar",
                "y": 0
            },
            {
                "x": "18Mar",
                "y": 0
            },

        ]
    },
    {
        "id": "node4",
        "color": "#ff0266",
        "data": [
            {
                "x": "1Mar",
                "y": 11110
            },
            {
                "x": "2Mar",
                "y": 120
            },
            {
                "x": "3Mar",
                "y": 2320
            },
            {
                "x": "4Mar",
                "y": 3230
            },
            {
                "x": "5Mar",
                "y": 320
            },
            {
                "x": "6Mar",
                "y": 32320
            },
            {
                "x": "7Mar",
                "y": 120
            },
            {
                "x": "8Mar",
                "y": 320
            },
            {
                "x": "9Mar",
                "y": 222
            },
            {
                "x": "10Mar",
                "y": 20000
            },
            {
                "x": "11Mar",
                "y": 1000
            },
            {
                "x": "12Mar",
                "y": 2000
            },
            {
                "x": "13Mar",
                "y": 1000
            },
            {
                "x": "14Mar",
                "y": 32132
            },
            {
                "x": "15Mar",
                "y": 1000
            },
            {
                "x": "16Mar",
                "y": 7232
            },
            {
                "x": "17Mar",
                "y": 1000
            },
            {
                "x": "18Mar",
                "y": 0
            },

        ]
    },
    {
        "id": "node1",
        "color": "#bb86fc",
        "data": [
            {
                "x": "1Mar",
                "y": 0
            },
            {
                "x": "2Mar",
                "y": 5000
            },
            {
                "x": "3Mar",
                "y": 0
            },
            {
                "x": "4Mar",
                "y": 0
            },
            {
                "x": "5Mar",
                "y": 0
            },
            {
                "x": "6Mar",
                "y": 0
            },
            {
                "x": "7Mar",
                "y": 0
            },
            {
                "x": "8Mar",
                "y": 0
            },
            {
                "x": "9Mar",
                "y": 0
            },
            {
                "x": "10Mar",
                "y": 0
            },
            {
                "x": "11Mar",
                "y": 2
            },
            {
                "x": "12Mar",
                "y": 0
            },
            {
                "x": "13Mar",
                "y": 2000
            },
            {
                "x": "14Mar",
                "y": 3233
            },
            {
                "x": "15Mar",
                "y": 0
            },
            {
                "x": "16Mar",
                "y": 123
            },
            {
                "x": "17Mar",
                "y": 0
            },
            {
                "x": "18Mar",
                "y": 0
            },
        ]
    },


]