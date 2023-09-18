export async function fetchData(query) {
  try {
    const response = await fetch("http://lac-lyell-test.is.ed.ac.uk:5000/api/" +query);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
}