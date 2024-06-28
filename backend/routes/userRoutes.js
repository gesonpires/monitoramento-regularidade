const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Rota de registro de usuário
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Dados recebidos para registro:', { name, email, password });

  if (!name || !email || !password) {
    console.log('Campos obrigatórios faltando');
    return res.status(400).json({ msg: 'Por favor, preencha todos os campos' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('Usuário já registrado');
      return res.status(400).json({ msg: 'Usuário já registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    console.log('Usuário registrado com sucesso');
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Erro no servidor:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

// Rota de login de usuário
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Tentativa de login com email:', email); // Log dos dados recebidos

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Usuário não encontrado');
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Comparação de senhas:', isMatch); // Log da comparação de senhas

    if (!isMatch) {
      console.log('Senha inválida');
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user._id }, 'seuSegredoAqui', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Erro no servidor:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

module.exports = router;
