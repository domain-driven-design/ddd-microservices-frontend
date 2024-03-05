import useFormlaVariableMap from "../hooks/useFormulaVariableMap.ts";
import useTagText from "../hooks/useTagText.ts";
import TextTag from "./TextTag.tsx";
import {formatNodeValue} from "../utils/format.ts";
import {cn} from "../utils/common.ts";

type TPops = {
    variableKey: string;
    value: string;
    className?: string;
}

const FormulaItem = ({variableKey, value, className}: TPops) => {
    const {data: variableMap, isLoading} = useFormlaVariableMap();
    const {getTagFlag, getTagFullText} = useTagText();
    const variable = variableMap[variableKey];

    if (isLoading) {
        return null;
    }

    return (
        <div
            className={cn("px-3 py-2 border-gray-divider border-[1px] rounded flex flex-col gap-1 flex-shrink-0", className)}>
            <span className="text-gray-head font-bold text-sm flex items-center gap-1">
                {getTagFlag(variableKey) && (
                    <TextTag
                        text={getTagFlag(variableKey)}
                        tooltip={getTagFullText(variableKey)}
                        className={cn("text-white font-bold", {
                            "bg-[#B7EB8F] border-[#B7EB8F]": variable?.beFirstYear,
                            "bg-[#FFC069] border-[#FFC069]": variable?.beFullLife,
                            "bg-[#91D5FF] border-[#91D5FF]": variable?.beAnnualized,
                        })}
                    />
                )}
                {variable?.name || variableKey}
            </span>
            <span className="text-gray-content text-xs">{formatNodeValue(value, variable?.type)}</span>
        </div>
    )
}

export default FormulaItem;
