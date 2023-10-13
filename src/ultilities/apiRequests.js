const postAPIRequest = (headerkey, url, params) => {
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-API-Key': headerkey,
    },
    body: JSON.stringify(params),
  })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)));
};

// 1FhguFyZBH7UdPGHm6mjEsgk
// const postAPIRequest = () => {
//   fetch('https://reqbin.com/echo/post/json', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({id: 78912}),
//   })
//     .then(response => response.json())
//     .then(response => console.log(JSON.stringify(response)));
// };
