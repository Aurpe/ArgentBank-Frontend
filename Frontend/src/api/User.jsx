import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Vérification de la validité de la réponse (code HTTP)
      if (!response.ok) {
        const errorData = await response.text(); // Lire la réponse sous forme de texte brut
        // Vérification si la réponse est bien du JSON
        try {
          const jsonError = JSON.parse(errorData);
          throw new Error(
            jsonError.message ||
              "Échec de la récupération du profil utilisateur"
          );
        } catch (jsonError) {
          // Si la réponse n'est pas du JSON, on renvoie une erreur générique
          throw new Error(
            "Échec de la récupération du profil utilisateur, réponse non JSON"
          );
        }
      }

      // Vérification du type de contenu
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json(); // Si c'est du JSON, on le parse
        return data; // Retourner les données complètes (pas seulement data.body, car ça dépend de l'API)
      } else {
        throw new Error("La réponse n'est pas au format JSON");
      }
    } catch (error) {
      return rejectWithValue(error.message); // Retourner l'erreur si quelque chose échoue
    }
  }
);
export default fetchUser;
