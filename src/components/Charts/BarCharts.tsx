
// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const _getColor = (elem: any[]) => {

}

const formatData = (elem: any[]) => elem?.map((item, i) => ({
    "country": item?.detail?.titleCapsule, //titleName //titleCapsule
    "value": item?.detail?.pool?.value || 0, //pool?.value || 0
    "color": item?.detail?.colorBg, //colorBg
}))


const BarCharts = ({ data = mock_data/* see data tab */, elements = [] }) => (
    <ResponsiveBar
        data={!!elements?.length ? formatData(elements) : mock_data}
        // data={formatData(elements)}

        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}

        //getCalculate color
        colors={mock_color}
        // colors={d => d?.color}
        // colors={!!elements?.length ? _getColor(elements) : mock_color}
        groupMode="grouped"
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 2,
                spacing: 10
            }
        ]}
        animate={true}

        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        // axisBottom={{
        //     tickSize: 5,
        //     tickPadding: 5,
        //     tickRotation: 0,
        //     legend: 'country',
        //     legendPosition: 'middle',
        //     legendOffset: 32
        // }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '$ USD',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
    // legends={[
    //     {
    //         dataFrom: 'keys',
    //         anchor: 'bottom-right',
    //         direction: 'column',
    //         justify: false,
    //         translateX: 120,
    //         translateY: 0,
    //         itemsSpacing: 2,
    //         itemWidth: 100,
    //         itemHeight: 20,
    //         itemDirection: 'left-to-right',
    //         itemOpacity: 0.85,
    //         symbolSize: 20,
    //         effects: [
    //             {
    //                 on: 'hover',
    //                 style: {
    //                     itemOpacity: 1
    //                 }
    //             }
    //         ]
    //     }
    // ]}
    // role="application"
    // ariaLabel="Nivo bar chart demo"
    // barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in country: " + e.indexValue }}
    />
)
export default BarCharts

//todo: random the mockup
const mock_data = [

    {
        "country": "node2", //titleName //titleCapsule
        "value": 2000, //pool?.value || 0
        "color": "#03dac6", //colorBg
    },
    {
        "country": "node3", //titleName //titleCapsule
        "value": 500, //pool?.value || 0
        "color": "#cf6679", //colorBg
    },
    {
        "country": "node4", //titleName //titleCapsule
        "value": 300, //pool?.value || 0
        "color": "#ff0266", //colorBg
    },
    {
        "country": "node1", //titleName //titleCapsule
        "value": 87, //pool?.value || 0
        "color": "#bb86fc", //colorBg
    },
]

const mock_color = [
    "#03dac6",
    "#cf6679",
    "#ff0266",
    "#bb86fc",

]
interface IPool {
    txHash: string
    blockHash: any
    chainId: number | string
    value: any // value donated
    from: string
    to: string
    fee: any
    createdAt: any
    network: any
    nodeId: any
    nodeTitle: any
}
