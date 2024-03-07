import {EFormulaVariableType} from "../constants/variable.ts";

// value, options: {decimal, unit}
const formatPercent = (value: string, options: { decimal?: number, unit?: string } = {}) => {
    const decimal = options.decimal ?? 2;
    const unit = options.unit ?? '%';
    return `${(Number(value) * 100).toFixed(decimal)}${unit}`;
}

// value, options: {单位}
const formatAmount = (value: string, options: { unit?: string } = {}) => {
    const unit = options.unit ?? '';
    return new Intl.NumberFormat('zh-CN').format(Number(value)) + unit;
}

const formatNumber = (value: string, options: { decimal?: number, unit?: string } = {}) => {
    const decimal = options.decimal ?? 2;
    const unit = options.unit ?? '';
    return Number(value).toFixed(decimal) + unit;
}

export const formatNodeValue = (value: string, type: EFormulaVariableType): string => {
    switch (type) {
        case EFormulaVariableType.PERCENT:
            return formatPercent(value, {decimal: 4, unit: '%'});
        case EFormulaVariableType.AMOUNT:
            return formatAmount(value, {unit: '元'});
        case EFormulaVariableType.FACTOR:
            return formatNumber(value, {decimal: 4});
        case EFormulaVariableType.DAY:
            return formatNumber(value, {decimal: 2, unit: '天'});
        case EFormulaVariableType.MONTH:
            return formatNumber(value, {decimal: 2, unit: '月'});
        default:
            return value;
    }
}
