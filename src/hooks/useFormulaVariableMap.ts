import {useQuery} from "react-query";
import {getBusinessRuleApi} from "../api/calculate.ts";


const useFormulaVariableMap = () => {
    const {data, isLoading} = useQuery(
        ["getBusinessRuleApi", "expression_variables"],
        () => getBusinessRuleApi("expression_variables"),
        {staleTime: 1000 * 60 * 60 * 1}
    );
    return {
        data: data || {},
        isLoading
    };
}

export default useFormulaVariableMap;
