const toggleBtn = document.querySelector('.toggle-btn');
const linksContainer = document.querySelector('.links-container');

toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    linksContainer.classList.toggle('hide');
})