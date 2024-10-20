<div id="down-arrow" style="position: fixed; bottom: 100px; left: 100px;  opacity: 1; transition: opacity 0.5s ease; z-index: 1001; cursor: pointer; display: none;">
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

    // Function to fade out the down arrow on scroll
    const fadeOutOnScroll = () => {
      if (window.scrollY > 100) {  // Change 100 to whatever scroll threshold you prefer
        downArrow.style.opacity = '0';
      } else {
        downArrow.style.opacity = '1';
      }
    };

    // Add the scroll event listener
    window.addEventListener('scroll', fadeOutOnScroll);

    // Other script functions...
    const kaleidoscopeCanvas = document.querySelector('[tlg-kaleidoscope-canvas]');
    const headerText = document.querySelector('#dynamic-header');
    const initialHeight = 800;  // Initial height of the kaleidoscope canvas

    // Create a new generic block that acts like a header
    const genericBlock = document.createElement('div');
    genericBlock.style.position = 'fixed';
    genericBlock.style.top = '0';
    genericBlock.style.left = '0';
    genericBlock.style.width = '100%';
    genericBlock.style.height = '120px'; // You can adjust the height
    genericBlock.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'; // Dark background
    genericBlock.style.color = '#003171';
    genericBlock.style.opacity = '0'; // Initially invisible
    genericBlock.style.pointerEvents = 'none'; // Prevent interaction when invisible
    genericBlock.style.transition = 'opacity 0.5s ease'; // Smooth fade
    genericBlock.style.zIndex = '1000'; // Keep it behind the logo and burger
    document.body.appendChild(genericBlock);
    
    // Apply the mobile-specific styling
    if (window.innerWidth <= 768) {
      genericBlock.style.height = '100px';  // Make the bar thinner on mobile
    }

    console.log("Hello, World!");
    console.log(kaleidoscopeCanvas);

    // Ensure the canvas and header text are selected
    if (!kaleidoscopeCanvas || !headerText) {
      console.error("Kaleidoscope canvas or header text not found.");
      return;
    }

    // Helper Function: Resize the Logo
    const resizeLogo = () => {
      const logo = document.querySelector('a img[alt="Logo"]');
      const windowWidth = window.innerWidth;
	  const logoSize = windowWidth <= 768 ? 300 : (windowWidth * 0.25 > 500 ? 500 : windowWidth * 0.25);
      if (logo) logo.style.width = `${logoSize}px`;
    };

    // Helper Function: Add the Logo dynamically
    const addLogo = function () {
      const windowWidth = window.innerWidth;
	  const logoSize = windowWidth <= 768 ? 300 : (windowWidth * 0.25 > 500 ? 500 : windowWidth * 0.25);
      console.log(window.innerWidth * 0.25);
      const logoHtml = `
        <a href="/" style="display: inline-block; width: ${logoSize}px; height: auto; position: absolute; left: 50px; top: 50px; z-index: 1002; transition: all 0.5s ease;" id="omicsLogo">
          <style>
            @media (max-width: 768px) {
              #omicsLogo img {
                width: 200px !important;  /* Adjust the size here */
                height: auto !important;
				top: 100px !importnat;
              }
            }
          </style>
          <img src="https://images.squarespace-cdn.com/content/6700ec5eab9f781ee314a467/772c6fc2-0d72-456a-809b-4db63778f677/Omics+One+white.png?content-type=image%2Fpng" 
          alt="Logo" style="width: ${logoSize}px; height: auto; transition: all 0.5s ease;">
        </a>`;
      document.body.insertAdjacentHTML('afterbegin', logoHtml);
    };

    // Main Function: Shrink the logo when scrolling
    const shrinkLogoOnScroll = () => {
      const logo = document.querySelector('#omicsLogo img');
      const logoContainer = document.querySelector('#omicsLogo');

      window.addEventListener('scroll', () => {
        if (window.scrollY > 700) {
          if (windowWidth <= 768) {  // If mobile
            logo.style.transform = 'scale(1)';  // Shrink more for mobile
            logoContainer.style.top = '40px';     // Adjust top position on mobile
            logoContainer.style.left = '20px';    // Adjust left position on mobile
          } else {
            logo.style.transform = 'scale(0.8)';  // Standard shrink for desktop
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

    // Function: Show the block and fade in/out matching the logo's behavior
    const controlBlockVisibility = () => {
      const logoContainer = document.querySelector('#omicsLogo');
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY || window.pageYOffset;

        if (scrollY > 700) {  // Start fading in after 700px scroll
          // Keep the logo fully visible and apply background transparency only
          logoContainer.style.transform = 'scale(1)';
          logoContainer.style.position = 'fixed';
          genericBlock.style.opacity = '1';  // Keep the block fully visible
          genericBlock.style.backgroundColor = 'rgba(0, 49, 113, 0.8)';  // Semi-transparent background (80% opacity)
          genericBlock.style.pointerEvents = 'auto'; // Allow interaction when visible
        } else {
          // Fade out the block but keep the logo visible
          genericBlock.style.opacity = '0';  // Fully fade out the block when scrolled back up
          genericBlock.style.pointerEvents = 'none'; // Prevent interaction when invisible
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

    // Main Function: Add the burger menu functionality
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

      burgerMenu.addEventListener('click', () => {
        mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
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
    };

    // Initialization: Initialize all the necessary functions
    addLogo();
    resizeLogo();
    addBurgerMenu();
    shrinkLogoOnScroll();
    controlBlockVisibility();  // Add the functionality to control the block's visibility

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