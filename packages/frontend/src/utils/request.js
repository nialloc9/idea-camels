export const post = async (url, body, headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }) => {

    const rawResponse = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });

  const content = await rawResponse.json();
 
  return content;
}