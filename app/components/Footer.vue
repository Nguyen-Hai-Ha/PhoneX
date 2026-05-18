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

<style scoped>
.footer {
  background-color: var(--secondary-color);
  padding-top: 80px 0 40px;
  margin-top: 80px;
  border-top: 1px solid var(--glass-border);
}

.footer-content{
  padding-top: 40px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  gap: 40px;
  margin-bottom: 60px;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 2px;
  margin-bottom: 20px;
  display: inline-block;
  color: #d70018
}

.footer-desc {
  font-size: 0.9rem;
  opacity: 0.9;
  max-width: 300px;
}

h3 {
  font-size: 1.1rem;
  margin-bottom: 25px;
  color: #d70018
}

.footer-links ul li {
  margin-bottom: 12px;
}

.footer-links ul li a {
  font-size: 0.9rem;
  opacity: 0.9;
}

.footer-links ul li a:hover {
  opacity: 1;
  padding-left: 5px;
}

.footer-newsletter p {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 20px;
}

.newsletter-form {
  display: flex;
  gap: 10px;
}

.newsletter-form input {
  flex: 1;
  padding: 12px 20px;
  border-radius: 50px;
  border: 1px solid var(--glass-border);
  background: var(--bg-color);
  color: var(--text-color);
}

.footer-bottom {
  background-color: #bebebe;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  font-size: 0.8rem;
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>