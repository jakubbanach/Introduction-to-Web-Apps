let currentImageIndex=0;
const text = document.getElementById('text');

function showImage(element) {
    const modal = document.getElementById('focus');
    const modalImage = document.getElementById('focusImage');

    modalImage.src = element.srcElement.attributes[0].nodeValue;
    modal.style.display = 'block';
    currentImageIndex = parseInt(element.target.id);

    const galleryImages = document.querySelectorAll('.catalog .card img');
    galleryImages.forEach(img => {
        img.style.opacity = '0.3';
    });
}

function hideImage() {
    const modal = document.getElementById('focus');
    modal.style.display = 'none';

    const galleryImages = document.querySelectorAll('.catalog .card img');
    galleryImages.forEach(img => {
        img.style.opacity = '1';
    });
    currentImageIndex=0;
}

function prevImage() {
    if (currentImageIndex !== 1){
        currentImageIndex -= 1;
    }else{
        currentImageIndex = 11;
    }
    updateFocusImage();
}

function nextImage() {
    if (currentImageIndex !== 11){
        currentImageIndex += 1;
    }else{
        currentImageIndex = 1;
    }
    updateFocusImage();
}

function updateFocusImage() {
    const focusImage = document.getElementById('focusImage');
    const image = document.getElementById(`${currentImageIndex}`);
    focusImage.src = image.src;
}

const catalog = document.querySelector('.catalog');
const focus = document.getElementById('focus');

catalog.addEventListener('click', (event) => {
    if(focus.style.display === "block"){
        hideImage(event);
    }
    else if(event.target.localName === "img"){
        showImage(event);
    }
});