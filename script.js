/* =============================================
   CASILE MOWING — Professional Lawn Care
   JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ============================================
  // NAVBAR — Scroll effect & mobile toggle
  // ============================================
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Scroll effect
  function handleNavScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // init

  // Mobile menu toggle
  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', function (e) {
    if (navLinks.classList.contains('open') &&
        !navbar.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });

  // ============================================
  // BOOKING FORM — Validation & localStorage
  // ============================================
  const bookingForm = document.getElementById('bookingForm');
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  const submitSpinner = document.getElementById('submitSpinner');
  const modal = document.getElementById('bookingModal');
  const closeModal = document.getElementById('closeModal');
  const bookingDetails = document.getElementById('bookingDetails');

  // Set min date to today
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;
  }

  // Field validation map
  const fields = {
    name: { el: document.getElementById('name'), error: document.getElementById('nameError') },
    email: { el: document.getElementById('email'), error: document.getElementById('emailError') },
    phone: { el: document.getElementById('phone'), error: document.getElementById('phoneError') },
    address: { el: document.getElementById('address'), error: document.getElementById('addressError') },
    service: { el: document.getElementById('service'), error: document.getElementById('serviceError') },
    yardSize: { el: document.getElementById('yardSize'), error: document.getElementById('yardSizeError') },
    date: { el: document.getElementById('date'), error: document.getElementById('dateError') },
    time: { el: document.getElementById('time'), error: document.getElementById('timeError') }
  };

  // Validation rules
  function validateField(name) {
    var field = fields[name];
    if (!field || !field.el) return true;

    var val = field.el.value.trim();
    var valid = true;

    switch (name) {
      case 'name':
        valid = val.length >= 2;
        break;
      case 'email':
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        break;
      case 'phone':
        valid = val.replace(/[\s\-\(\)]/g, '').length >= 10;
        break;
      case 'address':
        valid = val.length >= 5;
        break;
      case 'service':
      case 'yardSize':
      case 'time':
        valid = val !== '';
        break;
      case 'date':
        valid = val !== '' && new Date(val) >= new Date(new Date().toDateString());
        break;
    }

    if (!valid) {
      field.el.classList.add('error');
      if (field.error) field.error.classList.add('visible');
    } else {
      field.el.classList.remove('error');
      if (field.error) field.error.classList.remove('visible');
    }

    return valid;
  }

  // Real-time validation on blur
  Object.keys(fields).forEach(function (name) {
    var field = fields[name];
    if (field.el) {
      field.el.addEventListener('blur', function () { validateField(name); });
      field.el.addEventListener('input', function () {
        if (field.el.classList.contains('error')) validateField(name);
      });
    }
  });

  // Form submission
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate all fields
    var allValid = true;
    Object.keys(fields).forEach(function (name) {
      if (!validateField(name)) allValid = false;
    });

    if (!allValid) {
      // Scroll to first error
      var firstError = document.querySelector('.error');
      if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Show loading state
    submitText.textContent = 'Booking...';
    submitSpinner.style.display = 'inline-block';
    submitBtn.disabled = true;

    // Gather form data
    var formData = {
      id: 'BK-' + Date.now().toString(36).toUpperCase(),
      name: fields.name.el.value.trim(),
      email: fields.email.el.value.trim(),
      phone: fields.phone.el.value.trim(),
      address: fields.address.el.value.trim(),
      service: fields.service.el.value,
      serviceLabel: fields.service.el.options[fields.service.el.selectedIndex].text,
      yardSize: fields.yardSize.el.value,
      yardSizeLabel: fields.yardSize.el.options[fields.yardSize.el.selectedIndex].text,
      date: fields.date.el.value,
      time: fields.time.el.value,
      timeLabel: fields.time.el.options[fields.time.el.selectedIndex].text,
      notes: document.getElementById('notes').value.trim(),
      addons: {
        edging: document.getElementById('addEdging').checked,
        trimming: document.getElementById('addTrimming').checked,
        weedRemoval: document.getElementById('addWeedRemoval').checked,
        leafCleanup: document.getElementById('addLeafCleanup').checked
      },
      createdAt: new Date().toISOString()
    };

    // Send booking to owner via Web3Forms
    var web3formsKey = localStorage.getItem('web3forms_key') || 'YOUR_WEB3FORMS_KEY_HERE';
    
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: web3formsKey,
        subject: 'New Booking - Casile Mowing',
        from_name: formData.name,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        service: formData.serviceLabel,
        yardSize: formData.yardSizeLabel,
        date: formData.date,
        time: formData.timeLabel,
        notes: formData.notes,
        booking_id: formData.id
      })
    }).catch(function () {
      // If web3forms fails, still save locally
      console.log('Booking saved locally');
    });

    // Save to localStorage
    saveBooking(formData);

    // Show confirmation modal
    showConfirmation(formData);

    // Reset button
    submitText.textContent = 'Confirm Booking';
    submitSpinner.style.display = 'none';
    submitBtn.disabled = false;
  });

  // ============================================
  // LOCALSTORAGE — Bookings persistence
  // ============================================
  var STORAGE_KEY = 'casile_mowing_bookings';

  function saveBooking(data) {
    var bookings = getBookings();
    bookings.push(data);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.warn('localStorage full or unavailable:', e);
    }
  }

  function getBookings() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  // ============================================
  // CONFIRMATION MODAL
  // ============================================
  function showConfirmation(data) {
    var addonList = [];
    if (data.addons.edging) addonList.push('Edging');
    if (data.addons.trimming) addonList.push('Trimming');
    if (data.addons.weedRemoval) addonList.push('Weed Removal');
    if (data.addons.leafCleanup) addonList.push('Leaf Cleanup');

    var detailsHtml =
      '<strong>Booking #:</strong> ' + data.id + '<br>' +
      '<strong>Name:</strong> ' + escapeHtml(data.name) + '<br>' +
      '<strong>Service:</strong> ' + escapeHtml(data.serviceLabel) + '<br>' +
      '<strong>Yard Size:</strong> ' + escapeHtml(data.yardSizeLabel) + '<br>' +
      '<strong>Date:</strong> ' + formatDate(data.date) + '<br>' +
      '<strong>Time:</strong> ' + escapeHtml(data.timeLabel) + '<br>' +
      '<strong>Address:</strong> ' + escapeHtml(data.address);

    if (addonList.length) {
      detailsHtml += '<br><strong>Add-ons:</strong> ' + addonList.join(', ');
    }

    bookingDetails.innerHTML = detailsHtml;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModalFn() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    bookingForm.reset();
    // Reset date to today
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
    // Clear errors
    document.querySelectorAll('.error').forEach(function (el) { el.classList.remove('error'); });
    document.querySelectorAll('.error-message.visible').forEach(function (el) { el.classList.remove('visible'); });
  }

  closeModal.addEventListener('click', closeModalFn);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModalFn();
  });

  // ============================================
  // CONTACT FORM
  // ============================================
  var contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = contactForm.querySelector('.btn');
    var originalText = btn.textContent;
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#22c55e';
    setTimeout(function () {
      btn.textContent = originalText;
      btn.style.background = '';
      contactForm.reset();
    }, 2500);
  });

  // ============================================
  // SMOOTH SCROLL WITH OFFSET
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80;
        var targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // ============================================
  // SCROLL ANIMATIONS (Intersection Observer)
  // ============================================
  var animateElements = document.querySelectorAll(
    '.about-card, .service-card, .pricing-card, .step, .testimonial-card, .pricing-addons'
  );

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animateElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function formatDate(dateStr) {
    var d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // ============================================
  // KEYBOARD — ESC to close modal
  // ============================================
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModalFn();
    }
  });

  console.log('🌱 Casile Mowing — Your Yard, Our Priority');
  console.log('📅 Bookings stored:', getBookings().length);

});
