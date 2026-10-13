(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){return e.gameUrl||``}function t(e){let t=e.thumb||e.icon;return t?t.startsWith(`/`)?t:`/${t}`:`/img/${e.id}.webp`}var n={Popular:`🔥`,New:`🆕`,Action:`⚔️`,Running:`🏃`,"3D":`🎲`,Shooting:`🎯`,Multiplayer:`👥`,Racing:`🏁`,Moto:`🏍️`,Stickman:`🥊`,Adventure:`🗺️`,Puzzle:`🧩`,Animal:`🐾`,Platform:`🕹️`,Simulation:`🖥️`,Management:`🏗️`,Survival:`🌿`,Strategy:`♟️`,Board:`♜`,Girls:`💖`,"2 Player":`🤝`,Car:`🏎️`,Sports:`⚽`,Skill:`🧠`},r=[{id:`all`,emoji:`🎮`,label:`🎮 All Games`,shortLabel:`All Games`},{id:`Popular`,emoji:`🔥`,label:`🔥 Popular`,shortLabel:`Popular`},{id:`Action`,emoji:`⚔️`,label:`⚔️ Action`,shortLabel:`Action`},{id:`New`,emoji:`🆕`,label:`🆕 New`,shortLabel:`New`},{id:`Skill`,emoji:`🧠`,label:`🧠 Skill`,shortLabel:`Skill`},{id:`Running`,emoji:`🏃`,label:`🏃 Running`,shortLabel:`Running`},{id:`Adventure`,emoji:`🗺️`,label:`🗺️ Adventure`,shortLabel:`Adventure`},{id:`Platform`,emoji:`🕹️`,label:`🕹️ Platform`,shortLabel:`Platform`},{id:`Car`,emoji:`🏎️`,label:`🏎️ Car`,shortLabel:`Car`},{id:`Racing`,emoji:`🏁`,label:`🏁 Racing`,shortLabel:`Racing`},{id:`Moto`,emoji:`🏍️`,label:`🏍️ Moto`,shortLabel:`Moto`},{id:`3D`,emoji:`🎲`,label:`🎲 3D`,shortLabel:`3D`},{id:`Shooting`,emoji:`🎯`,label:`🎯 Shooting`,shortLabel:`Shooting`},{id:`Multiplayer`,emoji:`👥`,label:`👥 Multiplayer`,shortLabel:`Multiplayer`},{id:`2 Player`,emoji:`🤝`,label:`🤝 2 Player`,shortLabel:`2 Player`},{id:`Sports`,emoji:`⚽`,label:`⚽ Sports`,shortLabel:`Sports`},{id:`Puzzle`,emoji:`🧩`,label:`🧩 Puzzle`,shortLabel:`Puzzle`},{id:`Animal`,emoji:`🐾`,label:`🐾 Animal`,shortLabel:`Animal`},{id:`Stickman`,emoji:`🥊`,label:`🥊 Stickman`,shortLabel:`Stickman`},{id:`Simulation`,emoji:`🖥️`,label:`🖥️ Simulation`,shortLabel:`Simulation`},{id:`Management`,emoji:`🏗️`,label:`🏗️ Management`,shortLabel:`Management`},{id:`Survival`,emoji:`🌿`,label:`🌿 Survival`,shortLabel:`Survival`},{id:`Strategy`,emoji:`♟️`,label:`♟️ Strategy`,shortLabel:`Strategy`},{id:`Board`,emoji:`♜`,label:`♜ Board`,shortLabel:`Board`},{id:`Girls`,emoji:`💖`,label:`💖 Girls`,shortLabel:`Girls`}],i={};function a(e,t){i[e]=t}function o(e){history.pushState(null,``,e),s()}function s(){let e=new URLSearchParams(window.location.search);if(e.has(`play`)){let t=e.get(`play`).split(`-`);t[0];let n=t.slice(1).join(`-`).toLowerCase().replace(/[^a-z0-9\s-]/g,``).replace(/\s+/g,`-`).replace(/-+/g,`-`).replace(/(^-|-$)/g,``);window.location.href=`/game/${n}.html`;return}else if(e.has(`page`)){let t=e.get(`page`);i[`/page`]&&i[`/page`]({id:t})}else i[`/`]&&i[`/`]({})}function c(){window.addEventListener(`popstate`,s),s()}var l={about:{title:`About Us`,content:`
      <h2>About BitLife 77</h2>
      <p>Welcome to <strong>BitLife 77</strong> (<a href="https://bitlife-77.github.io/">https://bitlife-77.github.io/</a>), your premier high-performance web gaming portal engineered for smooth, uninterrupted, and free browser gaming.</p>
      
      <h3>Our Mission</h3>
      <p>At BitLife 77, our mission is simple: provide instant access to high-quality unblocked games without barriers. Whether you are taking a break at school, relaxing at work, or chilling at home, BitLife 77 lets you play instantly with zero installs, zero downloads, and zero subscription paywalls.</p>

      <h3>Why Play on BitLife 77?</h3>
      <ul>
        <li><strong>440+ Hand-Curated Games:</strong> From life simulators like BitLife to fast-paced action, shooting, racing, puzzle, sports, and multiplayer challenges, our library is constantly refreshed.</li>
        <li><strong>Bypass Network Restrictions:</strong> All games are built on modern HTML5 web standards and optimized to run seamlessly across school networks, Chromebooks, and work firewalls.</li>
        <li><strong>Clean, Ad-Free &amp; Privacy-Focused:</strong> We believe gaming should be clean. We do not bombard you with deceptive pop-ups, intrusive overlays, or invasive third-party trackers.</li>
        <li><strong>Full Cross-Device Compatibility:</strong> Enjoy your favorite games effortlessly on desktop browsers, laptops, tablets, and smartphones.</li>
      </ul>

      <p>Thank you for choosing BitLife 77 as your favorite browser gaming playground. Bookmark us and keep playing!</p>
    `},contact:{title:`Contact Us`,content:`
      <h2>Contact BitLife 77</h2>
      <p>Have a question, feedback, bug report, or a game request? The <strong>BitLife 77</strong> team is here to assist you.</p>

      <h3>How to Reach Us</h3>
      <ul>
        <li><strong>Official Email:</strong> <a href="mailto:admin@bitlife-77.github.io">admin@bitlife-77.github.io</a></li>
        <li><strong>Website:</strong> <a href="https://bitlife-77.github.io/">https://bitlife-77.github.io/</a></li>
        <li><strong>Response Time:</strong> We review all incoming messages and aim to reply within 24 to 48 business hours.</li>
      </ul>

      <h3>What We Can Help With</h3>
      <ul>
        <li><strong>Game Requests:</strong> Want to see a new HTML5 game unblocked on BitLife 77? Send us the title and developer details.</li>
        <li><strong>Technical &amp; Bug Reports:</strong> If you encounter a broken iframe, game loading failure, or visual glitch, please provide the game URL and device details so our developers can fix it.</li>
        <li><strong>Copyright &amp; DMCA Inquiries:</strong> If you are a copyright holder with questions regarding indexed games, please refer to our dedicated DMCA section or reach out directly to our admin team.</li>
        <li><strong>General Feedback:</strong> We love hearing ideas from our community on how to make BitLife 77 even better.</li>
      </ul>
    `},tos:{title:`Terms of Service`,content:`
      <h2>BitLife 77 Terms of Service</h2>
      <p>Welcome to <strong>BitLife 77</strong> (<a href="https://bitlife-77.github.io/">https://bitlife-77.github.io/</a>). By accessing or using this website, you agree to be bound by the following Terms of Service. Please read them carefully.</p>

      <h3>1. Acceptance of Terms</h3>
      <p>By browsing, accessing, or playing games on BitLife 77, you acknowledge that you have read, understood, and agree to adhere to these terms. If you do not agree with any part of these terms, please discontinue using the website.</p>

      <h3>2. Permitted Use</h3>
      <p>BitLife 77 is provided exclusively for personal, non-commercial, and educational entertainment purposes. You agree to use the site responsibly and in compliance with all applicable local laws and network policies.</p>

      <h3>3. Intellectual Property Rights</h3>
      <p>All featured games, characters, logos, trademarks, and associated media are the intellectual property of their respective creators, developers, and copyright holders. BitLife 77 acts solely as an indexing platform and portal linking to or embedding publicly available HTML5 web games.</p>

      <h3>4. User Conduct</h3>
      <p>You agree not to:</p>
      <ul>
        <li>Attempt to interfere with or disrupt the operation of BitLife 77 or its hosting infrastructure.</li>
        <li>Use automated scripts, bots, or scrapers to extract bulk content without prior written permission.</li>
        <li>Bypass security controls or attempt unauthorized access to website servers.</li>
      </ul>

      <h3>5. Disclaimer of Warranties</h3>
      <p>BitLife 77 is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, whether express or implied. While we strive for uninterrupted 24/7 availability, we cannot guarantee that the service will always be error-free or that third-party game hosting servers will remain perpetually online.</p>

      <h3>6. Limitation of Liability</h3>
      <p>In no event shall BitLife 77, its maintainers, or affiliates be liable for any direct, indirect, incidental, or consequential damages resulting from your use or inability to use the website or its games.</p>

      <h3>7. Changes to Terms</h3>
      <p>We reserve the right to revise or update these Terms of Service at any time. Continued use of BitLife 77 following any updates signifies your acceptance of the revised terms.</p>
    `},privacy:{title:`Privacy Policy`,content:`
      <h2>BitLife 77 Privacy Policy</h2>
      <p>At <strong>BitLife 77</strong> (<a href="https://bitlife-77.github.io/">https://bitlife-77.github.io/</a>), we believe that playing games should be fun, safe, and private. This Privacy Policy details our approach to user data and transparency.</p>

      <h3>1. Zero Personal Data Collection</h3>
      <p>We do not require account registration, passwords, credit cards, or personally identifiable information (PII) to access or play any game on BitLife 77. You can browse and play all 440+ games completely anonymously.</p>

      <h3>2. Local Storage &amp; Preferences</h3>
      <p>BitLife 77 may utilize your browser&rsquo;s client-side <code>localStorage</code> or session cookies strictly for necessary functional purposes, such as:</p>
      <ul>
        <li>Saving your game progress, levels, and high scores.</li>
        <li>Remembering your site preferences (such as Dark Mode or sidebar toggle states).</li>
        <li>Storing your recently played or favorite games list.</li>
      </ul>
      <p>This data is stored solely on your local device and is never transmitted to or stored on our servers.</p>

      <h3>3. No Intrusive Ads or Tracking Pixels</h3>
      <p>We do not use invasive third-party ad trackers, spyware, or data brokers. Your browsing habits on BitLife 77 are not harvested or sold to advertisers.</p>

      <h3>4. Third-Party Game Embeds</h3>
      <p>Games hosted on BitLife 77 run within secure HTML5 iframes. Some game developers may include their own analytics or save systems within their game code. We encourage users to review the privacy notices of individual game developers if they have specific concerns regarding in-game mechanics.</p>

      <h3>5. Children&rsquo;s Online Privacy Protection (COPPA)</h3>
      <p>BitLife 77 is family-friendly and student-oriented. We do not knowingly collect, solicit, or maintain personal information from children under the age of 13 in accordance with COPPA.</p>

      <h3>6. Privacy Inquiries</h3>
      <p>If you have any questions or concerns regarding our privacy practices, please contact us at <a href="mailto:admin@bitlife-77.github.io">admin@bitlife-77.github.io</a>.</p>
    `},dmca:{title:`DMCA Copyright`,content:`
      <h2>BitLife 77 DMCA Copyright Policy</h2>
      <p><strong>BitLife 77</strong> (<a href="https://bitlife-77.github.io/">https://bitlife-77.github.io/</a>) respects the intellectual property rights of others and adheres strictly to the provisions of the Digital Millennium Copyright Act (17 U.S.C. &sect; 512, &ldquo;DMCA&rdquo;).</p>

      <h3>Copyright Ownership</h3>
      <p>BitLife 77 operates as an indexing portal for browser-based HTML5 games. We do not claim ownership of the third-party games hosted or linked on this site; all titles, characters, and assets belong to their respective copyright holders. If you believe your copyrighted work has been displayed on BitLife 77 without authorization, we will respond promptly to valid takedown notices.</p>

      <h3>Filing a DMCA Notice</h3>
      <p>To submit a copyright infringement notification, please send a written request to our designated agent at <a href="mailto:admin@bitlife-77.github.io">admin@bitlife-77.github.io</a> containing the following information:</p>
      <ol>
        <li><strong>Identification of the Copyrighted Work:</strong> A description or link to the copyrighted work claimed to have been infringed.</li>
        <li><strong>Location of Infringing Content:</strong> The exact URL on BitLife 77 where the material is located (for example, <code>https://bitlife-77.github.io/game/example-title.html</code>).</li>
        <li><strong>Your Contact Information:</strong> Your full legal name, company or organization, physical address, telephone number, and official email address.</li>
        <li><strong>Good Faith Statement:</strong> A statement that you have a good-faith belief that the disputed use of the material is not authorized by the copyright owner, its agent, or the law.</li>
        <li><strong>Accuracy Statement:</strong> A statement made under penalty of perjury that the information in your notification is accurate and that you are the copyright owner or authorized to act on the owner&rsquo;s behalf.</li>
        <li><strong>Signature:</strong> A physical or electronic signature of the copyright owner or authorized representative.</li>
      </ol>

      <h3>Takedown Action</h3>
      <p>Upon receipt of a valid and complete DMCA notice, BitLife 77 will remove or disable access to the infringing content within <strong>24 to 48 business hours</strong>.</p>
    `}},u=[],d=`all`,f=``,p=60,m=e=>document.getElementById(e);async function h(){u=await(await fetch(`/games.json`)).json()}function g(e){return e===`all`?u.length:u.filter(t=>(Array.isArray(t.cat)?t.cat:[t.cat]).includes(e)).length}function _(){let e=f.toLowerCase().trim();return u.filter(t=>{let n=Array.isArray(t.cat)?t.cat:[t.cat],r=d===`all`||n.includes(d),i=!e||t.title.toLowerCase().includes(e);return r&&i})}function v(){return`
    <aside class="sidebar" id="sidebar" role="navigation" aria-label="Game categories">
      <div class="sidebar-section-label">Categories</div>
      ${r.map(e=>{let t=g(e.id);return t===0&&e.id!==`all`?``:`
          <button class="cat-item ${d===e.id?`active`:``}" data-cat="${e.id}" id="cat-${e.id}">
            <span class="cat-icon">${e.emoji}</span>
            <span>${e.shortLabel||e.label}</span>
            <span class="cat-count">${t}</span>
          </button>`}).join(``)}
    </aside>
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
  `}function y(){return`
    <header class="top-header" role="banner">
      <div class="header-logo-wrap">
        <button class="btn-menu" id="btn-menu" aria-label="Open categories">☰</button>
        <a href="/" class="header-logo route-link" data-route="/">BitLife<span class="gplus"> 77</span></a>
      </div>
      <div class="header-search">
        <span class="header-search-icon">🔍</span>
        <input type="search" id="search-input" placeholder="Search ${u.length}+ unblocked games..."
          autocomplete="off" value="${f}" aria-label="Search BitLife 77 unblocked games" />
        <button class="search-clear-btn" id="search-clear" style="display:${f?`flex`:`none`}" aria-label="Clear search">✕</button>
      </div>
      <div class="header-count-wrap">
        <span class="header-count">${u.length}+ Games</span>
      </div>
    </header>
  `}function b(){return`
    <footer class="site-footer">
      <div class="footer-links">
        <a href="/" class="route-link" data-route="/">Home</a>
        <a href="/?page=about" class="route-link" data-route="/?page=about">About Us</a>
        <a href="/?page=contact" class="route-link" data-route="/?page=contact">Contact</a>
        <a href="/?page=dmca" class="route-link" data-route="/?page=dmca">DMCA</a>
        <a href="/?page=tos" class="route-link" data-route="/?page=tos">Terms of Service</a>
        <a href="/?page=privacy" class="route-link" data-route="/?page=privacy">Privacy Policy</a>
        <a href="/all-games.html">All Games</a>
      </div>
      <div class="footer-copy">
        &copy; ${new Date().getFullYear()} BitLife 77. All rights reserved.
      </div>
    </footer>
  `}function x(){document.querySelectorAll(`.route-link`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),o(e.getAttribute(`data-route`)),window.scrollTo(0,0)})})}var S={Skill:`skill-based challenges that test your reflexes, timing, and precision`,Running:`endless running adventures where speed and agility are key to survival`,Adventure:`exciting adventure quests full of exploration, story, and discovery`,Platform:`classic platformer gameplay with jumping, dodging, and collecting`,Car:`thrilling car games with fast driving, parking challenges, and stunts`,Racing:`high-speed racing competitions across tracks, roads, and off-road terrain`,Moto:`adrenaline-pumping motorcycle racing and stunt games`,"3D":`3D browser games with immersive graphics and gameplay depth`,Shooting:`action-packed shooting games with weapons, enemies, and strategy`,Multiplayer:`multiplayer games you can enjoy with friends or compete globally`,Puzzle:`brain-teasing puzzle challenges that train logic and problem-solving`,Animal:`fun animal-themed games featuring pets, wildlife, and cute creatures`,Simulation:`realistic simulation experiences from city-building to life sims`,Management:`management and strategy games where you build, plan, and optimize`,Survival:`intense survival games where every decision keeps you alive`,Strategy:`deep strategy games combining planning, tactics, and decision-making`,Board:`classic board games reimagined in the browser for instant fun`,Girls:`fun and creative games designed for everyone who loves style and creativity`,"2 Player":`two-player games perfect for competing or cooperating with a friend`,Sports:`sports action games covering football, basketball, tennis, and more`,Popular:`the most-played and trending unblocked games loved by millions`,New:`the newest HTML5 games freshly added to the collection`,Stickman:`hilarious and action-packed stickman fighting and adventure games`};function C(e,t){let r=t[0]||`Action`,i=S[r]||`fun browser games you can play anywhere`;n[r];let a=t.map(e=>`<span class="game-fact-tag">${n[e]||`🎮`} ${e}</span>`).join(``);return`
  <section class="game-seo-wrap">
    <!-- About -->
    <div class="game-seo-card">
      <div class="game-seo-card-header">
        <span class="game-seo-icon">🎮</span>
        <h2>About ${e.title}</h2>
      </div>
      <p>
        <strong>${e.title}</strong> is a free unblocked ${r.toLowerCase()} game available on <strong>BitLife 77</strong>.
        It belongs to the genre of ${i}.
        Play <strong>${e.title} unblocked</strong> directly in your browser &mdash; no downloads,
        no installations, and no registrations required.
      </p>
      <p>
        Whether you&rsquo;re at school, at work, or at home, <strong>BitLife 77</strong> lets you
        enjoy <strong>${e.title}</strong> instantly on any device. This HTML5 game runs smoothly
        on desktop, tablet, and mobile browsers.
      </p>
      <div class="game-facts-row">
        <div class="game-fact-item">
          <span class="game-fact-label">🏷️ Genre</span>
          <div class="game-fact-tags">${a}</div>
        </div>
        <div class="game-fact-item">
          <span class="game-fact-label">🖥️ Platform</span>
          <div class="game-fact-tags"><span class="game-fact-tag">🌐 Browser (HTML5)</span><span class="game-fact-tag">📱 Mobile</span></div>
        </div>
        <div class="game-fact-item">
          <span class="game-fact-label">💰 Price</span>
          <div class="game-fact-tags"><span class="game-fact-tag free-tag">✓ 100% Free</span></div>
        </div>
        <div class="game-fact-item">
          <span class="game-fact-label">🔓 Access</span>
          <div class="game-fact-tags"><span class="game-fact-tag">⚡ No Login</span><span class="game-fact-tag">⚡ No Download</span></div>
        </div>
      </div>
    </div>

    <!-- How to Play -->
    <div class="game-seo-card">
      <div class="game-seo-card-header">
        <span class="game-seo-icon">📚</span>
        <h2>How to Play ${e.title}</h2>
      </div>
      <p>
        Getting started with <strong>${e.title}</strong> is easy &mdash; just click the game above
        and it will load instantly in your browser. Use your keyboard, mouse, or touch controls
        to interact with the game.
      </p>
      <div class="howto-steps">
        <div class="howto-step">
          <span class="howto-num">1</span>
          <div><strong>Open the Game</strong><br>Click the play area above. The game loads automatically &mdash; no download needed.</div>
        </div>
        <div class="howto-step">
          <span class="howto-num">2</span>
          <div><strong>Learn the Controls</strong><br>Use <kbd>Arrow Keys</kbd> or <kbd>WASD</kbd> to move. Use your mouse or touch screen on mobile.</div>
        </div>
        <div class="howto-step">
          <span class="howto-num">3</span>
          <div><strong>Play &amp; Win</strong><br>Follow in-game instructions to master <strong>${e.title}</strong> and beat your high score!</div>
        </div>
        <div class="howto-step">
          <span class="howto-num">4</span>
          <div><strong>Go Fullscreen</strong><br>Click the <em>Fullscreen</em> button for the best experience on any screen size.</div>
        </div>
      </div>
    </div>

    <!-- FAQ -->
    <div class="game-seo-card">
      <div class="game-seo-card-header">
        <span class="game-seo-icon">❓</span>
        <h2>Frequently Asked Questions</h2>
      </div>
      <div class="faq-list">
        <details class="faq-item">
          <summary>Is ${e.title} free to play?</summary>
          <p>Yes! <strong>${e.title}</strong> is completely free to play on BitLife 77. No subscription, no payment, no account required.</p>
        </details>
        <details class="faq-item">
          <summary>Can I play ${e.title} at school?</summary>
          <p>Yes. BitLife 77 is designed to work on school and work networks. <strong>${e.title} unblocked</strong> runs directly in your browser without needing any special software.</p>
        </details>
        <details class="faq-item">
          <summary>Does ${e.title} work on mobile?</summary>
          <p>Absolutely. <strong>${e.title}</strong> is an HTML5 game that works on smartphones and tablets, as well as desktop computers, with no app installation needed.</p>
        </details>
        <details class="faq-item">
          <summary>What category is ${e.title}?</summary>
          <p><strong>${e.title}</strong> is categorized as a <strong>${t.join(` / `)}</strong> game. Browse more ${r} unblocked games on BitLife 77 using the category sidebar.</p>
        </details>
      </div>
    </div>
  </section>`}function w(){return`
  <section class="home-seo-wrap" aria-label="About BitLife 77">
    <div class="home-seo-header">
      <div class="home-seo-badge">🎮 BitLife 77</div>
      <h2 class="home-seo-title">The Best Free Unblocked Games Online</h2>
      <p class="home-seo-sub">Play 440+ HTML5 games instantly &mdash; no download, no login, no barriers.</p>
    </div>

    <div class="home-seo-features">
      <div class="seo-feat">
        <div class="seo-feat-icon">⚡</div>
        <div>
          <strong>Instant Play</strong>
          <p>Click any game and start playing immediately in your browser. Zero waiting, zero setup.</p>
        </div>
      </div>
      <div class="seo-feat">
        <div class="seo-feat-icon">🔓</div>
        <div>
          <strong>Always Unblocked</strong>
          <p>Works on school chromebooks, work computers, and restricted networks &mdash; guaranteed.</p>
        </div>
      </div>
      <div class="seo-feat">
        <div class="seo-feat-icon">🎮</div>
        <div>
          <strong>440+ Games</strong>
          <p>Action, racing, puzzle, shooting, multiplayer, sports, and more. Top games like BitLife ready to play.</p>
        </div>
      </div>
      <div class="seo-feat">
        <div class="seo-feat-icon">📱</div>
        <div>
          <strong>All Devices</strong>
          <p>Play on desktop, tablet, or mobile. Fully responsive HTML5 games that fit any screen.</p>
        </div>
      </div>
      <div class="seo-feat">
        <div class="seo-feat-icon">👥</div>
        <div>
          <strong>Multiplayer</strong>
          <p>Challenge a friend with 2-player games or compete in online multiplayer titles.</p>
        </div>
      </div>
      <div class="seo-feat">
        <div class="seo-feat-icon">💰</div>
        <div>
          <strong>100% Free</strong>
          <p>No subscriptions, no hidden costs. BitLife 77 is and always will be completely free.</p>
        </div>
      </div>
    </div>

      <div class="home-seo-categories">
        <h3>Popular Categories</h3>
        <div class="home-cat-chips">
          ${r.filter(e=>e.id!==`all`).slice(0,12).map(e=>{let t=g(e.id);return`<a href="/?search=${e.id}" class="home-cat-chip route-link" data-route="/?search=${e.id}" data-cat="${e.id}" id="seo-cat-${e.id}">
              <span class="cat-icon">${e.emoji}</span> ${e.label} <small>(${t})</small>
            </a>`}).join(``)}
        </div>
      </div>

    <div class="home-seo-faq">
      <h3>Frequently Asked Questions</h3>
      <div class="faq-list">
        <details class="faq-item" open>
          <summary>What is BitLife 77?</summary>
          <p><strong>BitLife 77</strong> is a free HTML5 browser gaming platform that can be played anywhere &mdash; including on school or work networks that typically block gaming sites. Our platform hosts 440+ games across all genres, all playable instantly with no download or login required.</p>
        </details>
        <details class="faq-item">
          <summary>Are these games safe to play at school?</summary>
          <p>Yes. All games on BitLife 77 are HTML5-based and run directly in your browser. They do not require any plugins, executables, or external software, making them safe and accessible on most school and corporate networks.</p>
        </details>
        <details class="faq-item">
          <summary>Do I need to create an account?</summary>
          <p>No account, no sign-up, no email &mdash; nothing. Just click a game and play instantly. BitLife 77 is completely open and free for everyone.</p>
        </details>
        <details class="faq-item">
          <summary>What devices support BitLife 77?</summary>
          <p>All games are built with HTML5 and work on Windows, Mac, Linux, Chromebook, iOS, and Android. Whether you use a phone, tablet, or desktop, the games are fully playable.</p>
        </details>
      </div>
    </div>
  </section>`}function T(){document.title=`Play 440+ Free Unblocked Games Online | BitLife`;let e=m(`app`);e.innerHTML=`
    ${y()}
    <div class="layout">
      ${v()}
      <div class="main-content">
        <div class="section-header">
          <h1 class="section-title" id="section-title">
            ${d===`all`?`🔥 All Games`:r.find(e=>e.id===d)?.label||d}
            <span class="count" id="game-count"></span>
          </h1>
        </div>
        <div class="games-grid" id="games-grid"></div>
        <div class="load-more-wrap" id="load-more-wrap" style="display:none">
          <button class="btn-load-more" id="btn-load-more">Load More Games</button>
        </div>

        ${w()}
        ${b()}
      </div>
    </div>
  `,document.querySelectorAll(`.home-cat-chip`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),d=e.dataset.cat,p=60,T(),window.scrollTo({top:0,behavior:`smooth`})})}),O(),x(),D()}function E(e){return e.toLowerCase().replace(/[^a-z0-9\s-]/g,``).replace(/\s+/g,`-`).replace(/-+/g,`-`).replace(/(^-|-$)/g,``)}function D(){let e=_(),i=m(`games-grid`),a=m(`game-count`),o=m(`load-more-wrap`),s=m(`section-title`);if(a&&(a.textContent=`(${e.length})`),s&&f)s.innerHTML=`🔍 Results for "<em>${f}</em>" <span class="count">(${e.length})</span>`;else if(s){let t=r.find(e=>e.id===d);s.innerHTML=`${d===`all`?`🔥 All Games`:t?.label||d} <span class="count">(${e.length})</span>`}if(e.length===0){i.innerHTML=`
      <div class="empty-state">
        <div class="empty-icon">🎮</div>
        <h3>No games found</h3>
        <p>Try a different search or category.</p>
        <button class="btn-primary" id="btn-clear-search">Clear Search</button>
      </div>`,o&&(o.style.display=`none`),m(`btn-clear-search`)?.addEventListener(`click`,()=>{f=``,m(`search-input`).value=``,m(`search-clear`).style.display=`none`,D()});return}i.innerHTML=e.slice(0,p).map((e,r)=>{let i=(Array.isArray(e.cat)?e.cat:[e.cat])[0]||``,a=n[i]||`🎮`,o=E(e.title);return`
      <a class="game-card game-card-link" href="/game/${o}.html" data-id="${e.id}" data-slug="${o}" style="animation-delay:${Math.min(r,30)*20}ms" aria-label="Play ${e.title}">
        <div class="card-thumb">
          <img
            src="${t(e)}"
            alt="${e.title}"
            loading="lazy"
            decoding="async"
            onerror="this.onerror=null;this.src='https://placehold.co/300x188/0d0a26/8b5cf6?text=${encodeURIComponent(e.title.slice(0,20))}'"
          />
          <div class="card-overlay">
            <button class="btn-play" tabindex="-1">▶ Play</button>
          </div>
        </div>
        <div class="card-info">
          <div class="card-title">${e.title}</div>
          <div class="card-cat-tag">${a} ${i}</div>
        </div>
      </a>`}).join(``),o&&(o.style.display=e.length>p?`flex`:`none`)}function O(){m(`search-input`)?.addEventListener(`input`,e=>{f=e.target.value,m(`search-clear`).style.display=f?`flex`:`none`,p=60,D()}),m(`search-clear`)?.addEventListener(`click`,()=>{f=``,m(`search-input`).value=``,m(`search-clear`).style.display=`none`,D()}),document.querySelector(`.sidebar`)?.addEventListener(`click`,e=>{let t=e.target.closest(`.cat-item`);t&&(d=t.dataset.cat,p=60,document.querySelectorAll(`.cat-item`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`),D(),m(`sidebar`)?.classList.remove(`open`),m(`sidebar-overlay`)?.classList.remove(`open`),window.scrollTo({top:0,behavior:`smooth`}))}),m(`btn-load-more`)?.addEventListener(`click`,()=>{p+=60,D()}),m(`btn-menu`)?.addEventListener(`click`,()=>{m(`sidebar`)?.classList.toggle(`open`),m(`sidebar-overlay`)?.classList.toggle(`open`)}),m(`sidebar-overlay`)?.addEventListener(`click`,()=>{m(`sidebar`)?.classList.remove(`open`),m(`sidebar-overlay`)?.classList.remove(`open`)})}function k({id:r}){let i=u.find(e=>e.id===r);if(!i){o(`/`);return}let a=e(i),s=Array.isArray(i.cat)?i.cat:[i.cat],c=s[0];document.title=`Play ${i.title} Unblocked | BitLife 77`;let l=document.querySelector(`meta[name="description"]`);l||(l=document.createElement(`meta`),l.name=`description`,document.head.appendChild(l)),l.content=`Play ${i.title} unblocked free online on BitLife 77. No download, no login. Free ${c} HTML5 game — works at school, work, or home on any device.`;let f=u.filter(e=>e.id!==i.id&&(Array.isArray(e.cat)?e.cat.includes(c):e.cat===c)).slice(0,12);m(`app`).innerHTML=`
    ${y()}
    <div class="layout">
      ${v()}
      <div class="main-content">
        <div class="play-page">
          <div class="play-header">
            <button class="btn-back" id="btn-back">← Back</button>
            <div class="play-info">
              <h1 class="play-game-title">Play ${i.title} Unblocked</h1>
              <div class="play-cats">
                ${s.map(e=>`<span class="play-cat-tag">${n[e]||`🎮`} ${e}</span>`).join(``)}
              </div>
            </div>
            <button class="btn-fullscreen" id="btn-fullscreen">⛶ Fullscreen</button>
          </div>
          <div class="game-container" id="game-container">
            <div class="game-loading" id="game-loading">
              <div class="spinner" style="width:48px;height:48px;border-width:4px;"></div>
              <p>Loading <strong>${i.title}</strong>...</p>
            </div>
            <iframe id="game-frame" src="${a}"
              title="Play ${i.title} Unblocked"
              allowfullscreen frameborder="0"
              allow="fullscreen; autoplay; encrypted-media; gamepad"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock allow-top-navigation allow-modals"
            ></iframe>
          </div>
          ${C(i,s)}
          ${f.length?`
          <div class="related-section">
            <div class="related-section-header">
              <h2 class="section-title">🎮 More ${c} Unblocked Games</h2>
            </div>
            <div class="related-grid" id="related-grid">
              ${f.map(e=>`
                <a class="game-card game-card-link mini" href="/game/${E(e.title)}.html" data-id="${e.id}" data-slug="${E(e.title)}" aria-label="Play ${e.title} unblocked">
                  <div class="card-thumb">
                    <img src="${t(e)}" alt="${e.title} unblocked" loading="lazy" decoding="async"
                      onerror="this.onerror=null;this.src='https://placehold.co/300x188/0d0a26/8b5cf6?text=${encodeURIComponent(e.title.slice(0,20))}'" />
                    <div class="card-overlay"><button class="btn-play" tabindex="-1">▶ Play</button></div>
                  </div>
                  <div class="card-info"><div class="card-title">${e.title}</div></div>
                </a>`).join(``)}
            </div>
          </div>`:``}
        </div>
      </div>
    </div>
  `,m(`game-frame`)?.addEventListener(`load`,()=>{m(`game-loading`).style.display=`none`}),m(`btn-back`)?.addEventListener(`click`,()=>{o(`/`)}),m(`btn-fullscreen`)?.addEventListener(`click`,()=>{let e=m(`game-container`);document.fullscreenElement?document.exitFullscreen():e?.requestFullscreen()}),m(`btn-menu`)?.addEventListener(`click`,()=>{m(`sidebar`)?.classList.toggle(`open`),m(`sidebar-overlay`)?.classList.toggle(`open`)}),m(`sidebar-overlay`)?.addEventListener(`click`,()=>{m(`sidebar`)?.classList.remove(`open`),m(`sidebar-overlay`)?.classList.remove(`open`)}),document.querySelector(`.sidebar`)?.addEventListener(`click`,e=>{let t=e.target.closest(`.cat-item`);t&&(d=t.dataset.cat,p=60,o(`/`))}),x()}function A({id:e}){let t=l[e];if(!t){o(`/`);return}document.title=`${t.title} | BitLife 77`;let n=document.querySelector(`meta[name="description"]`);n&&(n.content=`Read our ${t.title} on BitLife 77 (https://bitlife-77.github.io/).`),m(`app`).innerHTML=`
    ${y()}
    <div class="layout">
      ${v()}
      <div class="main-content">
        <div class="static-page-container">
          <div class="static-card">
            ${t.content}
          </div>
        </div>
        ${b()}
      </div>
    </div>
  `,O(),x()}a(`/`,()=>T()),a(`/play`,({id:e})=>k({id:e})),a(`/page`,({id:e})=>A({id:e})),document.addEventListener(`DOMContentLoaded`,async()=>{m(`app`).innerHTML=`
    <div style="display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;gap:16px;background:#08051a;">
      <div class="spinner" style="width:48px;height:48px;border-width:4px;"></div>
      <p style="color:#9ca3af;font-family:Inter,sans-serif;font-size:0.95rem;">Loading BitLife 77...</p>
    </div>`,await h(),c()});