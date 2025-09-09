const express = require("express");
const router = express.Router();
const Terminology = require("../models/Terminology");

// ✅ Create bulk data (for dummy seeding)
router.post("/seed", async (req, res) => {
  try {
    const data = req.body;
    await Terminology.insertMany(data);
    res.json({ message: "Dummy data inserted successfully", count: data.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Search endpoint
router.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const results = await Terminology.find({
      $or: [
        { display_name: new RegExp(query, "i") },
        { english_name: new RegExp(query, "i") },
        { hindi_name: new RegExp(query, "i") },
        { synonyms: new RegExp(query, "i") },
      ],
    });
    res.json({ query, total_results: results.length, results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Lookup endpoint
router.get("/lookup/:code", async (req, res) => {
  try {
    const record = await Terminology.findOne({ namaste_code: req.params.code });
    if (!record) return res.status(404).json({ error: "Code not found" });
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/deleteAll", async (req, res) => {
  try {
    const result = await Terminology.deleteMany({});
    res.json({ message: "All records deleted", deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
