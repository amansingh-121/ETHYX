// Shared Modern Industrial Layout Injection for Subpages
(function () {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  // 1. Ticker HTML
  const tickerEl = document.getElementById('ticker');
  if (tickerEl) {
    tickerEl.outerHTML = `
      <div class="ticker-bar">
        <div class="ticker-track">
          <span class="ticker-items">
            <a href="index.html#products">All Industrial Packaging</a><i>+</i>
            <a href="index.html#products">Custom Branded E-commerce Bags</a><i>+</i>
            <a href="valmo.html">Valmo Authorized Collection</a><i>+</i>
            <a href="protective.html">Heavy Duty Protective Rolls</a><i>+</i>
            <a href="ldpe_bags.html">Tamper-Evident Courier Bags</a><i>+</i>
            <a href="bopp_tapes.html">Industrial BOPP Tapes</a><i>+</i>
            <a href="hdpe_pp_bags.html">HDPE/PP High Strength Bags</a><i>+</i>
          </span>
          <span class="ticker-items" aria-hidden="true">
            <a href="index.html#products">All Industrial Packaging</a><i>+</i>
            <a href="index.html#products">Custom Branded E-commerce Bags</a><i>+</i>
            <a href="valmo.html">Valmo Authorized Collection</a><i>+</i>
            <a href="protective.html">Heavy Duty Protective Rolls</a><i>+</i>
            <a href="ldpe_bags.html">Tamper-Evident Courier Bags</a><i>+</i>
            <a href="bopp_tapes.html">Industrial BOPP Tapes</a><i>+</i>
            <a href="hdpe_pp_bags.html">HDPE/PP High Strength Bags</a><i>+</i>
          </span>
        </div>
      </div>
    `;
  }

  // 2. Header HTML
  const headerEl = document.getElementById('header');
  if (headerEl) {
    const isHome = currentPath === '' || currentPath === 'index.html';
    const isAbout = currentPath === 'about.html' || currentPath === 'about';
    const isEthyx = currentPath === 'ethyx.html' || currentPath === 'ethyx';
    const isValmo = currentPath === 'valmo.html' || currentPath === 'valmo';
    const isContact = currentPath === 'contact-us.html' || currentPath === 'contact-us';
    const isProducts = [
      'hdpe_pp_bags.html',
      'ldpe_bags.html',
      'paper_courier.html',
      'bopp_tapes.html',
      'protective.html'
    ].includes(currentPath);

    headerEl.className = 'header';
    headerEl.innerHTML = `
      <div class="container nav-wrap">
        <a href="index.html" class="logo" title="Ethyx Packaging Solution">
          <img src="https://ethyxpackagingsolution.com/assets/Ethyx-Logo-DeSs-_6U.png" alt="Ethyx Logo" class="logo-img" />
        </a>
        <nav class="nav" id="nav">
          <a href="index.html" class="${isHome ? 'active' : ''}">Home</a>
          <a href="about.html" class="${isAbout ? 'active' : ''}">About Us</a>
          <div class="dropdown ${isProducts ? 'active' : ''}">
            <a href="#" class="drop-toggle ${isProducts ? 'active' : ''}">Products <span class="caret">▾</span></a>
            <div class="dropdown-menu">
              <a href="hdpe_pp_bags.html">HDPE/PP Bags</a>
              <a href="ldpe_bags.html">LDPE Bags</a>
              <a href="paper_courier.html">Paper Courier Bags</a>
              <a href="bopp_tapes.html">BOPP Tapes</a>
              <a href="protective.html">Protective Packaging</a>
            </div>
          </div>
          <a href="ethyx.html" class="${isEthyx ? 'active' : ''}">Ethyx</a>
          <a href="valmo.html" class="${isValmo ? 'active' : ''}">Valmo</a>
          <a href="contact-us.html" class="${isContact ? 'active' : ''}">Contact Us</a>
        </nav>
        <div class="nav-actions">
          <button class="quote-btn-header" id="quickQuoteBtn">Request Quote</button>
          <button class="auth-link" id="authBtn">Login</button>
          <button class="cart-icon" id="wishlistBtn" title="Wishlist" aria-label="Wishlist">♡<span class="count" id="wishlistCount">0</span></button>
          <button class="cart-icon" id="cartBtn" title="Quote Drawer" aria-label="Quote Drawer">🛒<span class="count" id="cartCount">0</span></button>
          <button class="hamburger" id="hamburger" aria-label="Open navigation menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    `;
  }

  // 3. Footer HTML
  const footerEl = document.getElementById('footer');
  if (footerEl) {
    footerEl.className = 'footer';
    footerEl.innerHTML = `
      <div class="container footer-grid">
        <div>
          <img src="https://ethyxpackagingsolution.com/assets/Ethyx-Logo-300-B3qNGeKt.webp" alt="Ethyx" class="footer-logo" />
          <p>Ethyx Packaging Industries — manufacturer and supplier of customized tamper-proof courier bags, HDPE/PP bags, bubble pouches, BOPP tapes, and branded packaging with over 7 years of industrial excellence.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <a href="about.html">About Us</a>
          <a href="index.html#products">Our Products</a>
          <a href="contact-us.html">Contact Us</a>
          <a href="contact-us.html">Terms and Conditions</a>
          <a href="contact-us.html">Privacy Policy</a>
          <a href="contact-us.html">Return & Refund</a>
          <a href="contact-us.html">Shipping & Delivery</a>
        </div>
        <div>
          <h4>Products & Collections</h4>
          <a href="index.html#products">All Products</a>
          <a href="ethyx.html">ETHYX Collections</a>
          <a href="valmo.html">Valmo Partner Range</a>
          <a href="valmo.html">Meesho Authorized Packs</a>
          <a href="hdpe_pp_bags.html">HDPE/PP Bags</a>
          <a href="ldpe_bags.html">LDPE / Tamper Proof Bags</a>
          <a href="protective.html">Protective Packaging</a>
        </div>
        <div>
          <h4>Contact & Locations</h4>
          <a href="tel:+919625665613">📞 +91-9625665613</a>
          <a href="tel:+917827124429">📞 +91-7827124429</a>
          <a href="mailto:ethyxsolutions@yahoo.com">✉️ ethyxsolutions@yahoo.com</a>
          <a href="contact-us.html">📍 5th Floor, Two Horizon Centre, DLF Phase-5, Gurugram-122002</a>
          <h4 style="margin-top:20px">Connect With Us</h4>
          <div class="socials">
            <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">f</a>
            <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
            <a href="https://wa.me/919625665613" target="_blank" rel="noopener" aria-label="WhatsApp">wa</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          <p>© 2026 ETHYX Packaging Industries. All rights reserved. Precision Manufacturing & Authorized Valmo Partner.</p>
        </div>
      </div>
    `;
  }
})();
