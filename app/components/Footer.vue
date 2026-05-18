<template>
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-grid">
        <div class="footer-info">
          <NuxtLink to="/" class="logo">
            <span class="logo-text">PHONEX</span>
          </NuxtLink>
          <p class="footer-desc">
            Experience the future of mobile technology with our curated collection of premium smartphones. Minimalist design, maximal performance.
          </p>
        </div>

        <div class="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/">Products</NuxtLink></li>
            <li><NuxtLink to="/">Collections</NuxtLink></li>
            <li><NuxtLink to="/">About Us</NuxtLink></li>
          </ul>
        </div>

        <div class="footer-links">
          <h3>Support</h3>
          <ul>
            <li><NuxtLink to="/">Shipping info</NuxtLink></li>
            <li><NuxtLink to="/">Returns & Exchanges</NuxtLink></li>
            <li><NuxtLink to="/">Contact Us</NuxtLink></li>
            <li><NuxtLink to="/">FAQ</NuxtLink></li>
          </ul>
        </div>

        <div class="footer-newsletter">
          <h3>Newsletter</h3>
          <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form class="newsletter-form" @submit.prevent>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" class="btn btn-primary" aria-label="tham gia">Join</button>
          </form>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 PHONEX. All rights reserved.</p>
    </div>
  </footer>
</template>
