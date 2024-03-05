import useFormulaVariableMap from "./useFormulaVariableMap.ts";


const useTagText = () => {
    const {data: variableMap} = useFormulaVariableMap();

    const getTagFlag = (key: string) => {
        const variable = variableMap[key];
        if (variable?.beFirstYear) {
            return "首";
        }

        if (variable?.beFullLife) {
            return "全";
        }

        if (variable?.beAnnualized) {
            return "均";
        }

        return "";
    }

    const getTagFullText = (key: string) => {
        const variable = variableMap[key];
        if (variable?.beFirstYear) {
            return "首年";
        }

        if (variable?.beFullLife) {
            return "全生命周期";
        }

        if (variable?.beAnnualized) {
            return "年均";
        }

        return "";
    }

    return {
        getTagFlag,
        getTagFullText,
    }
}

export default useTagText;
