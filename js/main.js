// ==========================================================================
// ETHYX PACKAGING SOLUTION — APPLICATION ENGINE & INSTANT SPA ROUTER
// Zero Delay · Zero Screen Breaking · Fluid Transitions · Phone Login · RFQ
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. Shared Global State & LocalStorage Persistence
  // ------------------------------------------------------------------------
  let quoteItems = JSON.parse(localStorage.getItem('ethyx_cart') || 'null') || [
    { id: '1', title: 'E-Commerce Branded Bag', qty: 1000, img: 'https://ethyxpackagingsolution.com/assets/1-BgoOQK8l.webp', category: 'E-Commerce Series' }
  ];
  let wishlistItems = JSON.parse(localStorage.getItem('ethyx_wishlist') || 'null') || [];

  const cartCounts = () => document.querySelectorAll('.cart-icon[title*="Cart"] .count, #cartCount, .cart-icon[title*="Quote"] .count, #cartBadge, .header-badge-pill#cartBadge');
  const wishlistCounts = () => document.querySelectorAll('.cart-icon[title="Wishlist"] .count, #wishlistCount, #wishlistBadge, .header-badge-pill#wishlistBadge');
  const header = document.querySelector('.header');

  // ------------------------------------------------------------------------
  // Dedicated Pages Renderer: Wishlist Page & Cart Page
  // ------------------------------------------------------------------------
  function renderWishlistPage() {
    const subtitle = document.getElementById('wishlistSubtitle');
    const emptyState = document.getElementById('wishlistEmptyState');
    const populatedGrid = document.getElementById('wishlistPopulatedGrid');

    if (subtitle) {
      subtitle.textContent = wishlistItems.length === 1 ? '1 item saved for later' : `${wishlistItems.length} items saved for later`;
    }

    if (!emptyState || !populatedGrid) return;

    if (wishlistItems.length === 0) {
      emptyState.style.display = 'block';
      populatedGrid.style.display = 'none';
      populatedGrid.innerHTML = '';
    } else {
      emptyState.style.display = 'none';
      populatedGrid.style.display = 'grid';
      populatedGrid.innerHTML = wishlistItems.map((item, idx) => `
        <article class="product-item-card" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;padding:20px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 4px 14px rgba(0,0,0,0.05);transition:transform 0.2s ease;">
          <div>
            <div style="height:190px;background:#f8fafc;border-radius:10px;display:flex;align-items:center;justify-content:center;padding:12px;margin-bottom:14px;border:1px solid #f1f5f9;">
              <img src="${item.img}" alt="${item.title}" style="max-height:100%;max-width:100%;object-fit:contain;" />
            </div>
            <div style="font-size:0.78rem;font-weight:700;color:var(--primary);text-transform:uppercase;margin-bottom:4px;">${item.category || 'Packaging Solution'}</div>
            <h3 style="font-size:1.1rem;font-weight:700;color:#0f172a;margin-bottom:6px;">${item.title}</h3>
            <p style="font-size:0.85rem;color:#64748b;margin-bottom:16px;">Tamper-proof, high-tensile co-ex polymer film.</p>
          </div>
          <div style="display:flex;gap:10px;">
            <button type="button" class="btn btn-primary btn-small" style="flex:1;" onclick="ethyxMoveToCart(${idx})">Move to RFQ</button>
            <button type="button" class="btn btn-outline btn-small" style="color:#ef4444;border-color:#fca5a5;padding:6px 12px;" onclick="ethyxRemoveFromWishlist(${idx})" title="Remove item">✕</button>
          </div>
        </article>
      `).join('');
    }
  }

  function renderCartPage() {
    const subtitle = document.getElementById('cartSubtitle');
    const emptyState = document.getElementById('cartEmptyState');
    const populatedSection = document.getElementById('cartPopulatedSection');
    const populatedGrid = document.getElementById('cartPopulatedGrid');

    if (subtitle) {
      subtitle.textContent = quoteItems.length === 1 ? '1 item ready for enterprise quotation' : `${quoteItems.length} items ready for enterprise quotation`;
    }

    if (!emptyState || !populatedSection || !populatedGrid) return;

    if (quoteItems.length === 0) {
      emptyState.style.display = 'block';
      populatedSection.style.display = 'none';
      populatedGrid.innerHTML = '';
    } else {
      emptyState.style.display = 'none';
      populatedSection.style.display = 'block';
      populatedGrid.innerHTML = quoteItems.map((item, idx) => `
        <div class="cart-table-card" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;padding:20px;display:flex;align-items:center;gap:20px;flex-wrap:wrap;box-shadow:0 4px 12px rgba(0,0,0,0.04);margin-bottom:16px;">
          <div style="width:110px;height:110px;background:#f8fafc;border-radius:10px;display:flex;align-items:center;justify-content:center;padding:10px;flex-shrink:0;border:1px solid #f1f5f9;">
            <img src="${item.img}" alt="${item.title}" style="max-height:100%;max-width:100%;object-fit:contain;" />
          </div>
          <div style="flex:1;min-width:220px;">
            <div style="font-size:0.78rem;font-weight:700;color:var(--primary);text-transform:uppercase;margin-bottom:4px;">${item.category || 'Packaging Solution'}</div>
            <h3 style="font-size:1.15rem;font-weight:700;color:#0f172a;margin-bottom:4px;">${item.title}</h3>
            <p style="font-size:0.85rem;color:#64748b;margin:0;">High-volume enterprise supply · Verified specs</p>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-size:0.85rem;color:#475569;font-weight:600;">Qty:</span>
            <div style="display:flex;align-items:center;border:1px solid #cbd5e1;border-radius:6px;overflow:hidden;background:#ffffff;">
              <button type="button" style="padding:6px 14px;background:#f1f5f9;font-weight:700;cursor:pointer;border:none;" onclick="ethyxChangeQty(${idx}, -500)">−</button>
              <span style="padding:6px 16px;font-weight:700;min-width:80px;text-align:center;">${(item.qty || 1000).toLocaleString()} pcs</span>
              <button type="button" style="padding:6px 14px;background:#f1f5f9;font-weight:700;cursor:pointer;border:none;" onclick="ethyxChangeQty(${idx}, 500)">+</button>
            </div>
          </div>
          <button type="button" style="color:#ef4444;font-size:0.88rem;border:1px solid #fee2e2;background:#fff5f5;cursor:pointer;padding:8px 14px;border-radius:6px;font-weight:600;" onclick="ethyxRemoveItem(${idx})">
            ✕ Remove
          </button>
        </div>
      `).join('');
    }
  }

  // Global actions for Cart & Wishlist Pages
  window.ethyxMoveToCart = function (idx) {
    if (wishlistItems[idx]) {
      const item = wishlistItems.splice(idx, 1)[0];
      const existing = quoteItems.find(i => i.title === item.title);
      if (existing) {
        existing.qty += 1000;
      } else {
        quoteItems.push({ ...item, qty: 1000 });
      }
      updateCounts();
      showToast(`Moved "${item.title}" to your RFQ Cart!`);
    }
  };

  window.ethyxRemoveFromWishlist = function (idx) {
    if (wishlistItems[idx]) {
      const removed = wishlistItems.splice(idx, 1)[0];
      updateCounts();
      showToast(`Removed "${removed.title}" from Wishlist`);
    }
  };

  window.ethyxAddToWishlist = function (item) {
    const existing = wishlistItems.find(i => i.title === item.title);
    if (!existing) {
      wishlistItems.push(item);
      updateCounts();
      showToast(`Saved "${item.title}" to Wishlist!`);
    } else {
      showToast(`"${item.title}" is already in your Wishlist`);
    }
  };

  window.renderWishlistPage = renderWishlistPage;
  window.renderCartPage = renderCartPage;

  function updateCounts() {
    localStorage.setItem('ethyx_cart', JSON.stringify(quoteItems));
    localStorage.setItem('ethyx_wishlist', JSON.stringify(wishlistItems));
    cartCounts().forEach(el => el.textContent = quoteItems.length);
    wishlistCounts().forEach(el => el.textContent = wishlistItems.length);
    renderWishlistPage();
    renderCartPage();
  }

  // ------------------------------------------------------------------------
  // 2. Auth & Login State Sync in Header & User Dropdown
  // ------------------------------------------------------------------------
  function syncAuthHeader() {
    const savedPhone = localStorage.getItem('ethyx_user_phone');
    const authBtns = document.querySelectorAll('.auth-link, #authBtn, .user-badge-header');
    const unauthMenus = document.querySelectorAll('#unauthMenuItems');
    const authMenus = document.querySelectorAll('#authMenuItems');
    const userMenuPhones = document.querySelectorAll('#userMenuPhone');

    if (savedPhone) {
      unauthMenus.forEach(el => el.style.display = 'none');
      authMenus.forEach(el => el.style.display = 'block');
      userMenuPhones.forEach(el => el.textContent = `+91 ${savedPhone.slice(-10)}`);

      authBtns.forEach(btn => {
        btn.className = 'user-badge-header';
        btn.innerHTML = `
          <span>📱 +91 ${savedPhone.slice(-10, -5)} ${savedPhone.slice(-5)}</span>
          <span class="user-logout-link" title="Logout" style="margin-left:6px;color:#ef4444;text-decoration:underline;cursor:pointer;">(Logout)</span>
        `;
        const logoutSpan = btn.querySelector('.user-logout-link');
        if (logoutSpan) {
          logoutSpan.onclick = (e) => {
            e.stopPropagation();
            localStorage.removeItem('ethyx_user_phone');
            syncAuthHeader();
            showToast('Logged out successfully');
          };
        }
      });
    } else {
      unauthMenus.forEach(el => el.style.display = 'block');
      authMenus.forEach(el => el.style.display = 'none');

      authBtns.forEach(btn => {
        btn.className = 'auth-link';
        btn.textContent = 'Login';
      });
    }
  }
  syncAuthHeader();
  updateCounts();

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 15) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  // ------------------------------------------------------------------------
  // 3. Toast Notifications
  // ------------------------------------------------------------------------
  function showToast(message) {
    let toast = document.querySelector('.app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'app-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
  window.showToast = showToast;

  // ------------------------------------------------------------------------
  // 4. Modal Engine
  // ------------------------------------------------------------------------
  function createModal(title, contentHtml) {
    let backdrop = document.querySelector('.app-modal-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'app-modal-backdrop';
      backdrop.innerHTML = `
        <div class="app-modal-box">
          <button class="app-modal-close" aria-label="Close dialog">&times;</button>
          <div class="app-modal-body"></div>
        </div>
      `;
      document.body.appendChild(backdrop);

      backdrop.querySelector('.app-modal-close').addEventListener('click', () => {
        backdrop.classList.remove('open');
      });

      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.classList.remove('open');
      });
    }

    const body = backdrop.querySelector('.app-modal-body');
    body.innerHTML = `
      <h3>${title}</h3>
      ${contentHtml}
    `;
    backdrop.classList.add('open');
  }
  window.createModal = createModal;

  // ------------------------------------------------------------------------
  // 5. Phone Number Login / OTP Verification Modal
  // ------------------------------------------------------------------------
  function openPhoneLoginModal(productTitle, onSuccessCallback) {
    createModal(
      'Login with Mobile Number',
      `
      <p style="margin-bottom:18px;">To view product specifications, bulk pricing tiers and sample availability for <strong>${productTitle || 'Packaging Products'}</strong>, please verify your mobile number:</p>
      
      <div id="phoneStep1">
        <label style="display:block;font-size:0.85rem;font-weight:700;color:#334155;margin-bottom:6px;">Mobile Number</label>
        <div class="phone-input-group">
          <div class="phone-prefix">🇮🇳 +91</div>
          <input type="tel" id="mobileInput" placeholder="98765 43210" maxlength="10" autocomplete="tel-national" autofocus />
        </div>
        <p style="font-size:0.8rem;color:#64748b;margin-bottom:18px;">We will send a 4-digit verification OTP on this number.</p>
        <button type="button" class="btn btn-primary" id="sendOtpBtn" style="width:100%">Send Verification OTP</button>
      </div>

      <div id="phoneStep2" style="display:none;">
        <div class="otp-hint-badge">
          <span>✓ OTP sent to +91 <strong id="displaySentPhone"></strong></span>
        </div>
        <label style="display:block;font-size:0.85rem;font-weight:700;color:#334155;margin-bottom:6px;">Enter 4-Digit Verification Code</label>
        <input type="text" id="otpInput" class="otp-digit-input" placeholder="••••" maxlength="4" />
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;font-size:0.82rem;">
          <span style="color:#64748b;">Testing Demo OTP: <strong style="color:var(--primary);">4829</strong></span>
          <button type="button" id="quickOtpFill" style="color:var(--primary);font-weight:700;text-decoration:underline;">Auto-Fill</button>
        </div>
        <button type="button" class="btn btn-primary" id="verifyOtpBtn" style="width:100%;margin-bottom:10px;">Verify & Access Product</button>
        <button type="button" class="btn btn-outline" id="changePhoneBtn" style="width:100%;font-size:0.85rem;padding:8px;">Change Number</button>
      </div>
      `
    );

    const mobileInput = document.getElementById('mobileInput');
    const sendOtpBtn = document.getElementById('sendOtpBtn');
    const phoneStep1 = document.getElementById('phoneStep1');
    const phoneStep2 = document.getElementById('phoneStep2');
    const displaySentPhone = document.getElementById('displaySentPhone');
    const otpInput = document.getElementById('otpInput');
    const verifyOtpBtn = document.getElementById('verifyOtpBtn');
    const quickOtpFill = document.getElementById('quickOtpFill');
    const changePhoneBtn = document.getElementById('changePhoneBtn');

    if (mobileInput) {
      mobileInput.focus();
      mobileInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendOtpBtn?.click();
      });
    }

    if (sendOtpBtn) {
      sendOtpBtn.addEventListener('click', () => {
        const rawPhone = (mobileInput.value || '').trim().replace(/\D/g, '');
        if (rawPhone.length < 10) {
          showToast('Please enter a valid 10-digit mobile number');
          mobileInput.focus();
          return;
        }

        displaySentPhone.textContent = rawPhone;
        phoneStep1.style.display = 'none';
        phoneStep2.style.display = 'block';
        otpInput.focus();
        showToast('OTP sent! Demo code is: 4829');
      });
    }

    if (quickOtpFill) {
      quickOtpFill.addEventListener('click', () => {
        otpInput.value = '4829';
        verifyOtpBtn.focus();
      });
    }

    if (changePhoneBtn) {
      changePhoneBtn.addEventListener('click', () => {
        phoneStep2.style.display = 'none';
        phoneStep1.style.display = 'block';
        mobileInput.focus();
      });
    }

    if (verifyOtpBtn) {
      verifyOtpBtn.addEventListener('click', () => {
        const otpVal = (otpInput.value || '').trim();
        if (otpVal.length < 4) {
          showToast('Please enter the 4-digit code (use 4829)');
          otpInput.focus();
          return;
        }

        const verifiedPhone = (mobileInput.value || '').trim().replace(/\D/g, '');
        localStorage.setItem('ethyx_user_phone', verifiedPhone);
        syncAuthHeader();

        const modalBackdrop = document.querySelector('.app-modal-backdrop');
        if (modalBackdrop) modalBackdrop.classList.remove('open');

        showToast(`✓ Phone verified! Welcome +91 ${verifiedPhone}`);

        if (onSuccessCallback) {
          setTimeout(() => {
            onSuccessCallback(verifiedPhone);
          }, 350);
        }
      });
    }
  }

  // ------------------------------------------------------------------------
  // 6. Product Detail / RFQ Modal for Verified Users
  // ------------------------------------------------------------------------
  function showProductDetailModal(title, img) {
    createModal(
      title,
      `
      <div style="display:flex;gap:20px;flex-wrap:wrap;align-items:center;margin-bottom:20px;">
        <div style="width:140px;height:140px;background:#f8fafc;border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid #e2e8f0;padding:12px;">
          <img src="${img}" alt="${title}" style="max-height:100%;max-width:100%;object-fit:contain;" />
        </div>
        <div style="flex:1;min-width:200px;">
          <div style="font-size:0.85rem;color:var(--primary);font-weight:700;margin-bottom:4px;">Verified B2B Product</div>
          <div style="font-size:1.15rem;font-weight:700;color:#0f172a;margin-bottom:8px;">${title}</div>
          <div style="font-size:0.85rem;color:#475569;line-height:1.5;">
            ✓ High-tensile co-ex multi-layer film<br/>
            ✓ Tamper-evident peel & seal adhesive flap<br/>
            ✓ Custom brand printing available (up to 8 colors)
          </div>
        </div>
      </div>
      
      <div style="background:#f1f5f9;padding:14px;border-radius:8px;margin-bottom:18px;">
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.9rem;font-weight:600;color:#1e293b;margin-bottom:8px;">
          <span>Select Initial Batch Quantity:</span>
          <span style="color:var(--primary);font-weight:700;" id="modalSelectedBatch">1,000 pcs</span>
        </div>
        <div style="display:flex;gap:8px;">
          <button type="button" class="btn btn-outline" style="flex:1;padding:6px;font-size:0.82rem;" onclick="document.getElementById('modalSelectedBatch').textContent='500 pcs'">500 pcs</button>
          <button type="button" class="btn btn-outline" style="flex:1;padding:6px;font-size:0.82rem;border-color:var(--primary);color:var(--primary);" onclick="document.getElementById('modalSelectedBatch').textContent='1,000 pcs'">1,000 pcs</button>
          <button type="button" class="btn btn-outline" style="flex:1;padding:6px;font-size:0.82rem;" onclick="document.getElementById('modalSelectedBatch').textContent='5,000 pcs'">5,000 pcs</button>
          <button type="button" class="btn btn-outline" style="flex:1;padding:6px;font-size:0.82rem;" onclick="document.getElementById('modalSelectedBatch').textContent='10,000+ pcs'">10,000+</button>
        </div>
      </div>

      <div style="display:flex;gap:10px;margin-bottom:10px;">
        <button type="button" class="btn btn-primary" style="flex:1;" id="modalAddRfqBtn">
          Add to RFQ Drawer
        </button>
        <button type="button" class="btn btn-secondary" style="flex:1;" id="modalDirectWaBtn">
          📱 Direct WhatsApp
        </button>
      </div>
      <button type="button" class="btn btn-outline" style="width:100%;font-size:0.86rem;color:#475569;" id="modalWishlistBtn">
        ❤️ Save to Wishlist
      </button>
      `
    );

    document.getElementById('modalAddRfqBtn')?.addEventListener('click', () => {
      const existing = quoteItems.find(i => i.title === title);
      if (existing) {
        existing.qty += 1000;
      } else {
        quoteItems.push({ id: Date.now().toString(), title, qty: 1000, img });
      }
      updateCounts();
      document.querySelector('.app-modal-backdrop')?.classList.remove('open');
      showToast(`Added "${title}" to your RFQ Drawer!`);
      openDrawer();
    });

    document.getElementById('modalWishlistBtn')?.addEventListener('click', () => {
      window.ethyxAddToWishlist({ id: Date.now().toString(), title, img, category: 'Packaging Solution' });
    });

    document.getElementById('modalDirectWaBtn')?.addEventListener('click', () => {
      const userPhone = localStorage.getItem('ethyx_user_phone') || '';
      const waUrl = `https://wa.me/919625665613?text=Hello%20Ethyx%20Packaging,%20I%20am%20interested%20in%20"${encodeURIComponent(title)}"%20for%20my%20business%20(+91%20${userPhone}).%20Please%20send%20pricing%20and%20MOQ.`;
      window.open(waUrl, '_blank');
    });
  }

  // ------------------------------------------------------------------------
  // 7. Slide-over Quote Drawer (RFQ)
  // ------------------------------------------------------------------------
  function renderDrawer() {
    let backdrop = document.querySelector('.drawer-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'drawer-backdrop';
      backdrop.innerHTML = `
        <div class="drawer">
          <div class="drawer-header">
            <h3>Request For Quote (RFQ)</h3>
            <button class="drawer-close" aria-label="Close quote drawer">&times;</button>
          </div>
          <div class="drawer-body">
            <div class="cart-items-list" id="drawerItemsList"></div>
          </div>
          <div class="drawer-footer">
            <button class="btn btn-primary" id="drawerWhatsappBtn">
              📱 Send Inquiry via WhatsApp
            </button>
            <button class="btn btn-outline" id="drawerEmailBtn">
              ✉️ Submit Official Quote Request
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(backdrop);

      backdrop.querySelector('.drawer-close').addEventListener('click', () => {
        backdrop.classList.remove('open');
      });

      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.classList.remove('open');
      });

      backdrop.querySelector('#drawerWhatsappBtn').addEventListener('click', () => {
        if (quoteItems.length === 0) {
          showToast('Please add items to your RFQ drawer first.');
          return;
        }
        const userPhone = localStorage.getItem('ethyx_user_phone') || '';
        const phoneNote = userPhone ? `%0AClient%20Mobile:%20%2B91%20${userPhone}` : '';
        const textLines = quoteItems.map(i => `• ${i.title} (Qty: ${i.qty} pcs)`).join('%0A');
        const waUrl = `https://wa.me/919625665613?text=Hello%20Ethyx%20Packaging,%20I%20would%20like%20a%20bulk%20quote%20for:%0A${textLines}${phoneNote}`;
        window.open(waUrl, '_blank');
      });

      backdrop.querySelector('#drawerEmailBtn').addEventListener('click', () => {
        backdrop.classList.remove('open');
        const userPhone = localStorage.getItem('ethyx_user_phone') || '';
        createModal(
          'Official RFQ Submission',
          `
          <p>Please enter your contact details to receive formal quotation with GST invoice & spec sheet:</p>
          <form onsubmit="event.preventDefault(); document.querySelector('.app-modal-backdrop').classList.remove('open'); showToast('Thank you! Quotation with tier pricing sent to your email.');">
            <input type="text" placeholder="Company / Business Name" required />
            <input type="email" placeholder="Official Email Address" required />
            <input type="tel" placeholder="Mobile / Phone Number (+91)" value="${userPhone ? '+91 ' + userPhone : ''}" required />
            <textarea rows="3" placeholder="Special requirements (Micron thickness, custom logo printing, delivery city)..."></textarea>
            <button type="submit" class="btn btn-primary" style="width:100%">Submit Formal RFQ</button>
          </form>
          `
        );
      });
    }

    const list = backdrop.querySelector('#drawerItemsList');
    if (quoteItems.length === 0) {
      list.innerHTML = `
        <div style="text-align:center;padding:40px 10px;color:#64748b;">
          <div style="font-size:2.5rem;margin-bottom:12px;">📦</div>
          <p style="font-weight:600;color:#1e293b;margin-bottom:6px;">Your RFQ Drawer is empty</p>
          <p style="font-size:0.88rem;margin-bottom:20px;">Browse our catalog and add items with required quantities.</p>
          <a href="index.html#products" class="btn btn-secondary btn-small" onclick="document.querySelector('.drawer-backdrop').classList.remove('open')">View Products</a>
        </div>
      `;
    } else {
      list.innerHTML = quoteItems.map((item, idx) => `
        <div class="cart-item-card">
          <img src="${item.img}" alt="${item.title}" class="cart-item-img" />
          <div class="cart-item-info">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-qty-row">
              <div class="qty-control">
                <button class="qty-btn" onclick="window.ethyxChangeQty(${idx}, -500)">-</button>
                <input class="qty-input" type="text" value="${item.qty} pcs" readonly />
                <button class="qty-btn" onclick="window.ethyxChangeQty(${idx}, 500)">+</button>
              </div>
              <button class="cart-item-remove" onclick="window.ethyxRemoveItem(${idx})">Remove</button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  window.ethyxChangeQty = function (idx, delta) {
    if (quoteItems[idx]) {
      quoteItems[idx].qty = Math.max(500, quoteItems[idx].qty + delta);
      renderDrawer();
      updateCounts();
    }
  };

  window.ethyxRemoveItem = function (idx) {
    quoteItems.splice(idx, 1);
    renderDrawer();
    updateCounts();
    showToast('Item removed from RFQ drawer');
  };

  function openDrawer() {
    renderDrawer();
    const backdrop = document.querySelector('.drawer-backdrop');
    if (backdrop) backdrop.classList.add('open');
  }

  // Bind Drawer & Quote Triggers
  document.addEventListener('click', (e) => {
    const target = e.target.closest('#cartBtn, .cart-icon[title*="Cart"], .cart-icon[title*="Quote"], #quickQuoteBtn, .quote-btn-header');
    if (target) {
      e.preventDefault();
      openDrawer();
    }
    const wishTarget = e.target.closest('#wishlistBtn, .cart-icon[title="Wishlist"]');
    if (wishTarget) {
      e.preventDefault();
      showToast(`Wishlist saved (${wishlistItems.length} items)`);
    }
    const authTarget = e.target.closest('#authBtn, .auth-link:not(.user-badge-header)');
    if (authTarget) {
      e.preventDefault();
      const savedPhone = localStorage.getItem('ethyx_user_phone');
      if (savedPhone) {
        createModal(
          'Customer Account',
          `
          <p>You are logged in with verified mobile number:</p>
          <div style="font-size:1.3rem;font-weight:800;color:var(--primary);margin-bottom:14px;">🇮🇳 +91 ${savedPhone}</div>
          <p style="font-size:0.88rem;color:#64748b;margin-bottom:20px;">You have active access to view wholesale rates, download spec sheets, and request instant RFQs.</p>
          <button class="btn btn-outline" style="width:100%;color:#ef4444;" onclick="localStorage.removeItem('ethyx_user_phone'); document.querySelector('.app-modal-backdrop')?.classList.remove('open'); window.syncAuthHeaderGlobal(); showToast('Logged out');">Log Out</button>
          `
        );
      } else {
        openPhoneLoginModal('Ethyx B2B Portal', (phone) => {
          showToast(`Welcome +91 ${phone}!`);
        });
      }
    }
  });

  window.syncAuthHeaderGlobal = syncAuthHeader;

  // ------------------------------------------------------------------------
  // 8. Mobile Navigation & Dropdowns
  // ------------------------------------------------------------------------
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('open');
      nav.classList.toggle('open');
      const isExpanded = hamburger.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isExpanded);
    });

    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function closeMobileNav() {
    if (hamburger && nav) {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
  }

  // ------------------------------------------------------------------------
  // 9. INSTANT SPA ROUTER (Zero Delay, Zero Screen Breaking)
  // ------------------------------------------------------------------------
  const pageCache = new Map();
  const knownPages = [
    'index.html',
    'about.html',
    'ethyx.html',
    'valmo.html',
    'contact-us.html',
    'hdpe_pp_bags.html',
    'ldpe_bags.html',
    'paper_courier.html',
    'bopp_tapes.html',
    'protective.html'
  ];

  // Prime cache with current page HTML
  const currentInitialPath = window.location.pathname.split('/').pop() || 'index.html';
  pageCache.set(currentInitialPath, document.documentElement.outerHTML);
  pageCache.set(window.location.pathname, document.documentElement.outerHTML);

  // Background warm-up
  async function warmUpCache() {
    for (const page of knownPages) {
      if (!pageCache.has(page)) {
        try {
          const res = await fetch(page);
          if (res.ok) {
            const html = await res.text();
            pageCache.set(page, html);
            const clean = page.replace('.html', '');
            pageCache.set(clean, html);
            pageCache.set('/' + page, html);
            pageCache.set('/' + clean, html);
            if (page === 'index.html') {
              pageCache.set('/', html);
              pageCache.set('', html);
            }
          }
        } catch (e) {
          // ignore
        }
      }
    }
  }
  setTimeout(warmUpCache, 120);

  // Update header navigation active tab states
  function updateNavActiveState(targetPath, targetHash) {
    const isHome = targetPath === '' || targetPath === 'index.html' || targetPath === '/';
    const isAbout = targetPath.includes('about');
    const isEthyx = targetPath.includes('ethyx');
    const isValmo = targetPath.includes('valmo');
    const isContact = targetPath.includes('contact');
    const isProductCategory = [
      'hdpe_pp_bags.html',
      'ldpe_bags.html',
      'paper_courier.html',
      'bopp_tapes.html',
      'protective.html'
    ].some(p => targetPath.includes(p.replace('.html', ''))) || targetHash === '#products';

    // All nav links
    const navLinks = document.querySelectorAll('#nav > a, #nav .drop-toggle, #nav .dropdown, #nav .dropdown-menu a');
    navLinks.forEach(el => el.classList.remove('active'));

    const topLinks = document.querySelectorAll('#nav > a');
    topLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      if (isHome && !isProductCategory && (href === 'index.html' || href === '/')) {
        link.classList.add('active');
      } else if (isAbout && href.includes('about')) {
        link.classList.add('active');
      } else if (isEthyx && href.includes('ethyx')) {
        link.classList.add('active');
      } else if (isValmo && href.includes('valmo')) {
        link.classList.add('active');
      } else if (isContact && href.includes('contact')) {
        link.classList.add('active');
      }
    });

    if (isProductCategory) {
      document.querySelector('#nav .dropdown')?.classList.add('active');
      document.querySelector('#nav .drop-toggle')?.classList.add('active');

      document.querySelectorAll('#nav .dropdown-menu a').forEach(dropLink => {
        const dropHref = dropLink.getAttribute('href') || '';
        if (dropHref.includes(targetPath)) {
          dropLink.classList.add('active');
        }
      });
    }
  }

  // Smooth client-side transition
  async function navigateTo(targetUrl, isPopState = false) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) {
      window.location.href = targetUrl;
      return;
    }

    const currentUrlObj = new URL(window.location.href);
    const targetUrlObj = new URL(targetUrl, window.location.origin);
    const targetPath = targetUrlObj.pathname.split('/').pop() || 'index.html';
    const targetHash = targetUrlObj.hash;
    const currentPath = currentUrlObj.pathname.split('/').pop() || 'index.html';

    // 1. Same-page hash jump (e.g. on index.html clicking #products or index.html#products)
    if (
      (currentPath === targetPath || (currentPath === 'index.html' && targetPath === '') || (currentPath === '' && targetPath === 'index.html')) &&
      targetHash
    ) {
      const targetEl = document.getElementById(targetHash.replace('#', ''));
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
        updateNavActiveState(targetPath, targetHash);
        if (!isPopState) {
          window.history.pushState(null, '', targetUrlObj.pathname + targetHash);
        }
        closeMobileNav();
        return;
      }
    }

    // 2. Fetch or retrieve from RAM cache
    let html = pageCache.get(targetPath) || pageCache.get(targetUrlObj.pathname) || pageCache.get('/' + targetPath);

    // 3. Initiate subtle fade out of main-content (header never moves!)
    mainContent.classList.add('transition-out');

    if (!html) {
      try {
        const res = await fetch(targetUrlObj.pathname);
        if (res.ok) {
          html = await res.text();
          pageCache.set(targetPath, html);
        }
      } catch (err) {
        window.location.href = targetUrl;
        return;
      }
    }

    if (!html) {
      window.location.href = targetUrl;
      return;
    }

    // 4. Parse incoming HTML in memory
    const parser = new DOMParser();
    const newDoc = parser.parseFromString(html, 'text/html');
    const newMain = newDoc.getElementById('main-content') || newDoc.querySelector('main');

    if (!newMain) {
      window.location.href = targetUrl;
      return;
    }

    // 5. Update Document Title & Nav Active State instantly
    if (newDoc.title) {
      document.title = newDoc.title;
    }
    updateNavActiveState(targetPath, targetHash);

    // 6. Smooth DOM swap
    await new Promise(r => setTimeout(r, 65));
    mainContent.innerHTML = newMain.innerHTML;

    // 7. Update browser history
    if (!isPopState) {
      window.history.pushState(null, '', targetUrlObj.pathname + targetHash);
    }

    // 8. Handle target scroll
    if (targetHash) {
      const targetEl = document.getElementById(targetHash.replace('#', ''));
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // 9. Fade main-content back in
    mainContent.classList.remove('transition-out');
    mainContent.classList.add('transition-in');
    setTimeout(() => {
      mainContent.classList.remove('transition-in');
    }, 220);

    // 10. Re-initialize interactive page features
    closeMobileNav();
    initPageFeatures();
  }

  // Handle browser back and forward buttons
  window.addEventListener('popstate', () => {
    navigateTo(window.location.href, true);
  });

  // Global Link Click Delegation
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Skip special external links
    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('tel:') ||
      href.startsWith('mailto:') ||
      href.startsWith('javascript:') ||
      link.target === '_blank'
    ) {
      return;
    }

    // Check if dropdown toggle
    if (link.classList.contains('drop-toggle')) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.closest('.dropdown')?.classList.toggle('open');
        return;
      }
      // On desktop: if user clicks "Products", smoothly navigate to #products
      e.preventDefault();
      navigateTo('index.html#products');
      return;
    }

    // Internal anchor or page link
    e.preventDefault();
    navigateTo(href);
  });

  // Hover prefetch: warm cache on hover
  document.addEventListener('mouseover', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('tel') || href.startsWith('mailto')) return;
    const cleanPath = href.split('#')[0];
    if (cleanPath && !pageCache.has(cleanPath)) {
      fetch(cleanPath).then(r => r.text()).then(html => pageCache.set(cleanPath, html)).catch(() => {});
    }
  }, { passive: true });

  // ------------------------------------------------------------------------
  // 10. Page Features Lifecycle (Re-initialized on SPA route swap)
  // ------------------------------------------------------------------------
  function initPageFeatures() {
    // A. Product Card Click -> Requires Phone Login or opens Product Details
    document.querySelectorAll('.product, .collection-card').forEach((card) => {
      card.style.cursor = 'pointer';

      card.onclick = (e) => {
        const title = card.querySelector('h3')?.textContent.trim() || 'Packaging Product';
        const img = card.querySelector('img')?.src || 'https://ethyxpackagingsolution.com/assets/1-BgoOQK8l.webp';

        e.preventDefault();

        const savedPhone = localStorage.getItem('ethyx_user_phone');
        if (!savedPhone) {
          // Not verified -> Prompt for phone login
          openPhoneLoginModal(title, () => {
            showProductDetailModal(title, img);
          });
        } else {
          // Already logged in -> Show product details
          showProductDetailModal(title, img);
        }
      };
    });

    // B. Ambient Video Autoplay Observer (for index.html)
    const factoryVideo = document.getElementById('ambientFactoryVideo') || document.querySelector('.ambient-factory-video');
    if (factoryVideo) {
      factoryVideo.muted = true;
      factoryVideo.playsInline = true;
      factoryVideo.loop = true;
      factoryVideo.removeAttribute('controls');

      if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const p = factoryVideo.play();
              if (p !== undefined) {
                p.catch(() => {
                  factoryVideo.muted = true;
                  factoryVideo.play();
                });
              }
            } else {
              factoryVideo.pause();
            }
          });
        }, { threshold: 0.15 });

        videoObserver.observe(factoryVideo);
      } else {
        factoryVideo.play();
      }

      // Quick Controls for Sound & Play/Pause
      const soundBtn = document.getElementById('videoSoundBtn');
      const playBtn = document.getElementById('videoPlayBtn');

      if (soundBtn) {
        soundBtn.addEventListener('click', () => {
          factoryVideo.muted = !factoryVideo.muted;
          const muted = factoryVideo.muted;
          const mIcon = soundBtn.querySelector('.sound-icon-muted');
          const uIcon = soundBtn.querySelector('.sound-icon-unmuted');
          if (mIcon && uIcon) {
            mIcon.style.display = muted ? 'inline' : 'none';
            uIcon.style.display = muted ? 'none' : 'inline';
          }
        });
      }

      if (playBtn) {
        playBtn.addEventListener('click', () => {
          const pIcon = playBtn.querySelector('.play-state-playing');
          const sIcon = playBtn.querySelector('.play-state-paused');
          if (factoryVideo.paused) {
            factoryVideo.play();
            if (pIcon && sIcon) {
              pIcon.style.display = 'inline';
              sIcon.style.display = 'none';
            }
          } else {
            factoryVideo.pause();
            if (pIcon && sIcon) {
              pIcon.style.display = 'none';
              sIcon.style.display = 'inline';
            }
          }
        });
      }
    }

    // C. FAQ Accordions
    document.querySelectorAll('.acc-btn').forEach((btn) => {
      btn.onclick = () => {
        const item = btn.closest('.acc-item');
        if (!item) return;

        const wasActive = item.classList.contains('active');

        document.querySelectorAll('.acc-item').forEach((other) => {
          other.classList.remove('active');
          const icon = other.querySelector('.acc-btn span');
          if (icon) icon.textContent = '+';
        });

        if (!wasActive) {
          item.classList.add('active');
          const icon = item.querySelector('.acc-btn span');
          if (icon) icon.textContent = '−';
        }
      };
    });

    // D. Scroll Reveal Elements
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

      revealElements.forEach(el => observer.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('active'));
    }

    // E. Interactive Special Offer / Valuable Products Slider
    const promoSlider = document.getElementById('promoSliderCard');
    if (promoSlider) {
      const slides = promoSlider.querySelectorAll('.slider-slide');
      const prevBtn = promoSlider.querySelector('#promoPrevBtn');
      const nextBtn = promoSlider.querySelector('#promoNextBtn');
      let currentIdx = 0;
      let slideTimer = null;

      function showSlide(idx) {
        if (!slides.length) return;
        currentIdx = (idx + slides.length) % slides.length;
        slides.forEach((s, i) => {
          s.classList.toggle('active', i === currentIdx);
        });
      }

      function startTimer() {
        clearInterval(slideTimer);
        slideTimer = setInterval(() => {
          showSlide(currentIdx + 1);
        }, 5500);
      }

      if (prevBtn) {
        prevBtn.onclick = (e) => {
          e.preventDefault();
          showSlide(currentIdx - 1);
          startTimer();
        };
      }
      if (nextBtn) {
        nextBtn.onclick = (e) => {
          e.preventDefault();
          showSlide(currentIdx + 1);
          startTimer();
        };
      }

      promoSlider.addEventListener('mouseenter', () => clearInterval(slideTimer));
      promoSlider.addEventListener('mouseleave', startTimer);
      startTimer();
    }

    // E. Framer Motion Integration
    if (window.Motion) {
      const { animate, inView, stagger } = window.Motion;

      // Floating badges & chips physics loop
      const badges = document.querySelectorAll('.ethyx-floating-badge, .banner-floating-chip');
      badges.forEach((b, i) => {
        animate(b, 
          { y: [0, i % 2 === 0 ? -6 : 6, 0] }, 
          { duration: 4.0 + (i % 3) * 0.4, repeat: Infinity, ease: "easeInOut" }
        );
      });

      // Banner packaging mockups gentle 3D breathing float
      const productMockups = document.querySelectorAll('.banner-courier-svg, .banner-product-img');
      productMockups.forEach((img, i) => {
        animate(img,
          { y: [0, -7, 0] },
          { duration: 5.2 + i * 0.6, repeat: Infinity, ease: "easeInOut" }
        );
      });

      // Hero banner entry spring
      const banners = document.querySelectorAll('.banner, .ethyx-hero-text, .ethyx-hero-visual');
      if (banners.length > 0) {
        animate(banners, 
          { opacity: [0, 1], y: [20, 0] }, 
          { delay: stagger(0.1), duration: 0.7, easing: [0.16, 1, 0.3, 1] }
        );
      }

      // Product cards stagger on scroll
      const productGrid = document.querySelector('.product-grid');
      if (productGrid) {
        inView(productGrid, () => {
          animate('.product', 
            { opacity: [0, 1], y: [20, 0] }, 
            { delay: stagger(0.05), duration: 0.5, easing: [0.16, 1, 0.3, 1] }
          );
        });
      }

      // Collection cards stagger
      const collectionGrid = document.querySelector('.collection-grid');
      if (collectionGrid) {
        inView(collectionGrid, () => {
          animate('.collection-card', 
            { opacity: [0, 1], y: [20, 0] }, 
            { delay: stagger(0.07), duration: 0.5, easing: [0.16, 1, 0.3, 1] }
          );
        });
      }
    }
  }

  // Initialize initial page features on load
  initPageFeatures();
});
