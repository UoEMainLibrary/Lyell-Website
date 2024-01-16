export async function fetchData(query) {
  try {
    const response = await fetch("https://test.lyell.ed.ac.uk/api/" +query);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
}