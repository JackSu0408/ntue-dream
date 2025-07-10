class HeaderComponent extends HTMLElement {
    connectedCallback() {
        // 檢查新的登入狀態格式
        const isLoggedInNew = localStorage.getItem('userLoggedIn') === 'true';
        const userInfoNew = localStorage.getItem('userInfo');
        
        // 檢查舊的登入狀態格式（向下相容）
        const savedUser = localStorage.getItem('ntueDreamUser');
        
        let isLoggedIn = false;
        let userData = null;
        
        if (isLoggedInNew && userInfoNew) {
            // 使用新格式
            isLoggedIn = true;
            userData = JSON.parse(userInfoNew);
        } else if (savedUser) {
            // 使用舊格式並轉換為新格式
            isLoggedIn = true;
            userData = JSON.parse(savedUser);
            // 轉換為新格式
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userInfo', JSON.stringify(userData));
        }

        this.innerHTML = `
      <style>
        .header {
          width: 100%;
          height: 10.4vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 3%;
          background-color: #f5f5dc;
          box-sizing: border-box;
          position: relative;
          z-index: 1000;
        }
        .logo-section {
          display: flex;
          align-items: center;
          gap: 1vw;
        }
        .logo-icon {
          width: 2.6vw;
          height: 2.6vw;
        }
        .logo-text {
          text-decoration: none;
        }
        .logo-text .main-title {
          font-size: 1.6vw;
          color: #333;
          font-weight: bold;
        }
        .logo-text .subtitle {
          font-size: 0.8vw;
          color: #666;
        }
        .nav-menu {
          display: flex;
          gap: 2vw;
        }
        .nav-menu a {
          color: #333;
          text-decoration: none;
          font-size: 1.1vw;
          font-weight: bold;
          transition: color 0.3s ease;
        }
        .nav-menu a:hover {
          color: rgb(255, 174, 0);
        }
        .user-section {
          display: flex;
          align-items: center;
          gap: 1vw;
          position: relative;
        }
        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          font-size: 0.9vw;
        }
        .user-name {
          color: #333;
          font-weight: bold;
          margin: 0;
        }
        .user-type {
          color: #666;
          font-size: 0.7vw;
          margin: 0;
        }
        .profile-icon {
          cursor: pointer;
          position: relative;
        }
        .profile-icon img {
          width: 3vw;
          height: 3vw;
          border-radius: 50%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .profile-icon:hover img {
          transform: scale(1.1);
        }
        
        /* 未登入狀態的頭像樣式 */
        .guest-profile-icon {
          cursor: pointer;
          position: relative;
        }
        .guest-profile-icon img {
          width: 3vw;
          height: 3vw;
          border-radius: 50%;
          object-fit: cover;
          opacity: 0.7;
          transition: all 0.3s ease;
          border: 2px solid #ddd;
        }
        .guest-profile-icon:hover img {
          transform: scale(1.1);
        }
        
        .user-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background-color: white;
          border: 1px solid #ddd;
          border-radius: 0.5vw;
          min-width: 8vw;
          display: none;
          z-index: 1000;
        }
        .user-dropdown.show {
          display: block;
        }
        .dropdown-item {
          padding: 0.8vw 1.2vw;
          cursor: pointer;
          font-size: 0.9vw;
          color: #333;
          transition: background-color 0.3s ease;
          border-bottom: 1px solid #eee;
        }
        .dropdown-item:last-child {
          border-bottom: none;
        }
        .dropdown-item:hover {
          background-color: #f5f5f5;
        }

        /* 漢堡選單樣式 */
        .hamburger-menu {
          display: none;
          flex-direction: column;
          cursor: pointer;
          padding: 5px;
          z-index: 1001;
        }
        
        .hamburger-line {
          width: 25px;
          height: 3px;
          background-color: #333;
          margin: 3px 0;
          transition: all 0.3s ease;
          border-radius: 2px;
        }
        
        /* 漢堡選單變成叉叉的動畫 */
        .hamburger-menu.active .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(7px, 7px);
        }
        
        .hamburger-menu.active .hamburger-line:nth-child(2) {
          opacity: 0;
          transform: scale(0);
        }
        
        .hamburger-menu.active .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(5.5px, -5.5px);
        }

        /* 移動端選單下拉覆蓋層 */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 70px;
          right: 0;
          width: 280px;
          max-width: 90vw;
          background-color: #ffffff;
          border: 1px solid #ddd;
          border-radius: 0 0 8px 8px;
          flex-direction: column;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          z-index: 999;
        }

        .mobile-menu.active {
          display: flex;
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-menu-content {
          display: flex;
          flex-direction: column;
          padding: 0;
        }

        /* 移動端用戶資訊 */
        .mobile-user-section {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px 20px;
          border-bottom: 1px solid #eee;
          background-color: #f8f9fa;
        }

        .mobile-profile-icon img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ffb84d;
        }

        .mobile-user-info {
          flex: 1;
        }

        .mobile-user-name {
          font-size: 14px;
          font-weight: bold;
          color: #333;
          margin: 0 0 2px 0;
        }

        .mobile-user-type {
          font-size: 12px;
          color: #666;
          margin: 0;
        }

        /* 移動端導航選單 */
        .mobile-nav-menu {
          display: flex;
          flex-direction: column;
        }

        .mobile-nav-menu a {
          color: #333;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          padding: 12px 20px;
          transition: all 0.3s ease;
          border-bottom: 1px solid #eee;
        }

        .mobile-nav-menu a:last-child {
          border-bottom: none;
        }

        .mobile-nav-menu a:hover {
          background-color: #f8f9fa;
          color: #ffb84d;
        }

        /* 移動端用戶操作選單 */
        .mobile-user-actions {
          display: flex;
          flex-direction: column;
          padding: 15px 20px;
          gap: 8px;
          background-color: #f8f9fa;
        }

        .mobile-action-btn {
          background: none;
          border: 1px solid #ffb84d;
          color: #ffb84d;
          padding: 8px 16px;
          border-radius: 15px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
          text-align: center;
        }

        .mobile-action-btn:hover {
          background-color: #ffb84d;
          color: white;
        }

        .mobile-action-btn.logout {
          border-color: #dc3545;
          color: #dc3545;
        }

        .mobile-action-btn.logout:hover {
          background-color: #dc3545;
          color: white;
        }
        
        /* 響應式設計 */
        @media (min-width: 1025px) {
          .mobile-menu {
            display: none !important;
          }
          .hamburger-menu {
            display: none !important;
          }
        }

        @media (min-width: 1400px) {
          .header {
            height: 80px;
            padding: 0 60px;
          }
          .logo-icon {
            width: 35px;
            height: 35px;
          }
          .logo-text .main-title {
            font-size: 22px;
          }
          .logo-text .subtitle {
            font-size: 12px;
          }
          .nav-menu {
            gap: 30px;
          }
          .nav-menu a {
            font-size: 16px;
          }
          .user-info {
            font-size: 13px;
          }
          .user-type {
            font-size: 10px;
          }
          .profile-icon img,
          .guest-profile-icon img {
            width: 40px;
            height: 40px;
          }
          .user-dropdown {
            border-radius: 8px;
            min-width: 120px;
          }
          .dropdown-item {
            padding: 12px 16px;
            font-size: 14px;
          }
        }
        
        @media (max-width: 1024px) and (min-width: 769px) {
          .header {
            height: 12vw;
            padding: 0 4%;
          }
          .logo-icon {
            width: 3.5vw;
            height: 3.5vw;
          }
          .logo-text .main-title {
            font-size: 2.2vw;
          }
          .logo-text .subtitle {
            font-size: 1.1vw;
          }
          .nav-menu {
            gap: 3vw;
          }
          .nav-menu a {
            font-size: 1.6vw;
          }
          .user-info {
            font-size: 1.3vw;
          }
          .user-type {
            font-size: 1vw;
          }
          .profile-icon img,
          .guest-profile-icon img {
            width: 4vw;
            height: 4vw;
          }
          
          /* 平板版選單定位 */
          .mobile-menu {
            width: 320px;
            max-width: 85vw;
            right: 4%;
          }
        }
        
        @media (max-width: 768px) {
          .header {
            height: 70px;
            padding: 0 20px;
          }
          .logo-section {
            gap: 10px;
          }
          .logo-icon {
            width: 30px;
            height: 30px;
          }
          .logo-text .main-title {
            font-size: 18px;
          }
          .logo-text .subtitle {
            font-size: 10px;
          }
          .nav-menu {
            display: none;
          }
          .user-section {
            display: none;
          }
          .hamburger-menu {
            display: flex;
          }
          
          /* 手機版選單定位 */
          .mobile-menu {
            width: 260px;
            max-width: 85vw;
            right: 20px;
          }
        }

        @media (max-width: 480px) {
          .mobile-menu {
            width: 240px;
            max-width: 80vw;
            right: 20px;
          }
        }
        
        @media (max-width: 1024px) and (min-width: 769px) {
          .header {
            height: 12vw;
            padding: 0 4%;
          }
          .logo-icon {
            width: 3.5vw;
            height: 3.5vw;
          }
          .logo-text .main-title {
            font-size: 2.2vw;
          }
          .logo-text .subtitle {
            font-size: 1.1vw;
          }
          .nav-menu {
            gap: 3vw;
          }
          .nav-menu a {
            font-size: 1.6vw;
          }
          .user-info {
            font-size: 1.3vw;
          }
          .user-type {
            font-size: 1vw;
          }
          .profile-icon img,
          .guest-profile-icon img {
            width: 4vw;
            height: 4vw;
          }
          
          /* 平板版選單定位 */
          .mobile-menu {
            width: 320px;
            max-width: 85vw;
            right: 4%;
          }
        }
        
        @media (max-width: 768px) {
          .header {
            height: 70px;
            padding: 0 20px;
          }
          .logo-section {
            gap: 10px;
          }
          .logo-icon {
            width: 30px;
            height: 30px;
          }
          .logo-text .main-title {
            font-size: 18px;
          }
          .logo-text .subtitle {
            font-size: 10px;
          }
          .nav-menu {
            display: none;
          }
          .user-section {
            display: none;
          }
          .hamburger-menu {
            display: flex;
          }
          .profile-icon img,
          .guest-profile-icon img {
            width: 40px;
            height: 40px;
          }
          .user-dropdown {
            border-radius: 8px;
            min-width: 120px;
          }
          .dropdown-item {
            padding: 12px 16px;
            font-size: 14px;
          }
          
          /* 手機版選單定位 */
          .mobile-menu {
            width: 260px;
            max-width: 85vw;
            right: 20px;
          }
        }
      </style>
      
      <div class="header">
        <div class="logo-section">
          <img src="img/ntueDream-logo.png" alt="Logo" class="logo-icon" />
          <a href="index.html" class="logo-text">
            <div class="main-title">芝山圓夢媒合站</div>
            <div class="subtitle">提案媒合平台</div>
          </a>
        </div>
        <nav class="nav-menu">
          <a href="index.html">首頁</a>
          <a href="proposal.html">夢想聚合</a>
          <a href="overview.html">提案總覽</a>
          <a href="questions.html">常見問題</a>
          <a href="#" onclick="scrollToFooter(); return false;">聯絡我們</a>
        </nav>
        <div class="user-section">
          ${isLoggedIn ? `
            <div class="user-info">
              <p class="user-name">${userData.name}</p>
              <p class="user-type">會員</p>
            </div>
            <div class="profile-icon" onclick="toggleUserDropdown()">
              <img src="img/user.png" alt="User" />
              <div class="user-dropdown" id="userDropdown">
                <!-- 暫時移除個人資料選項 -->
                <!--<div class="dropdown-item" onclick="viewProfile()">個人資料</div>-->
                <div class="dropdown-item" onclick="viewMyProposals()">我的提案</div>
                <div class="dropdown-item" onclick="logoutUser()">登出</div>
              </div>
            </div>
          ` : `
            <div class="guest-profile-icon" onclick="toggleGuestDropdown()">
              <img src="img/user.png" alt="Guest User" />
              <div class="user-dropdown" id="guestDropdown">
                <div class="dropdown-item" onclick="goToLogin()">登入</div>
              </div>
            </div>
          `}
        </div>
        
        <!-- 漢堡選單按鈕 -->
        <div class="hamburger-menu" onclick="toggleMobileMenu()">
          <div class="hamburger-line"></div>
          <div class="hamburger-line"></div>
          <div class="hamburger-line"></div>
        </div>
      </div>

      <!-- 移動端選單下拉區域 -->
      <div class="mobile-menu" id="mobileMenu">
        <div class="mobile-menu-content">
          <!-- 用戶資訊區域 -->
          ${isLoggedIn ? `
            <div class="mobile-user-section">
              <div class="mobile-profile-icon">
                <img src="img/user.png" alt="User" />
              </div>
              <div class="mobile-user-info">
                <p class="mobile-user-name">${userData.name}</p>
                <p class="mobile-user-type">會員</p>
              </div>
            </div>
          ` : `
            <div class="mobile-user-section">
              <div class="mobile-profile-icon">
                <img src="img/user.png" alt="Guest User" style="opacity: 0.7; border-color: #ddd;" />
              </div>
              <div class="mobile-user-info">
                <p class="mobile-user-name">訪客</p>
                <p class="mobile-user-type">未登入</p>
              </div>
            </div>
          `}

          <!-- 導航選單 -->
          <nav class="mobile-nav-menu">
            <a href="index.html" onclick="closeMobileMenu()">首頁</a>
            <a href="proposal.html" onclick="closeMobileMenu()">夢想聚合</a>
            <a href="overview.html" onclick="closeMobileMenu()">提案總覽</a>
            <a href="questions.html" onclick="closeMobileMenu()">常見問題</a>
            <a href="#" onclick="scrollToFooterMobile(); return false;">聯絡我們</a>
          </nav>

          <!-- 用戶操作選單 -->
          <div class="mobile-user-actions">
            ${isLoggedIn ? `
              <!-- 暫時移除個人資料選項 -->
              <!--<button class="mobile-action-btn" onclick="viewProfile()">個人資料</button>-->
              <button class="mobile-action-btn" onclick="viewMyProposals()">我的提案</button>
              <button class="mobile-action-btn logout" onclick="logoutUser()">登出</button>
            ` : `
              <button class="mobile-action-btn" onclick="goToLogin()">登入</button>
            `}
          </div>
        </div>
      </div>
    `;

        // 添加滾動到 footer 的函數
        window.scrollToFooter = function() {
            const footer = document.querySelector('footer-component');
            if (footer) {
                footer.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        };

        // 移動端滾動到 footer
        window.scrollToFooterMobile = function() {
            closeMobileMenu();
            setTimeout(() => {
                scrollToFooter();
            }, 100);
        };

        // 漢堡選單功能
        window.toggleMobileMenu = function() {
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburger = document.querySelector('.hamburger-menu');
            
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // 下拉選單不需要鎖定背景滾動
        };

        window.closeMobileMenu = function() {
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburger = document.querySelector('.hamburger-menu');
            
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        };

        // 已登入用戶下拉選單功能
        window.toggleUserDropdown = function() {
            const dropdown = document.getElementById('userDropdown');
            dropdown.classList.toggle('show');
            
            // 關閉訪客下拉選單（如果存在）
            const guestDropdown = document.getElementById('guestDropdown');
            if (guestDropdown) {
                guestDropdown.classList.remove('show');
            }
        };

        // 未登入用戶下拉選單功能
        window.toggleGuestDropdown = function() {
            const dropdown = document.getElementById('guestDropdown');
            dropdown.classList.toggle('show');
            
            // 關閉已登入用戶下拉選單（如果存在）
            const userDropdown = document.getElementById('userDropdown');
            if (userDropdown) {
                userDropdown.classList.remove('show');
            }
        };

        // 點擊其他地方關閉下拉選單
        document.addEventListener('click', function(event) {
            const userDropdown = document.getElementById('userDropdown');
            const guestDropdown = document.getElementById('guestDropdown');
            const mobileMenu = document.getElementById('mobileMenu');
            const profileIcon = document.querySelector('.profile-icon');
            const guestProfileIcon = document.querySelector('.guest-profile-icon');
            const hamburgerMenu = document.querySelector('.hamburger-menu');
            
            // 檢查是否點擊在頭像或下拉選單之外
            const clickedOutside = (
                (!profileIcon || !profileIcon.contains(event.target)) &&
                (!guestProfileIcon || !guestProfileIcon.contains(event.target)) &&
                (!hamburgerMenu || !hamburgerMenu.contains(event.target)) &&
                (!mobileMenu || !mobileMenu.contains(event.target))
            );
            
            if (clickedOutside) {
                if (userDropdown) userDropdown.classList.remove('show');
                if (guestDropdown) guestDropdown.classList.remove('show');
                closeMobileMenu();
            }
        });

        // 已登入用戶功能函數
        window.viewProfile = function() {
            alert('個人資料功能開發中...');
            const userDropdown = document.getElementById('userDropdown');
            if (userDropdown) userDropdown.classList.remove('show');
            closeMobileMenu();
        };

        window.viewMyProposals = function() {
            const userDropdown = document.getElementById('userDropdown');
            if (userDropdown) userDropdown.classList.remove('show');
            closeMobileMenu();
            window.location.href = 'my-proposals.html';
        };

        window.logoutUser = function() {
            if (confirm('確定要登出嗎？')) {
                // 清除所有登入相關的資料
                localStorage.removeItem('userLoggedIn');
                localStorage.removeItem('userInfo');
                localStorage.removeItem('ntueDreamUser');
                localStorage.removeItem('ntueDreamUserExpire');
                localStorage.removeItem('redirectAfterLogin');
                closeMobileMenu();
                window.location.reload();
            }
        };

        // 未登入用戶功能函數
        window.goToLogin = function() {
            closeMobileMenu();
            window.location.href = 'login.html';
        };

        // ESC 鍵關閉選單
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeMobileMenu();
                const userDropdown = document.getElementById('userDropdown');
                const guestDropdown = document.getElementById('guestDropdown');
                if (userDropdown) userDropdown.classList.remove('show');
                if (guestDropdown) guestDropdown.classList.remove('show');
            }
        });
    }
}

customElements.define('header-component', HeaderComponent);