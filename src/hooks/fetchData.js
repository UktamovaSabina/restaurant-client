export default async function renderData(query, variables = {}) {
  let response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables
    })
  })
  const { data } = await (await response.json());
  return data
}