const express = require('express');
const Institution = require('../models/Institution');

const router = express.Router();

// Rota para buscar todas as instituições
router.get('/', async (req, res) => {
  try {
    const institutions = await Institution.find();
    res.json(institutions);
  } catch (err) {
    console.error('Erro ao buscar instituições', err);
    res.status(500).json({ msg: 'Erro ao buscar instituições' });
  }
});

// Rota para criar uma nova instituição
router.post('/', async (req, res) => {
  const {
    name, cnpj, mantenedor, cnpjMantenedor, rua, numero, complemento,
    bairro, location, cep, telefone, email, site, inep, responsavel,
    cargoResponsavel, telefoneResponsavel, description
  } = req.body;

  try {
    const newInstitution = new Institution({
      name, cnpj, mantenedor, cnpjMantenedor, rua, numero, complemento,
      bairro, location, cep, telefone, email, site, inep, responsavel,
      cargoResponsavel, telefoneResponsavel, description
    });

    await newInstitution.save();
    res.status(201).json(newInstitution);
  } catch (err) {
    console.error('Erro ao adicionar instituição', err);
    res.status(500).json({ msg: 'Erro ao adicionar instituição' });
  }
});

// Rota para deletar uma instituição
router.delete('/:id', async (req, res) => {
  try {
    await Institution.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Instituição removida com sucesso' });
  } catch (err) {
    console.error('Erro ao remover instituição', err);
    res.status(500).json({ msg: 'Erro ao remover instituição' });
  }
});

// Rota para atualizar uma instituição
router.put('/:id', async (req, res) => {
  const {
    name, cnpj, mantenedor, cnpjMantenedor, rua, numero, complemento,
    bairro, location, cep, telefone, email, site, inep, responsavel,
    cargoResponsavel, telefoneResponsavel, description
  } = req.body;

  try {
    const updatedInstitution = await Institution.findByIdAndUpdate(
      req.params.id,
      {
        name, cnpj, mantenedor, cnpjMantenedor, rua, numero, complemento,
        bairro, location, cep, telefone, email, site, inep, responsavel,
        cargoResponsavel, telefoneResponsavel, description
      },
      { new: true }
    );
    res.status(200).json(updatedInstitution);
  } catch (err) {
    console.error('Erro ao atualizar instituição', err);
    res.status(500).json({ msg: 'Erro ao atualizar instituição' });
  }
});

// Rota para buscar uma instituição específica
router.get('/:id', async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);
    if (!institution) {
      return res.status(404).json({ msg: 'Instituição não encontrada' });
    }
    res.json(institution);
  } catch (err) {
    console.error('Erro ao buscar instituição', err);
    res.status(500).json({ msg: 'Erro ao buscar instituição' });
  }
});

module.exports = router;
