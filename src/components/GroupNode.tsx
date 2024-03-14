import Node from "./Node.tsx";
import {TNodeData} from "../types/calculate.ts";
import {motion} from "framer-motion";
import {forwardRef, useState} from "react";

type TProps = {
    data: TNodeData[];
    nodeWidth?: number;
}

const GroupNode = forwardRef<HTMLDivElement, TProps>(({data, nodeWidth}, ref) => {
    const [selectedNode, setSelectedNode] = useState<string>();

    return (
        <motion.div
            ref={ref}
            className="group-node"
            initial={{
                marginLeft: 0,
                opacity: 0
            }}
            animate={{
                marginLeft: 64,
                opacity: 1
            }}
            exit={{
                marginLeft: 0,
                opacity: 0
            }}
            transition={{
                ease: [0.4, 0, 0.2, 1],
                duration: 0.15
            }}
            style={{left: nodeWidth}}
        >
            {data.map((item, index) => (
                <Node
                    selectedNode={selectedNode}
                    first={index === 0}
                    last={index === data.length - 1}
                    data={item}
                    onClick={(nodeName: string) => setSelectedNode(nodeName)}
                />
            ))}
        </motion.div>
    )
})

export default GroupNode;
