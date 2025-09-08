const mongoose = require("mongoose");

const terminologySchema = new mongoose.Schema({
  namaste_code: { type: String, required: true, unique: true },
  display_name: String,
  hindi_name: String,
  english_name: String,
  medical_system: String,
  category: String,
  subcategory: String,
  definition: String,
  synonyms: [String],
  severity_levels: [String],
  dosha_involvement: {
    primary: String,
    secondary: [String],
  },
  icd11_mappings: {
    tm2_code: String,
    tm2_display: String,
    biomedicine_code: String,
    biomedicine_display: String,
  },
  who_international_terminology: {
    code: String,
    display: String,
    definition: String,
  },
  clinical_features: [String],
  traditional_symptoms: [String],
  hierarchy: Object,
  parent_code: String,
  child_codes: [String],
  last_updated: Date,
  status: String,
});

module.exports = mongoose.model("terminology", terminologySchema);