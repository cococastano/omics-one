<div id="down-arrow" style="position: fixed; bottom: 100px; left: 100px; opacity: 1; transition: opacity 0.5s ease; z-index: 1001; cursor: pointer; display: none;">
  <img src="https://images.squarespace-cdn.com/content/6700ec5eab9f781ee314a467/877e2827-9887-448a-8335-f01ad13b2077/white+down+arrow.png?content-type=image%2Fpng" alt="Scroll Down" width="100" height="100" />
</div>

<script>
  document.addEventListener('DOMContentLoaded', function () {

    // Force scroll to top on page load
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);  // Scroll to the top when the page loads

    const downArrow = document.getElementById('down-arrow');
    if (window.innerWidth <= 768) {
      downArrow.style.bottom = '30px';  // Move the arrow further down for mobile
      downArrow.querySelector('img').style.width = '50px';  // Adjust the arrow width for mobile
      downArrow.querySelector('img').style.height = '50px';  // Adjust the arrow height for mobile
    }

    // Show the down arrow when the page is loaded
    downArrow.style.display = 'block';

    // Add click event to scroll to the first section
    downArrow.addEventListener('click', function () {
      const firstSection = document.querySelector('section'); // Replace with your actual section selector
      const offsetTop = firstSection.getBoundingClientRect().top + window.pageYOffset - 100;  // Adjust offset for the header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    });

    // Function to fade out the down arrow on scroll
    const fadeOutOnScroll = () => {
      if (window.scrollY > 100) {  
        downArrow.style.opacity = '0';
      } else {
        downArrow.style.opacity = '1';
      }
    };

    window.addEventListener('scroll', fadeOutOnScroll);

    // Helper Function: Resize the Logo
    const resizeLogo = () => {
      const logo = document.querySelector('a img[alt="Logo"]');
      const windowWidth = window.innerWidth;
      const logoSize = windowWidth <= 768 ? 200 : (windowWidth * 0.25 > 500 ? 500 : windowWidth * 0.25);
      if (logo) logo.style.width = `${logoSize}px`;
    };

    // Add the Omics Logo
    const addLogo = function () {
      const windowWidth = window.innerWidth;
      const logoSize = windowWidth <= 768 ? 300 : (windowWidth * 0.25 > 500 ? 500 : windowWidth * 0.25);
      const logoHtml = `
        <a href="/" style="display: inline-block; width: ${logoSize}px; height: auto; position: absolute; left: 50px; top: 50px; z-index: 1002; transition: all 0.5s ease;" id="omicsLogo">
          <img src="https://images.squarespace-cdn.com/content/6700ec5eab9f781ee314a467/772c6fc2-0d72-456a-809b-4db63778f677/Omics+One+white.png?content-type=image%2Fpng" 
          alt="Logo" style="width: ${logoSize}px; height: auto; transition: all 0.5s ease;">
        </a>`;
      document.body.insertAdjacentHTML('afterbegin', logoHtml);
    };

    // Shrink the logo when scrolling
    const shrinkLogoOnScroll = () => {
      const logo = document.querySelector('#omicsLogo img');
      const logoContainer = document.querySelector('#omicsLogo');

      window.addEventListener('scroll', () => {
        if (window.scrollY > 700) {
          if (window.innerWidth <= 768) {  
            logo.style.transform = 'scale(1)';  
            logoContainer.style.top = '40px';     
            logoContainer.style.left = '20px';    
          } else {
            logo.style.transform = 'scale(0.8)';  
            logoContainer.style.top = '20px';
            logoContainer.style.left = '50px';
          }
          logoContainer.style.position = 'fixed';
        } else {
          logo.style.transform = 'scale(1)';
          logoContainer.style.position = 'absolute';
          logoContainer.style.top = '20px';
          logoContainer.style.left = '50px';
        }
      });
    };
    
     // Smooth scroll function to the contact section, with offset adjustment
    const smoothScrollTo = (target, offset = 100) => {  // Adjust the offset if needed
      const element = document.querySelector(target);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;  // Subtract the offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };

    // Add Burger Menu
    const addBurgerMenu = function () {
      const burgerHtml = `
        <div id="burgerMenu" style="position: fixed; right: 50px; top: 40px; z-index: 1003; cursor: pointer;">
          <div class="burger-line" style="width: 30px; height: 4px; background-color: #fff; margin: 6px 0;"></div>
          <div class="burger-line" style="width: 30px; height: 4px; background-color: #fff; margin: 6px 0;"></div>
          <div class="burger-line" style="width: 30px; height: 4px; background-color: #fff; margin: 6px 0;"></div>
        </div>
        <nav id="mobileNav" style="display: none; position: fixed; top: 80px; right: 50px; width: 200px; background-color: rgba(0, 0, 0, 0.9); padding: 10px; color: white; z-index: 1004;">
          <ul style="list-style: none; padding: 0; text-align: center; margin: 0;">
            <li style="margin-bottom: 10px;"><a href="/" style="color: white; text-decoration: none; font-size: 18px;">Home</a></li>
            <li style="margin-bottom: 10px;"><a href="/bioinformatics" style="color: white; text-decoration: none; font-size: 18px;">Free Bioinformatics</a></li>
            <li style="margin-bottom: 10px;"><a href="#" class="contact-link" style="color: white; text-decoration: none; font-size: 18px;">Contact Us</a></li>
          </ul>
        </nav>`;
      document.body.insertAdjacentHTML('beforeend', burgerHtml);

      const burgerMenu = document.getElementById('burgerMenu');
      const mobileNav = document.getElementById('mobileNav');
      const contactLink = document.querySelector('.contact-link');
      
      // Toggle mobile menu visibility on burger click
      burgerMenu.addEventListener('click', () => {
        const isVisible = mobileNav.style.display === 'block';
        mobileNav.style.display = isVisible ? 'none' : 'block';  
      });
      
      // Handle Contact Us click
      contactLink.addEventListener('click', (e) => {
        e.preventDefault();

        // Check if the user is on the homepage
        const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';

        if (isHomePage) {
          // If on the homepage, scroll to the contact section
          smoothScrollTo('section[data-section-id="67037020b448c47ecc974fcd"]', 150);  // Adjust the offset as needed
        } else {
          // If not on the homepage, redirect to the contact page
          window.location.href = '/contact-us';
        }

        mobileNav.style.display = 'none';  // Close the menu after clicking
      });
      
      // Close menu when a link is clicked
      const links = mobileNav.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', () => {
          mobileNav.style.display = 'none'; 
        });
      });
    };
    
    // Function: Show the block and fade in/out matching the logo's behavior
    const controlBlockVisibility = () => {
      const logoContainer = document.querySelector('#omicsLogo');
      const genericBlock = document.createElement('div');
      genericBlock.style.position = 'fixed';
      genericBlock.style.top = '0';
      genericBlock.style.left = '0';
      genericBlock.style.width = '100%';
      genericBlock.style.height = '120px';
      genericBlock.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
      genericBlock.style.opacity = '0';  
      genericBlock.style.pointerEvents = 'none';  
      genericBlock.style.transition = 'opacity 0.5s ease';
      genericBlock.style.zIndex = '1000';  
      document.body.appendChild(genericBlock);

      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY || window.pageYOffset;

        if (scrollY > 700) {  
          logoContainer.style.transform = 'scale(1)';
          logoContainer.style.position = 'fixed';
          genericBlock.style.opacity = '1';  
          genericBlock.style.backgroundColor = 'rgba(0, 49, 113, 0.8)';  
          genericBlock.style.pointerEvents = 'auto'; 
        } else {
          genericBlock.style.opacity = '0';  
          genericBlock.style.pointerEvents = 'none';  
        }
      });
    };
    
    // Initialization
    addLogo();
    resizeLogo();
    addBurgerMenu();  
    shrinkLogoOnScroll();
    controlBlockVisibility();

    // Resize event listener to adjust the logo on window resize
    window.addEventListener('resize', resizeLogo);
  });
