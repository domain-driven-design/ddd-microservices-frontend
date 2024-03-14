import ReactFlow, {MiniMap, Controls} from 'reactflow';
import 'reactflow/dist/style.css';
import {useState} from "react";
import Node from "../../components/Node.tsx";
import Panel from "../../components/Panel.tsx";
import {transformData} from "../../utils/common.ts";
import Menu from "../../components/Menu.tsx";

const nodeTypes = {
    price: (props: any) => {
        if (!props.data) {
            return null
        }

        return <Node {...props} root last first/>;
    },
};

export default function Flow() {
    const [data, setData] = useState({});

    const handleChange = (data: any) => {
        setData(transformData(data));
    }

    return (
        <div className='w-screen h-screen bg-[#f5f5f5] reletive'>
            <ReactFlow
                nodes={[
                    {
                        id: '1',
                        position: {x: 0, y: 0},
                        data,
                        type: "price"
                    }
                ]}
                nodeTypes={nodeTypes}
                defaultViewport={{
                    zoom: 1,
                    x: 264,
                    y: 80
                }}
                proOptions={{hideAttribution: true}}
            >
                <Panel className="top-6 left-6 px-4 py-2">
                    <span className="font-bold text-base mr-2">定价结果计算过程</span>
                    {/*<span className="text-sm text-[#00000073]">PR1026189</span>*/}
                </Panel>
                <Menu onChange={handleChange}/>
                <Controls/>
                <MiniMap/>
            </ReactFlow>
        </div>
    );
}
