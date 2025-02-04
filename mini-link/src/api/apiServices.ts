
const baseURL = import.meta.env.VITE_API_URL;

interface UserInputTypes {
    url: string;
    alias: string;
}


export const createMiniLink = async (userInput: UserInputTypes) => {
  const payload = Object.fromEntries(
    Object.entries(userInput).filter(([_, v]) => v !== "")
  );
  try {
    const res = await fetch(baseURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    alert(res.status);
  } catch (error) {
    console.error(error);
  }  
}