const API_BASE_URL_ = "http://localhost:3001/api/v1";

export const UserName = async (newUserName, token) => {
  try {
    const response = await fetch(`${API_BASE_URL_}/user/profile`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userName: newUserName,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update user profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
