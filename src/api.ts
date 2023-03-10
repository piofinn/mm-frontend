const API_ROOT_URL = "https://zeeq.pythonanywhere.com";

export async function getMood() {
  const response = await fetch("https://zeeq.pythonanywhere.com/mood", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
}

export async function getAll(): Promise<[number, string][]> {
  const response = await fetch("https://zeeq.pythonanywhere.com/get_all", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
}
