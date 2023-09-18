export async function fetchData(query) {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/" +query);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
}