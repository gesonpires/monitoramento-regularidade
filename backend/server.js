const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const institutionRoutes = require('./routes/institutionRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); // Certifique-se de importar corretamente

const app = express();

app.use(cors());
app.use(express.json());

// Conectando ao banco de dados
mongoose.connect('mongodb://localhost:27017/monitoramento-ue', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/users', userRoutes);
app.use('/api/institutions', institutionRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
