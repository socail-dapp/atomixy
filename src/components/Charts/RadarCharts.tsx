import { ResponsiveRadar } from '@nivo/radar'

export default ({ data = mock_data /* see data tab */ }) => (
    <ResponsiveRadar
        data={data}
        keys={['comments', 'upvotes', 'transaction']}
        indexBy="taste"
        valueFormat=">-.2f"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: 'color' }}
        gridLabelOffset={36}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={{ scheme: 'yellow_green_blue' }}
        blendMode="difference"
        motionConfig="wobbly"
        legends={[
            {
                anchor: 'top-left',
                direction: 'column',
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)

const mock_data = [
    {
        "taste": "fruity",
        "comments": 65,
        "upvotes": 101,
        "transaction": 25
    },
    {
        "taste": "bitter",
        "comments": 52,
        "upvotes": 96,
        "transaction": 109
    },
    {
        "taste": "heavy",
        "comments": 48,
        "upvotes": 28,
        "transaction": 78
    },
    {
        "taste": "strong",
        "comments": 66,
        "upvotes": 50,
        "transaction": 92
    },
    {
        "taste": "sunny",
        "comments": 116,
        "upvotes": 55,
        "transaction": 83
    }
]