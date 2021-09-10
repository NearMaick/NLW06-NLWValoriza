import express from 'express';

const app = express();

app.get('/test', (request, response) => {
  return response.send('Olá olá')
});

app.listen(3000, () => console.log('Server is running'));