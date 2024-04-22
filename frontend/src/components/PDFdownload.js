async function downloadImages(imageUrls) {
    for (let i = 0; i < imageUrls.length; i++) {
        const response = await fetch(imageUrls[i]);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `image_${i + 1}.jpg`; // You can modify the filename as needed
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// const imageUrls = [
//     'https://www.example.com/image1.jpg',
//     'https://www.example.com/image2.jpg',
//     'https://www.example.com/image3.jpg'
// ];
//
// downloadImages(imageUrls)
//     .then(() => console.log('Images downloaded successfully'))
//     .catch(error => console.error('Error downloading images:', error));