</script>

<script defer src="https://cdn.jsdelivr.net/npm/three-js@79.0.0/three.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/the-lazy-god/tlg-kaleidoscope@v2.0.1/tlg-kaleidoscope.min.js"></script>

<!-- Kaleidoscope Canvas Section -->
<div class="sqs-block-content">
  <div tlg-kaleidoscope-canvas tlg-kaleidoscope-mode="mouse" tlg-kaleidoscope-segments="8" style="width: 100%; height: 1000px; position: relative;">
     <h1 class="kaleidoscope-header" id="dynamic-header">Blood Data from Anyone, Anywhere, Anytime</h1>
     <img tlg-kaleidoscope-image id="kaleidoscope-image" src="https://images.squarespace-cdn.com/content/6700ec5eab9f781ee314a467/5375552f-92ce-4db3-81df-85f945713098/test+image.png?content-type=image%2Fpng" style="display:none;" />
  </div>
</div>

<!-- Update header and kaleidoscope image dynamically based on path -->
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const headerTextElement = document.getElementById("dynamic-header");
    const kaleidoscopeImageElement = document.getElementById("kaleidoscope-image");
    const currentPath = window.location.pathname;

    switch (currentPath) {
      case '/contact-us':
        headerTextElement.textContent = "Contact Us";
        kaleidoscopeImageElement.src = "https://images.squarespace-cdn.com/content/6700ec5eab9f781ee314a467/2e5c339f-7832-4c00-a1b2-f75af945b560/heic2007a.jpg?content-type=image%2Fjpeg";
        break;
      case '/bioinformatics':
        headerTextElement.textContent = "Get Free Bioinformatics";
        kaleidoscopeImageElement.src = "https://images.squarespace-cdn.com/content/6700ec5eab9f781ee314a467/3945d93b-91c1-4c49-803d-81ba060b9bdf/heic1520a.jpg?content-type=image%2Fjpeg";
        break;
      default:
        headerTextElement.textContent = "Blood Data from Anyone, Anywhere, Anytime";
        kaleidoscopeImageElement.src = "https://images.squarespace-cdn.com/content/6700ec5eab9f781ee314a467/98e87d5a-6515-417d-8117-dd53e49144fd/test+image+2.jpg?content-type=image%2Fjpeg";
    }
  });
</script>