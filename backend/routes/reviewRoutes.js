const express = require('express');
const Review = require('../models/Review');
const Institution = require('../models/Institution');

const router = express.Router();

// Rota para buscar todas as avaliações de uma instituição
router.get('/institution/:institutionId', async (req, res) => {
  try {
    const reviews = await Review.find({ institution: req.params.institutionId }).populate('user', 'name');
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ msg: 'Avaliações não encontradas' });
    }
    res.json(reviews);
  } catch (err) {
    console.error('Erro no servidor ao buscar avaliações', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

// Rota para buscar avaliações de uma instituição específica
router.get('/:institutionId', async (req, res) => {
  try {
    const reviews = await Review.find({ institution: req.params.institutionId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error('Erro ao buscar avaliações', err);
    res.status(500).json({ msg: 'Erro ao buscar avaliações' });
  }
});

// Rota para criar uma nova avaliação
router.post('/', async (req, res) => {
  const { userId, institutionId, criteria } = req.body;
  console.log('Dados recebidos para avaliação:', { userId, institutionId, criteria });

  try {
    const institution = await Institution.findById(institutionId);
    if (!institution) {
      console.log('Instituição não encontrada');
      return res.status(404).json({ msg: 'Instituição não encontrada' });
    }

    const totalRating = criteria.reduce((sum, c) => sum + c.rating, 0) / criteria.length;
    const newReview = new Review({ user: userId, institution: institutionId, criteria, totalRating });

    await newReview.save();
    console.log('Avaliação submetida com sucesso');
    res.status(201).json(newReview);
  } catch (err) {
    console.error('Erro ao submeter avaliação', err);
    res.status(500).json({ msg: 'Erro ao submeter avaliação' });
  }
});

module.exports = router;
