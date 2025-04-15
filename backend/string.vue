import mongoose from "mongoose";
import Movie from "./models/movieSchema.js"; // Upewnij się, że ścieżka jest poprawna

// Funkcja główna
const upgradeGenres = async () => {
  try {
    // Połącz się z bazą danych MongoDB
    const db = await mongoose.connect("mongodb://localhost:27017/nazwaTwojejBazy", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Połączono z bazą danych");

    // Znajdź wszystkie filmy w bazie danych
    const movies = await Movie.find();
    console.log(`Znaleziono ${movies.length} filmów`);

    for (const movie of movies) {
      if (typeof movie.genre !== "string") {
        // Konwertuj `genre` na string
        const updatedGenre = String(movie.genre);

        // Zaktualizuj film w bazie danych
        await Movie.updateOne({ _id: movie._id }, { genre: updatedGenre });
        console.log(`Zaktualizowano film: ${movie.title} (${movie._id})`);
      }
    }

    console.log("Aktualizacja zakończona pomyślnie!");
    db.disconnect();
  } catch (error) {
    console.error("Błąd podczas aktualizacji:", error);
  }
};

// Uruchom funkcję główną
upgradeGenres();

