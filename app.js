/**
 * NEXUS - Developer Landing Page Interactive Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initCopyProtocol();
  initFormHandler();
  initMobileMenu();
});

// 1. Interactive Tabs / Matrix Switcher
function initTabs() {
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  const tabContents = document.querySelectorAll('.tab-content');

  tabTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-target');

      tabTriggers.forEach((t) => t.classList.remove('active'));
      tabContents.forEach((c) => c.classList.remove('active'));

      trigger.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

// 2. Command Copy to Clipboard & Toast
function initCopyProtocol() {
  const copyBtn = document.getElementById('copy-protocol-btn');
  const toast = document.getElementById('toast');
  const command = 'npx init @nexus/future';

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(command);
      showToast('Copied init command to clipboard!');
    } catch (err) {
      showToast('Command: ' + command);
    }
  });

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }
}

// 3. Email Submission Form Handler
function initFormHandler() {
  const joinBtn = document.getElementById('join-btn');
  const emailInput = document.getElementById('email-input');
  const feedbackMsg = document.getElementById('feedback-msg');

  if (!joinBtn || !emailInput) return;

  joinBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!email || !validateEmail(email)) {
      feedbackMsg.textContent = 'Please provide a valid developer email.';
      feedbackMsg.style.color = '#f43f5e';
      return;
    }

    joinBtn.disabled = true;
    joinBtn.textContent = 'Signing Key...';

    setTimeout(() => {
      feedbackMsg.textContent = 'Access granted. Welcome to the Nexus Guild.';
      feedbackMsg.style.color = '#22c55e';
      emailInput.value = '';
      joinBtn.disabled = false;
      joinBtn.textContent = 'Joined';
    }, 600);
  });

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  }
}

// 4. Mobile Menu Navigation Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}
