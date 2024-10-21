const mongoose = require('mongoose');

const InstitutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cnpj: { type: String, required: true },
  mantenedor: { type: String, required: true },
  cnpjMantenedor: { type: String, required: true },
  rua: { type: String, required: true },
  numero: { type: String, required: true },
  complemento: { type: String },
  bairro: { type: String, required: true },
  location: { type: String, required: true },
  cep: { type: String, required: true },
  telefone: { type: String, required: true },
  email: { type: String, required: true },
  site: { type: String, required: true },
  inep: { type: String, required: true },
  responsavel: { type: String, required: true },
  cargoResponsavel: { type: String, required: true },
  telefoneResponsavel: { type: String, required: true },
  description: { type: String, required: true },
  schoolType: { type: String, required: true },
  modalidade: { type: [String], required: false },
  averageRating: { type: Number, default: 0 },
  totalReviews: {type: Number, default: 0}

});

module.exports = mongoose.model('Institution', InstitutionSchema);
