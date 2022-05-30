const url = 'https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e';

export const getProducts = () => {
  return fetch(url)
    .then(result => {
      if (!result.ok) {
        throw new Error(`${result.status} - ${result.statusText}`)
      }

      return result.json();
    })
};
