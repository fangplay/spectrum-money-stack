```vue
<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const features = [
  {
    icon: '📊',
    title: 'Money Dashboard',
    description:
      'See your financial plans and planned amounts in one convenient overview.',
  },
  {
    icon: '🎯',
    title: 'Money Planning',
    description:
      'Create, review, and manage financial plans to organize your money goals.',
  },
  {
    icon: '💳',
    title: 'Transaction Tracking',
    description:
      'Organize income and expenses to understand where your money goes.',
  },
  {
    icon: '🗂️',
    title: 'Categories and Budgets',
    description:
      'Group transactions into categories and organize your spending limits.',
  },
]
</script>

<template>
  <main class="home-page">
    <section class="hero">
      <div class="hero-content">
        <span class="eyebrow">PERSONAL FINANCE MANAGEMENT</span>

        <h1>
          Take control of your money with
          <span>Spectrum Money Stack.</span>
        </h1>

        <p class="hero-description">
          A personal finance platform designed to help you organize money
          plans, track transactions, manage budgets, and work toward your
          financial goals.
        </p>

        <div class="hero-actions">
          <NuxtLink to="/register" class="button primary">
            Get Started
          </NuxtLink>

          <NuxtLink to="/login" class="button secondary">
            Sign In
          </NuxtLink>
        </div>

        <p class="hero-note">
          Plan smarter. Track better. Build healthier money habits.
        </p>
      </div>

      <div class="hero-visual" aria-label="Money management illustration">
        <div class="visual-orb orb-one"></div>
        <div class="visual-orb orb-two"></div>

        <div class="preview-card">
          <div class="preview-header">
            <div>
              <span class="preview-label">YOUR MONEY JOURNEY</span>
              <h2>Plan with purpose</h2>
            </div>
            <span class="preview-icon">✦</span>
          </div>

          <div class="preview-item">
            <span class="item-icon blue">🎯</span>
            <div class="item-info">
              <strong>Money Plans</strong>
              <span>Organize your goals</span>
            </div>
            <span class="item-arrow">→</span>
          </div>

          <div class="preview-item">
            <span class="item-icon green">↗</span>
            <div class="item-info">
              <strong>Transactions</strong>
              <span>Track money movement</span>
            </div>
            <span class="item-arrow">→</span>
          </div>

          <div class="preview-item">
            <span class="item-icon purple">◷</span>
            <div class="item-info">
              <strong>Budgets</strong>
              <span>Keep spending organized</span>
            </div>
            <span class="item-arrow">→</span>
          </div>

          <div class="preview-footer">
            <span class="status-dot"></span>
            Your financial overview starts here
          </div>
        </div>
      </div>
    </section>

    <section class="features-section">
      <div class="section-heading">
        <span class="eyebrow">ONE PLACE FOR YOUR FINANCES</span>
        <h2>Everything starts with a better plan.</h2>
        <p>
          Bring the essential parts of everyday money management together
          in one simple workspace.
        </p>
      </div>

      <div class="feature-grid">
        <article
          v-for="feature in features"
          :key="feature.title"
          class="feature-card"
        >
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </article>
      </div>
    </section>

    <section class="cta-section">
      <div>
        <span class="eyebrow">YOUR NEXT STEP</span>
        <h2>Make your money goals more manageable.</h2>
        <p>Create an account to start organizing your financial plans.</p>
      </div>

      <NuxtLink to="/register" class="button primary">
        Create Your Account →
      </NuxtLink>
    </section>

    <footer class="home-footer">
      <NuxtLink to="/" class="footer-brand">
        Spectrum Money Stack
      </NuxtLink>
      <span>Personal finance, organized.</span>
    </footer>
  </main>
</template>

<style scoped>
.home-page {
  background: var(--bg);
  color: var(--text);
}

.hero {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 28px;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 56px;
}

.eyebrow {
  display: inline-block;
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.hero h1 {
  max-width: 680px;
  margin: 22px 0;
  font-size: clamp(2.5rem, 5vw, 4.3rem);
  line-height: 1.1;
  letter-spacing: -0.045em;
}

.hero h1 span {
  display: block;
  color: var(--primary);
}

.hero-description,
.section-heading > p,
.cta-section p {
  color: var(--muted);
  line-height: 1.8;
}

.hero-description {
  max-width: 590px;
  font-size: 1.05rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 13px 21px;
  border-radius: 9px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s, opacity 0.2s;
}

.button:hover {
  transform: translateY(-2px);
}

.primary {
  background: var(--primary);
  color: white;
}

.secondary {
  border: 1px solid var(--border);
  color: var(--text);
  background: var(--surface);
}

.hero-note {
  margin-top: 24px;
  color: var(--muted);
  font-size: 0.85rem;
}

.hero-visual {
  min-height: 420px;
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 28px;
  background: var(--surface);
  padding: 28px;
}

.visual-orb {
  position: absolute;
  width: 190px;
  height: 190px;
  border-radius: 50%;
  filter: blur(2px);
  opacity: 0.2;
}

.orb-one {
  top: -50px;
  right: -35px;
  background: #6366f1;
}

.orb-two {
  bottom: -70px;
  left: -45px;
  background: #14b8a6;
}

.preview-card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 390px;
  padding: 25px;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: var(--bg);
  box-shadow: 0 18px 45px rgb(0 0 0 / 8%);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.preview-label {
  color: var(--muted);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
}

.preview-header h2 {
  font-size: 1.3rem;
  margin: 8px 0 0;
}

.preview-icon {
  font-size: 1.7rem;
  color: var(--primary);
}

.preview-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
}

.item-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 11px;
}

.blue {
  background: #dbeafe;
}

.green {
  background: #dcfce7;
}

.purple {
  background: #f3e8ff;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.item-info strong {
  font-size: 0.9rem;
}

.item-info span {
  color: var(--muted);
  font-size: 0.78rem;
}

.item-arrow {
  color: var(--primary);
}

.preview-footer {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 20px;
  color: var(--muted);
  font-size: 0.75rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
}

.features-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 28px 90px;
}

.section-heading {
  max-width: 680px;
  margin-bottom: 36px;
}

.section-heading h2,
.cta-section h2 {
  margin: 14px 0;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  letter-spacing: -0.03em;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.feature-card {
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
}

.feature-icon {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 1.05rem;
}

.feature-card p {
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.7;
}

.cta-section {
  max-width: 1144px;
  margin: 0 auto 70px;
  padding: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 28px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
}

.cta-section > div {
  max-width: 650px;
}

.cta-section h2 {
  font-size: 1.8rem;
}

.cta-section p {
  margin-bottom: 0;
}

.home-footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding: 25px 28px;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.85rem;
}

.footer-brand {
  color: var(--text);
  font-weight: 700;
  text-decoration: none;
}

@media (max-width: 950px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 35px;
    padding-top: 55px;
  }

  .hero-visual {
    min-height: 380px;
  }

  .feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .cta-section {
    margin-right: 20px;
    margin-left: 20px;
  }
}

@media (max-width: 600px) {
  .hero {
    padding: 42px 18px;
  }

  .hero-visual {
    padding: 18px;
    min-height: 340px;
  }

  .preview-card {
    padding: 18px;
  }

  .features-section {
    padding: 35px 18px 55px;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .cta-section {
    align-items: flex-start;
    flex-direction: column;
    padding: 25px;
    margin-bottom: 40px;
  }

  .home-footer {
    padding: 22px 18px;
  }
}
</style>
```