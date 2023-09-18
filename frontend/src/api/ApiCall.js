export async function fetchData(query) {
  try {
    const response = await fetch("http://localhost:5000/api/" +query);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
}