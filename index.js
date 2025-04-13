require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para processar JSON
app.use(express.json());

// Rota principal para o chat
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            process.env.AZURE_OPENAI_ENDPOINT,
            {
                prompt: userMessage,
                max_tokens: 100,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.AZURE_OPENAI_API_KEY}`,
                },
            }
        );

        res.json({ response: response.data.choices[0].text });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao processar a mensagem.');
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});