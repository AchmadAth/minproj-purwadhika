export default function getData() {
  fetch(`https://jsonplaceholder.typicode.com/users/1/posts`)
    .then((response) => response.json())
    .then((json) => console.log(json));
}
