const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// ✅ Create Category
router.post("/Create_Category", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Category name is required" });
        }

        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get All Categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get Category by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Update Category
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category updated", category: updatedCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Delete Category by ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
