import request from "./request.ts";
import {TVariable, TNodeData} from "../types/calculate.ts";


export const calculateApi = () => {
    return request.post<TNodeData[]>('/api/calculate', {
        "bizType": "DEPOSIT",
        "mode": "DEPOSIT",
        "bizId": "bizId007",
        "transactionId": "1",
        "data": {
            "basicRate": 0.50,
            "originalAmount": 1000,
            "basicRefactor": 0.70
        }
    });
}


export const getBusinessRuleApi = (ruleName: string) => {
    return request.get<Record<string, TVariable>>(`/api/business-rules/${ruleName}`).then(res => res.data);
}
