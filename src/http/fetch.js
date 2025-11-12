const URL = "https://do-it-be.onrender.com/";

export async function fetchTodoList() {
  const response = await fetch(URL + "getTodo");
  const res = await response.json();
  return res;
}

export async function fetchTodoHistory() {
  const response = await fetch(URL + "getHistory");
  const res = await response.json();
  return res;
}

export async function submitTodo(payload) {
  const response = await fetch(URL + "submitTodo", {
    body: JSON.stringify(payload),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Adding user place failed");
  }

  return await response.json();
}
