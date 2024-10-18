

document.addEventListener('DOMContentLoaded', function() {
const page = document.querySelector('#page');

if (!page) {
    console.error('The #page element was not found!');
    return;
}

// Function to resize the logo dynamically based on window width
const resizeLogo = () => {
    const logo = document.querySelector('a img[alt="Logo"]');
    const windowWidth = window.innerWidth;
    const logoSize = windowWidth <= 768 ? 200 : windowWidth * 0.25;
    if (logo) {
    logo.style.width = `${logoSize}px`;
    }
};

// Add the logo with initial size based on window width
const addLogo = function() {
    const logoSize = window.innerWidth <= 768 ? 200 : window.innerWidth * 0.25;
    const logoHtml = `
    <a href="/" style="display: inline-block; width: ${logoSize}px; height: auto; position: absolute; left: 25px; top: 50px; z-index: 999;">
        <img src="https://images.squarespace-cdn.com/content/6700ec5eab9f781ee314a467/772c6fc2-0d72-456a-809b-4db63778f677/Omics+One+white.png?content-type=image%2Fpng" 
            alt="Logo" style="width: ${logoSize}px; height: auto;">
    </a>`;
    page.insertAdjacentHTML('afterbegin', logoHtml);
    console.log('Logo added to the page');
};

// Add the burger menu
const addBurgerMenu = function() {
    const burgerHtml = `
    <div id="burgerMenu" style="position: absolute; right: 50px; top: 50px; z-index: 999; cursor: pointer;">
        <div class="burger-line" style="width: 30px; height: 4px; background-color: #fff; margin: 6px 0;"></div>
        <div class="burger-line" style="width: 30px; height: 4px; background-color: #fff; margin: 6px 0;"></div>
        <div class="burger-line" style="width: 30px; height: 4px; background-color: #fff; margin: 6px 0;"></div>
    </div>

    <!-- Burger Menu Dropdown -->
    <nav id="mobileNav" style="display: none; position: fixed; top: 80px; right: 50px; width: 200px; background-color: rgba(0, 0, 0, 0.9); padding: 10px; color: white; z-index: 1000;">
        <ul style="list-style: none; padding: 0; text-align: center; margin: 0;">
        <li style="margin-bottom: 10px;"><a href="/" style="color: white; text-decoration: none; font-size: 18px;">Home</a></li>
        <li style="margin-bottom: 10px;"><a href="/bioinformatics" style="color: white; text-decoration: none; font-size: 18px;">Free Bioinformatics</a></li>
            <li style="margin-bottom: 10px;"><a href="#" class="contact-link" style="color: white; text-decoration: none; font-size: 18px;">Contact Us</a></li>
        </ul>
    </nav>`;
    page.insertAdjacentHTML('beforeend', burgerHtml);

    const burgerMenu = document.getElementById('burgerMenu');
    const mobileNav = document.getElementById('mobileNav');

    burgerMenu.addEventListener('click', () => {
    if (mobileNav.style.display === 'none' || mobileNav.style.display === '') {
        mobileNav.style.display = 'block';
    } else {
        mobileNav.style.display = 'none';
    }
    });

};

// Call the functions to add the logo and burger menu
addLogo();
addBurgerMenu();
window.addEventListener('resize', resizeLogo);
resizeLogo();
});

// Keep the burger menu in place after scrolling past the canvas and change burger line color
window.addEventListener('DOMContentLoaded', () => {
const burgerMenu = document.querySelector('#burgerMenu');
const burgerLines = document.querySelectorAll('.burger-line');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (!entry.isIntersecting) {
        // Make the burger fixed when canvas is out of view
        burgerMenu.style.position = 'fixed';
        burgerMenu.style.top = '20px';
        burgerMenu.style.right = '50px';
        burgerMenu.style.zIndex = '1000';

        // Change burger lines to black
        burgerLines.forEach(line => line.style.backgroundColor = '#000');
    } else {
        // Reset to absolute within canvas bounds
        burgerMenu.style.position = 'absolute';
        burgerMenu.style.top = '50px';

        // Change burger lines back to white
        burgerLines.forEach(line => line.style.backgroundColor = '#fff');
    }
    });
}, { threshold: 0.1 });

const kaleidoscopeCanvas = document.querySelector('[tlg-kaleidoscope-canvas]');
if (kaleidoscopeCanvas) {
    observer.observe(kaleidoscopeCanvas);
}
});
