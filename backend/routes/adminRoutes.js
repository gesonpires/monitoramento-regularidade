const express = require('express');
const Institution = require('../models/Institution');
const Review = require('../models/Review');

const router = express.Router();

// Criar nova instituição
router.post('/institution', async (req, res) => {
  const { name, location, description } = req.body;
  try {
    const newInstitution = new Institution({ name, location, description });
    await newInstitution.save();
    res.status(201).json({ msg: 'Instituição criada com sucesso' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

// Obter todas as instituições
router.get('/institution', async (req, res) => {
  try {
    const institutions = await Institution.find();
    res.json(institutions);
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

// Obter uma instituição específica
router.get('/institution/:id', async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);
    if (!institution) {
      return res.status(404).json({ msg: 'Instituição não encontrada' });
    }
    res.json(institution);
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

// Aprovar ou rejeitar avaliação
router.put('/review/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ msg: 'Avaliação não encontrada' });
    }

    review.status = status;
    await review.save();
    res.json({ msg: 'Status da avaliação atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

module.exports = router;
