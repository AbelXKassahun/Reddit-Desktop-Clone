// async function imgFetch(){
//     const image_path = props.image_path
//     const url = `https://localhost:7155/Media/GetImage?image_path=${image_path}`

//     await fetch(url, {
//         method: "GET",
//         // mode: 'no-cors',

//         headers: {
//             // "Content-Type": "application/json"
//             "Content-Type": "image/jpg",
//             // "Authorization": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImFjNzFlNjY2LTFkNzAtNDdiMy05MDhmLTJhZDYxNjMwOThmOCIsInN1YiI6ImFiZWwiLCJlbWFpbCI6ImFiZWwiLCJqdGkiOiI1MDkyYzM3MC05ZDQyLTRjZWYtYmFkNy0zYWFkYTY1NjJjZmEiLCJuYmYiOjE3MDM3NDQ4NDgsImV4cCI6MTcwMzc0NTE0OCwiaWF0IjoxNzAzNzQ0ODQ4fQ.tTKCEBiIbEbWHE1Th6nEzsvQXCgRvHDziY0_HvIngzdwpHBaFXQsaP-Qx8dVDcciXVv8wHnMDJRd7f9JFAzB9g"
//         },
//     })
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         // console.log(response.status);
//         // console.log(response.headers.get('Content-Type'));
//         return response.blob()
//     })
//     .then((blob) => {
//         const objectUrl = URL.createObjectURL(blob);
//         setImageUrl(objectUrl);
//     })
//     .catch((error) => {
//         console.error('There was a problem fetching the image:', error);
//         throw error;
//     })
// }

// '<div id="parent">
//   <p id="child">Child Element</p>
// </div>'

// document.getElementById('parent').addEventListener('click', function() {
//   console.log('Parent clicked');
// });

// document.getElementById('child').addEventListener('click', function(event) {
//   event.stopPropagation(); // Prevent event from bubbling up
//   console.log('Child clicked');
// });
