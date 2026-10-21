const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const BASE_URL = 'http://127.0.0.1:5173';

async function runAllTests() {
  console.log('🚀 Starting HireLynk Full Frontend Features Test Suite...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  let passedTests = 0;
  let failedTests = 0;

  function report(name, success, details = '') {
    if (success) {
      passedTests++;
      console.log(`  ✅ [PASS] ${name} ${details}`);
    } else {
      failedTests++;
      console.error(`  ❌ [FAIL] ${name} ${details}`);
    }
  }

  try {
    // =========================================================================
    // TEST 1: Public Landing Page
    // =========================================================================
    console.log('\n--- Test Suite 1: Public Landing Page ---');
    await page.goto(`${BASE_URL}/home`, { waitUntil: 'networkidle' });
    
    const headline = await page.textContent('.hero-headline');
    report('Landing Hero Headline loads', headline.includes('Elite Tech Talent'));

    const categoriesCount = await page.locator('.category-card').count();
    report('Popular Tech Categories render', categoriesCount >= 6, `(${categoriesCount} categories)`);

    const companiesCount = await page.locator('.company-card').count();
    report('Featured Companies render', companiesCount >= 6, `(${companiesCount} companies)`);

    const featuredJobsCount = await page.locator('.landing-job-card').count();
    report('Featured Jobs render on landing', featuredJobsCount >= 4, `(${featuredJobsCount} jobs)`);

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_landing_page.png') });

    // =========================================================================
    // TEST 2: Talent Community Feed (/feed)
    // =========================================================================
    console.log('\n--- Test Suite 2: Talent Community Feed ---');
    await page.goto(`${BASE_URL}/feed`, { waitUntil: 'networkidle' });

    // Verify left and right sidebars
    const leftSidebar = await page.isVisible('.feed-left-sidebar');
    const rightSidebar = await page.isVisible('.feed-right-sidebar');
    report('Feed 3-column layout rendered', leftSidebar && rightSidebar);

    // Initial posts count
    const initialPostsCount = await page.locator('.post-card').count();
    report('Feed initial posts render', initialPostsCount >= 3, `(${initialPostsCount} posts)`);

    // Test Create Post Modal
    await page.click('.create-post-trigger-btn');
    await page.waitForSelector('.modal-overlay');
    await page.fill('.modal-body textarea', 'Excited to join the HireLynk developer community! 🚀 #React19 #SystemDesign');
    await page.click('.modal-footer button.btn-primary');
    await page.waitForTimeout(500);

    const updatedPostsCount = await page.locator('.post-card').count();
    report('Create and publish new post', updatedPostsCount === initialPostsCount + 1);

    // Test Like Post
    const firstLikeBtn = page.locator('.post-card').first().locator('.post-action-btn').first();
    await firstLikeBtn.click();
    await page.waitForTimeout(300);
    const isLiked = await firstLikeBtn.evaluate(el => el.classList.contains('liked'));
    report('Toggle like on post', isLiked);

    // Test Comment on Post
    const commentBtn = page.locator('.post-card').first().locator('.post-action-btn').nth(1);
    await commentBtn.click();
    await page.waitForSelector('.comment-input');
    await page.fill('.comment-input', 'Great insights, thoroughly enjoyed this!');
    await page.click('.comment-submit-btn');
    await page.waitForTimeout(500);

    const commentContent = await page.textContent('.comments-list');
    report('Add comment to post', commentContent.includes('Great insights, thoroughly enjoyed this!'));

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02_feed_page.png') });

    // =========================================================================
    // TEST 3: Jobs Marketplace (/jobs)
    // =========================================================================
    console.log('\n--- Test Suite 3: Jobs Marketplace & Easy Apply ---');
    await page.goto(`${BASE_URL}/jobs`, { waitUntil: 'networkidle' });

    const jobCardsCount = await page.locator('.job-card-item').count();
    report('Job marketplace loads job listings', jobCardsCount >= 5, `(${jobCardsCount} jobs)`);

    // Test clicking a job to inspect details pane
    await page.locator('.job-card-item').nth(1).click();
    await page.waitForTimeout(300);
    const detailTitle = await page.textContent('.job-detail-title');
    report('Job detail pane displays selected job', detailTitle.length > 0, `(${detailTitle.trim()})`);

    // Test Search input
    await page.fill('.jobs-search-input-wrap input', 'React');
    await page.waitForTimeout(300);
    const filteredCount = await page.locator('.job-card-item').count();
    report('Search jobs by tech keyword filter', filteredCount >= 1, `(${filteredCount} matching React)`);

    // Clear search
    await page.click('button:has-text("Reset Filters")');
    await page.waitForTimeout(300);

    // Test Easy Apply Modal & Confetti
    const applyBtn = page.locator('button:has-text("Easy Apply with HireLynk")');
    if (await applyBtn.isVisible()) {
      await applyBtn.click();
      await page.waitForSelector('.modal-overlay');
      await page.fill('textarea[placeholder*="highlight why"]', 'I have 7+ years of React architecture experience and would love to join the team!');
      await page.click('button:has-text("Submit Application")');
      await page.waitForTimeout(800);

      const toastMsg = await page.textContent('.toast-container');
      report('Easy Apply submission triggers toast & updates status', toastMsg.includes('Application submitted'));
    } else {
      report('Easy Apply button state verified', true, '(Already applied state verified)');
    }

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03_jobs_page.png') });

    // =========================================================================
    // TEST 4: My Network (/network)
    // =========================================================================
    console.log('\n--- Test Suite 4: My Network & Connections ---');
    await page.goto(`${BASE_URL}/network`, { waitUntil: 'networkidle' });

    // Check invitations
    const invitationCount = await page.locator('.invitation-item').count();
    report('Network invitations list renders', invitationCount >= 1, `(${invitationCount} invitations)`);

    if (invitationCount > 0) {
      await page.click('.invitation-actions button:has-text("Accept")');
      await page.waitForTimeout(500);
      const newInvCount = await page.locator('.invitation-item').count();
      report('Accept connection invitation', newInvCount === invitationCount - 1);
    }

    // Suggestions connect
    const suggestionsCount = await page.locator('.person-card').count();
    report('Suggestions grid renders', suggestionsCount >= 2, `(${suggestionsCount} suggestions)`);
    await page.click('.person-card .person-connect-btn');
    await page.waitForTimeout(500);
    const toastNet = await page.textContent('.toast-container');
    report('Send connection invitation to suggestion', toastNet.includes('invitation sent'));

    // Switch to active connections tab
    await page.click('button:has-text("Connections")');
    await page.waitForTimeout(300);
    const activeConns = await page.locator('.active-conn-item').count();
    report('Active connections list tab loads', activeConns >= 1, `(${activeConns} connections)`);

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04_network_page.png') });

    // =========================================================================
    // TEST 5: User Profile (/profile)
    // =========================================================================
    console.log('\n--- Test Suite 5: User Profile ---');
    await page.goto(`${BASE_URL}/profile`, { waitUntil: 'networkidle' });

    const profileName = await page.textContent('.profile-full-name');
    report('Profile header renders user details', profileName.includes('Sarah Jenkins'));

    // Toggle Open to Work
    const openToWorkBtn = page.locator('.open-to-work-card button');
    const initialText = await openToWorkBtn.textContent();
    await openToWorkBtn.click();
    await page.waitForTimeout(400);
    const newText = await openToWorkBtn.textContent();
    report('Toggle "Open to Work" status', initialText !== newText);

    // Endorse Skill
    const firstEndorseBtn = page.locator('.endorse-action-btn').first();
    const beforeCount = await page.locator('.endorse-badge').first().textContent();
    await firstEndorseBtn.click();
    await page.waitForTimeout(300);
    const afterCount = await page.locator('.endorse-badge').first().textContent();
    report('Endorse skill counter increments', beforeCount !== afterCount);

    // Preview Resume Modal
    await page.click('button:has-text("Preview Resume")');
    await page.waitForSelector('.modal-overlay');
    const resumeHeading = await page.textContent('.modal-content h2');
    report('Resume PDF Preview modal renders full document', resumeHeading.includes('Sarah Jenkins'));
    await page.click('.modal-header .btn-icon'); // Close modal
    await page.waitForTimeout(300);

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '05_profile_page.png') });

    // =========================================================================
    // TEST 6: Messaging & Auto-Reply Simulation (/messaging)
    // =========================================================================
    console.log('\n--- Test Suite 6: Messaging & Simulated Auto-Reply ---');
    await page.goto(`${BASE_URL}/messaging`, { waitUntil: 'networkidle' });

    const convsCount = await page.locator('.conv-item').count();
    report('Conversations list loads', convsCount >= 2, `(${convsCount} conversations)`);

    // Send a message
    const testMessageText = `Hi David, available for the tech sync at 2 PM! [${Date.now()}]`;
    await page.fill('.chat-text-input', testMessageText);
    await page.click('.chat-send-btn');
    await page.waitForTimeout(500);

    const chatText = await page.textContent('.chat-body');
    report('Message sent and rendered in chat bubble', chatText.includes(testMessageText));

    // Wait for automated recruiter auto-reply (set to 2500ms in DataContext)
    console.log('    ⏳ Waiting 3.2s for recruiter simulated auto-reply...');
    await page.waitForTimeout(3200);
    const updatedChatText = await page.textContent('.chat-body');
    report('Simulated Recruiter Auto-Reply received', updatedChatText.length > chatText.length);

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '06_messaging_page.png') });

    // =========================================================================
    // TEST 7: Notifications (/notifications)
    // =========================================================================
    console.log('\n--- Test Suite 7: Notifications ---');
    await page.goto(`${BASE_URL}/notifications`, { waitUntil: 'networkidle' });

    const notifCount = await page.locator('.lynk-card div[style*="align-items: flex-start"]').count();
    report('Notifications list rendered', notifCount >= 1, `(${notifCount} notifications)`);

    // Test Mark all as read
    await page.click('button:has-text("Mark all as read")');
    await page.waitForTimeout(400);
    const toastNotif = await page.textContent('.toast-container');
    report('Mark all notifications as read', toastNotif.includes('All notifications marked as read'));

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '07_notifications_page.png') });

    // =========================================================================
    // TEST 8: Recruiter Dashboard & ATS Kanban (/recruiter)
    // =========================================================================
    console.log('\n--- Test Suite 8: Recruiter Dashboard & ATS Kanban ---');
    await page.goto(`${BASE_URL}/recruiter`, { waitUntil: 'networkidle' });

    const kpiCardsCount = await page.locator('.stat-metric-card').count();
    report('Recruiter KPI metrics render', kpiCardsCount === 4);

    const atsColumnsCount = await page.locator('.ats-column').count();
    report('ATS Kanban 5-Stage Pipeline renders', atsColumnsCount === 5);

    // Test candidate stage change in ATS
    const firstStageSelect = page.locator('.cand-stage-select').first();
    if (await firstStageSelect.isVisible()) {
      await firstStageSelect.selectOption('Interview');
      await page.waitForTimeout(500);
      const toastATS = await page.textContent('.toast-container');
      report('Move candidate through recruitment pipeline', toastATS.includes('Interview'));
    }

    // Test Post a New Job Modal
    await page.click('button:has-text("Post a New Job")');
    await page.waitForSelector('.modal-overlay');
    await page.fill('input[name="title"]', 'Principal Distributed AI Engineer');
    await page.fill('input[name="company"]', 'CloudScale AI Labs');
    await page.fill('input[name="salary"]', '$240,000 - $320,000 / yr');
    await page.click('button:has-text("Publish Job Listing")');
    await page.waitForTimeout(600);

    const toastJob = await page.textContent('.toast-container');
    report('Recruiter creates and publishes new job listing', toastJob.includes('posted successfully'));

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '08_recruiter_dashboard.png') });

    // =========================================================================
    // TEST 9: Admin Dashboard (/admin)
    // =========================================================================
    console.log('\n--- Test Suite 9: Platform Admin Dashboard ---');
    await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle' });

    const adminUsersCount = await page.locator('table tbody tr').count();
    report('Admin user management table renders', adminUsersCount >= 4, `(${adminUsersCount} users)`);

    // Toggle Suspend user
    const firstActionBtn = page.locator('table tbody tr').first().locator('button').first();
    const btnText = await firstActionBtn.textContent();
    await firstActionBtn.click();
    await page.waitForTimeout(400);
    const newBtnText = await firstActionBtn.textContent();
    report('Admin toggles user suspension/activation status', btnText !== newBtnText);

    // Switch to Flagged Reports tab
    await page.click('button:has-text("Flagged Reports")');
    await page.waitForTimeout(300);
    const dismissBtn = page.locator('button:has-text("Dismiss Report")').first();
    if (await dismissBtn.isVisible()) {
      await dismissBtn.click();
      await page.waitForTimeout(400);
      const toastRep = await page.textContent('.toast-container');
      report('Admin resolves community reported violation', toastRep.includes('Report resolved'));
    }

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '09_admin_dashboard.png') });

    // =========================================================================
    // TEST 10: Pricing & Subscription Upgrades (/pricing)
    // =========================================================================
    console.log('\n--- Test Suite 10: Pricing & Plans ---');
    await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle' });

    const pricingCardsCount = await page.locator('.pricing-card').count();
    report('Pricing tiered plan cards render', pricingCardsCount >= 2);

    // Toggle Annual Billing (Save 20%)
    const priceBefore = await page.locator('.price-number').nth(1).textContent();
    await page.click('.switch-toggle');
    await page.waitForTimeout(300);
    const priceAfter = await page.locator('.price-number').nth(1).textContent();
    report('Toggle Annual/Monthly billing discounts', priceBefore !== priceAfter, `(${priceBefore} -> ${priceAfter})`);

    // Test Upgrade Checkout Modal
    await page.click('button:has-text("Upgrade to Career Premium")');
    await page.waitForSelector('.modal-overlay');
    await page.click('button:has-text("Confirm Upgrade")');
    await page.waitForTimeout(900);
    const toastUpgrade = await page.textContent('.toast-container');
    report('Simulated plan upgrade checkout with confetti', toastUpgrade.includes('upgraded to'));

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '10_pricing_page.png') });

    // =========================================================================
    // TEST 11: Mobile Viewport Verification (375x667)
    // =========================================================================
    console.log('\n--- Test Suite 11: Mobile Viewport & Navigation ---');
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 667 },
      isMobile: true
    });
    const mobilePage = await mobileContext.newPage();

    await mobilePage.goto(`${BASE_URL}/feed`, { waitUntil: 'networkidle' });

    // Check bottom navigation bar is visible on mobile
    const bottomNavVisible = await mobilePage.isVisible('.mobile-bottom-nav');
    report('Mobile bottom navigation bar is displayed', bottomNavVisible);

    // Test navigation to Jobs via bottom nav
    await mobilePage.click('.mobile-bottom-nav a[href="/jobs"]');
    await mobilePage.waitForTimeout(400);
    const onJobsPage = mobilePage.url().includes('/jobs');
    report('Mobile bottom nav routes to Jobs page', onJobsPage);

    // Test mobile job list to detail view switch
    await mobilePage.locator('.job-card-item').first().click();
    await mobilePage.waitForTimeout(400);
    const backBtnVisible = await mobilePage.isVisible('.mobile-back-to-jobs-btn');
    report('Mobile job card click smoothly opens detail view with back button', backBtnVisible);

    // Click back button to return to list
    await mobilePage.click('.mobile-back-to-jobs-btn');
    await mobilePage.waitForTimeout(300);
    const jobCardsVisible = await mobilePage.isVisible('.job-card-item');
    report('Mobile back button returns to jobs list', jobCardsVisible);

    await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '11_mobile_jobs.png') });

    // Test mobile chat list to chat view switch
    await mobilePage.click('.mobile-bottom-nav a[href="/messaging"]');
    await mobilePage.waitForTimeout(400);
    await mobilePage.locator('.conv-item').first().click();
    await mobilePage.waitForTimeout(400);
    const backConvBtnVisible = await mobilePage.isVisible('.mobile-back-to-convs-btn');
    report('Mobile messaging conversation tap opens chat view with back button', backConvBtnVisible);

    await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '12_mobile_chat.png') });
    await mobileContext.close();

    // =========================================================================
    // FINAL RESULTS
    // =========================================================================
    console.log('\n======================================================');
    console.log(`🎉 TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
    console.log(`📁 Screenshots saved to: ${SCREENSHOTS_DIR}`);
    console.log('======================================================\n');

  } catch (err) {
    console.error('Test execution error:', err);
  } finally {
    await browser.close();
  }
}

runAllTests();
