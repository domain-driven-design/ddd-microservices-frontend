import Panel from "./Panel.tsx";
import {useQuery} from "react-query";
import {calculateApi} from "../api/calculate.ts";
import {memo, useEffect, useState} from "react";
import useFormulaVariableMap from "../hooks/useFormulaVariableMap.ts";
import {cn} from "../utils/common.ts";

const Menu = memo(({onChange}: {onChange: (data: any) => void}) => {
    const {data} = useQuery("calculate", () => calculateApi());
    const {data: variableMap} = useFormulaVariableMap();
    const [active, setActive] = useState(0)

    const itemNames = data?.map((item: any) => variableMap[item.name]?.name || item.name) || [];

    useEffect(() => {
        if (data) {
            onChange(data[active])
        }
    }, [active, data])

    return (
        <Panel className="left-6 top-[80px] w-[216px] max-h-[503px] flex flex-col text-sm py-4 overflow-auto">
            {itemNames.map((item: string, index: number) => (
                <div
                    key={index}
                    className={cn(
                        "cursor-pointer transition-all px-6 py-[10px] hover:bg-hover-notice hover:text-[#fff]",
                        {"bg-[#2D73FF] text-[#fff]": active === index}
                    )}
                    onClick={() => setActive(index)}
                >{item}</div>
            ))}
        </Panel>
    )
})

export default Menu;
