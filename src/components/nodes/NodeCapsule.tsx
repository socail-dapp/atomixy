import useStore from '@/helpers/store'

// id to remove the node

const NodeCapsule = ({ detail, id }) => {
    const { addNodeWindow } = useStore();

    return (
        <div
            onClick={() => {
                console.log('click node')
                addNodeWindow({ ...detail, id })
            }}
            //missing the position too?
            style={{
                background: '#03dac6',
                // width: 300,
                // height: 200,
                color: 'white',
                padding: '2%'
            }}>
            {detail.title}
        </div>
    )
}

export default NodeCapsule