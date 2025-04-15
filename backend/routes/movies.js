import express from "express";
import Movie from "../models/movieSchema.js"; 

const router = express.Router();


router.get("/latest", async (req, res) => {
  try {
    const latestMovies = await Movie.find().sort({ _id: -1 }).limit(5);
    res.status(200).json(latestMovies);
  } catch (error) {
    console.error("Błąd podczas pobierania ostatnich filmów:", error);
    res.status(500).json({ message: "Nie udało się pobrać filmów." });
  }
});


router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Błąd podczas pobierania filmów:", error);
    res.status(500).json({ message: "Nie udało się pobrać filmów." });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Film nie znaleziony" });
    }
    res.status(200).json(movie);
  } catch (error) {
    console.error("Błąd podczas pobierania szczegółów filmu:", error);
    res.status(500).json({ message: "Błąd serwera" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { title, director, year, genre, seen } = req.body;


    if (!title || !director || !year || typeof genre !== "string") {
      return res.status(400).json({
        message: "Brak wymaganych danych: title, director, year lub genre nie jest stringiem.",
      });
    }

    const newMovie = await Movie.create({ title, director, year, genre, seen });
    res.status(201).json(newMovie);
  } catch (error) {
    console.error("Błąd podczas dodawania filmu:", error);
    res.status(500).json({ message: "Nie udało się dodać filmu." });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const result = await Movie.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Nie znaleziono filmu do usunięcia." });
    }
    res.status(200).json({ message: "Film został usunięty." });
  } catch (error) {
    console.error("Błąd podczas usuwania filmu:", error);
    res.status(500).json({ message: "Nie udało się usunąć filmu." });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { genre } = req.body;

    
    if (genre && typeof genre !== "string") {
      return res.status(400).json({ message: "Pole genre musi być stringiem." });
    }

    const updatedMovie = await Movie.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Nie znaleziono filmu do zaktualizowania." });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error("Błąd podczas aktualizacji filmu:", error);
    res.status(500).json({ message: "Nie udało się zaktualizować filmu." });
  }
});

export default router;
