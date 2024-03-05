import {EOperator} from "../constants/operator.ts";
import {EFormulaVariableType} from "../constants/variable.ts";


export type TNodeData = {
    bePersistence: boolean;
    children: TNodeData[];
    expression: string;
    name: string;
    params: Record<string, string>;
    operator: EOperator;
    value: string;
}

export type TVariable = {
    beAnnualized: boolean;
    beFirstYear: boolean;
    beFullLife: boolean;
    beIncludeSubsidy: boolean;
    classificationName: string;
    name: string;
    descriptions: string[];
    type: EFormulaVariableType;
}
