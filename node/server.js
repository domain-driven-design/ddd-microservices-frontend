import express from "express";

const app = express();

// 你的 ngrok 提供的远程服务 URL
const ngrokUrl = 'http://2e8e-23-106-140-196.ngrok-free.app';

// 设置代理的路径为 "/api"。当访问 localhost:3000/api 时，所有请求都会被代理到 ngrokUrl
app.use('/api/business-rules/expression_variables', async (req, res) => {
    const response = await fetch('https://2e8e-23-106-140-196.ngrok-free.app/business-rules/expression_variables')
    const data = await response.json()
    console.log(data)
    res.json(data)
});

// 设置应用监听的端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

