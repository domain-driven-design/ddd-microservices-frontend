import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// 你的 ngrok 提供的远程服务 URL
const ngrokUrl = 'https://ded3-212-50-248-155.ngrok-free.app';

// 设置代理的路径为 "/api"。当访问 localhost:3000/api 时，所有请求都会被代理到 ngrokUrl
app.use('/api/business-rules/expression_variables', async (req, res) => {
    try {
        const response = await fetch(`${ngrokUrl}/business-rules/expression_variables`)
        const data = await response.json()
        res.json(data)
    } catch (e) {
        res.json({"rmbAmount":{"name":"折人民币金额","description":"将原价按人民币汇率换算的金额","beIncludedSubsidy":false,"beAnnualized":false,"beFirstYear":false,"beFullLife":false,"type":"AMOUNT"},"upperLimitInterestRate":{"name":"上限利率","description":"在基准利率的基础上调高的成数","beIncludedSubsidy":false,"beAnnualized":false,"beFirstYear":true,"beFullLife":false,"type":"PERCENT"},"benchmarkInterestRate":{"name":"基准利率","description":"商业银行存款、贷款、贴现等业务的指导性利率","beIncludedSubsidy":false,"beAnnualized":true,"beFirstYear":false,"beFullLife":false,"type":"PERCENT"},"listingPrice":{"name":"挂牌利率","description":"对外公布的当前存款或贷款的利率","beIncludedSubsidy":false,"beAnnualized":true,"beFirstYear":false,"beFullLife":false,"type":"PERCENT"},"basicRefactor":{"name":"折算基准","description":"折算基准","beIncludedSubsidy":true,"beAnnualized":false,"beFirstYear":false,"beFullLife":true,"type":"FACTOR"},"operatingCost":{"name":"运营成本","description":"运营成本","beIncludedSubsidy":false,"beAnnualized":true,"beFirstYear":false,"beFullLife":true,"type":"AMOUNT"},"periodicCost":{"name":"周期成本","description":"周期成本","beIncludedSubsidy":false,"beAnnualized":true,"beFirstYear":false,"beFullLife":true,"type":"AMOUNT"},"proposedInterestRateIncome":{"name":"拟定利率利息收入","description":"拟定利率利息收入","beIncludedSubsidy":true,"beAnnualized":false,"beFirstYear":false,"beFullLife":true,"type":"AMOUNT"},"proposedInterestRateFullLifeSubsidyEva":{"name":"本币业务全生命周期EVA","description":"本币业务全生命周期EVA","beIncludedSubsidy":true,"beAnnualized":true,"beFirstYear":false,"beFullLife":true,"type":"AMOUNT"},"originalAllScenesEva":{"name":"原始全情景","description":"原始全情景","beIncludedSubsidy":true,"beAnnualized":false,"beFirstYear":false,"beFullLife":true,"type":"AMOUNT"},"customerSceneEva":{"name":"客户情景eva","description":"客户情景eva","beIncludedSubsidy":true,"beAnnualized":false,"beFirstYear":false,"beFullLife":true,"type":"AMOUNT"},"innerSceneEva":{"name":"内环eva","description":"内环eva","beIncludedSubsidy":true,"beAnnualized":false,"beFirstYear":false,"beFullLife":true,"type":"AMOUNT"},"groupSceneEva":{"name":"外环eva","description":"外环eva","beIncludedSubsidy":true,"beAnnualized":false,"beFirstYear":false,"beFullLife":true,"type":"AMOUNT"},"businessRaroc":{"name":"本币业务Raroc","description":"本币业务Raroc","beIncludedSubsidy":true,"beAnnualized":false,"beFirstYear":false,"beFullLife":true,"type":"AMOUNT"},"termMonth":{"name":"期限","description":"期限","beIncludedSubsidy":true,"beAnnualized":false,"beFirstYear":false,"beFullLife":true,"type":"AMOUNT"},"originalAllScenesFirstYearEva":{"name":"原始全情景全年","description":"原始全情景全年","beIncludedSubsidy":true,"beAnnualized":false,"beFirstYear":false,"beFullLife":true,"type":"AMOUNT"}});
    }
});

// POST
app.post('/api/calculate', async (req, res) => {
    try {
        const response = await fetch(`${ngrokUrl}/calculation/calculate`, {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
        res.json(data)
    } catch (e) {
        res.json([
            {
                "name": "benchmarkInterestRate",
                "expression": "basicRefactor*listingPrice",
                "value": "0.25",
                "children": [
                    {
                        "name": "listingPrice",
                        "expression": null,
                        "value": "0.50",
                        "children": null,
                        "params": {}
                    },
                    {
                        "name": "basicRefactor",
                        "expression": null,
                        "value": "0.50",
                        "children": null,
                        "params": {}
                    }
                ],
                "params": {
                    "listingPrice": "0.50",
                    "basicRefactor": "0.50"
                }
            },
            {
                "name": "periodicCost",
                "expression": null,
                "value": "900.0",
                "children": null,
                "params": {}
            },
            {
                "name": "listingPrice",
                "expression": null,
                "value": "0.50",
                "children": null,
                "params": {}
            },
            {
                "name": "upperLimitInterestRate",
                "expression": "benchmarkInterestRate*rmbAmount",
                "value": "250.0",
                "children": [
                    {
                        "name": "benchmarkInterestRate",
                        "expression": "basicRefactor*listingPrice",
                        "value": "0.25",
                        "children": [
                            {
                                "name": "listingPrice",
                                "expression": null,
                                "value": "0.50",
                                "children": null,
                                "params": {}
                            },
                            {
                                "name": "basicRefactor",
                                "expression": null,
                                "value": "0.50",
                                "children": null,
                                "params": {}
                            }
                        ],
                        "params": {
                            "listingPrice": "0.50",
                            "basicRefactor": "0.50"
                        }
                    },
                    {
                        "name": "rmbAmount",
                        "expression": null,
                        "value": "1000",
                        "children": null,
                        "params": {}
                    }
                ],
                "params": {
                    "benchmarkInterestRate": "0.25",
                    "rmbAmount": "1000"
                }
            },
            {
                "name": "termMonth",
                "expression": null,
                "value": "12",
                "children": null,
                "params": {}
            },
            {
                "name": "basicRefactor",
                "expression": null,
                "value": "0.50",
                "children": null,
                "params": {}
            },
            {
                "name": "rmbAmount",
                "expression": null,
                "value": "1000",
                "children": null,
                "params": {}
            },
            {
                "name": "originalAllScenesFirstYearEva",
                "expression": "originalAllScenesEva/termMonth",
                "value": "0.46",
                "children": [
                    {
                        "name": "originalAllScenesEva",
                        "expression": "(customerSceneEva+innerSceneEva+groupSceneEva)-listingPrice",
                        "value": "5.50",
                        "children": [
                            {
                                "name": "listingPrice",
                                "expression": null,
                                "value": "0.50",
                                "children": null,
                                "params": {}
                            }
                        ],
                        "params": {
                            "innerSceneEva": "2.0",
                            "listingPrice": "0.50",
                            "customerSceneEva": "1.0",
                            "groupSceneEva": "3.0"
                        }
                    },
                    {
                        "name": "termMonth",
                        "expression": null,
                        "value": "12",
                        "children": null,
                        "params": {}
                    }
                ],
                "params": {
                    "originalAllScenesEva": "5.50",
                    "termMonth": "12"
                }
            },
            {
                "name": "proposedInterestRateIncome",
                "expression": null,
                "value": "1000.0",
                "children": null,
                "params": {}
            },
            {
                "name": "operatingCost",
                "expression": null,
                "value": "9.0",
                "children": null,
                "params": {}
            },
            {
                "name": "originalAllScenesEva",
                "expression": "(customerSceneEva+innerSceneEva+groupSceneEva)-listingPrice",
                "value": "5.50",
                "children": [
                    {
                        "name": "listingPrice",
                        "expression": null,
                        "value": "0.50",
                        "children": null,
                        "params": {}
                    }
                ],
                "params": {
                    "innerSceneEva": "2.0",
                    "listingPrice": "0.50",
                    "customerSceneEva": "1.0",
                    "groupSceneEva": "3.0"
                }
            },
            {
                "name": "proposedInterestRateFullLifeSubsidyEva",
                "expression": "proposedInterestRateIncome-operatingCost-periodicCost+originalAllScenesFirstYearEva",
                "value": "91.46",
                "children": [
                    {
                        "name": "proposedInterestRateIncome",
                        "expression": null,
                        "value": "1000.0",
                        "children": null,
                        "params": {}
                    },
                    {
                        "name": "operatingCost",
                        "expression": null,
                        "value": "9.0",
                        "children": null,
                        "params": {}
                    },
                    {
                        "name": "periodicCost",
                        "expression": null,
                        "value": "900.0",
                        "children": [
                            {
                                "name": "originalAllScenesEva",
                                "expression": "(customerSceneEva+innerSceneEva+groupSceneEva)-listingPrice",
                                "value": "5.50",
                                "children": [
                                    {
                                        "name": "listingPrice",
                                        "expression": null,
                                        "value": "0.50",
                                        "children": null,
                                        "params": {}
                                    }
                                ],
                                "params": {
                                    "innerSceneEva": "2.0",
                                    "listingPrice": "0.50",
                                    "customerSceneEva": "1.0",
                                    "groupSceneEva": "3.0"
                                }
                            },
                            {
                                "name": "termMonth",
                                "expression": null,
                                "value": "12",
                                "children": null,
                                "params": {}
                            }
                        ],
                        "params": {
                            "originalAllScenesEva": "5.50",
                            "termMonth": "12"
                        }
                    },
                    {
                        "name": "originalAllScenesFirstYearEva",
                        "expression": "originalAllScenesEva/termMonth",
                        "value": "0.46",
                        "children": [
                            {
                                "name": "originalAllScenesEva",
                                "expression": "(customerSceneEva+innerSceneEva+groupSceneEva)-listingPrice",
                                "value": "5.50",
                                "children": [
                                    {
                                        "name": "listingPrice",
                                        "expression": null,
                                        "value": "0.50",
                                        "children": null,
                                        "params": {}
                                    }
                                ],
                                "params": {
                                    "innerSceneEva": "2.0",
                                    "listingPrice": "0.50",
                                    "customerSceneEva": "1.0",
                                    "groupSceneEva": "3.0"
                                }
                            },
                            {
                                "name": "termMonth",
                                "expression": null,
                                "value": "12",
                                "children": null,
                                "params": {}
                            }
                        ],
                        "params": {
                            "originalAllScenesEva": "5.50",
                            "termMonth": "12"
                        }
                    }
                ],
                "params": {
                    "operatingCost": "9.0",
                    "periodicCost": "900.0",
                    "originalAllScenesFirstYearEva": "0.46",
                    "proposedInterestRateIncome": "1000.0"
                }
            },
            {
                "name": "businessRaroc",
                "expression": "proposedInterestRateFullLifeSubsidyEva/operatingCost",
                "value": "10.16",
                "children": [
                    {
                        "name": "proposedInterestRateFullLifeSubsidyEva",
                        "expression": "proposedInterestRateIncome-operatingCost-periodicCost+originalAllScenesFirstYearEva",
                        "value": "91.46",
                        "children": [
                            {
                                "name": "proposedInterestRateIncome",
                                "expression": null,
                                "value": "1000.0",
                                "children": null,
                                "params": {}
                            },
                            {
                                "name": "operatingCost",
                                "expression": null,
                                "value": "9.0",
                                "children": null,
                                "params": {}
                            },
                            {
                                "name": "periodicCost",
                                "expression": null,
                                "value": "900.0",
                                "children": null,
                                "params": {}
                            },
                            {
                                "name": "originalAllScenesFirstYearEva",
                                "expression": "originalAllScenesEva/termMonth",
                                "value": "0.46",
                                "children": [
                                    {
                                        "name": "originalAllScenesEva",
                                        "expression": "(customerSceneEva+innerSceneEva+groupSceneEva)-listingPrice",
                                        "value": "5.50",
                                        "children": [
                                            {
                                                "name": "listingPrice",
                                                "expression": null,
                                                "value": "0.50",
                                                "children": null,
                                                "params": {}
                                            }
                                        ],
                                        "params": {
                                            "innerSceneEva": "2.0",
                                            "listingPrice": "0.50",
                                            "customerSceneEva": "1.0",
                                            "groupSceneEva": "3.0"
                                        }
                                    },
                                    {
                                        "name": "termMonth",
                                        "expression": null,
                                        "value": "12",
                                        "children": null,
                                        "params": {}
                                    }
                                ],
                                "params": {
                                    "originalAllScenesEva": "5.50",
                                    "termMonth": "12"
                                }
                            }
                        ],
                        "params": {
                            "operatingCost": "9.0",
                            "periodicCost": "900.0",
                            "originalAllScenesFirstYearEva": "0.46",
                            "proposedInterestRateIncome": "1000.0"
                        }
                    },
                    {
                        "name": "operatingCost",
                        "expression": null,
                        "value": "9.0",
                        "children": null,
                        "params": {}
                    }
                ],
                "params": {
                    "operatingCost": "9.0",
                    "proposedInterestRateFullLifeSubsidyEva": "91.46"
                }
            }
        ]);
    }
});

// 设置应用监听的端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

