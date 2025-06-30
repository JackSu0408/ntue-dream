class HeaderComponent extends HTMLElement {
    connectedCallback() {
        // 檢查登入狀態
        const savedUser = localStorage.getItem('ntueDreamUser');
        const isLoggedIn = savedUser !== null;
        const userData = isLoggedIn ? JSON.parse(savedUser) : null;

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
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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
        
        /* 響應式設計 */
        @media (min-width: 1400px) {
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
            padding: 12px 15px;
            font-size: 14px;
          }
        }
        
        @media (max-width: 1024px) and (min-width: 769px) {
          .profile-icon img,
          .guest-profile-icon img {
            width: 4vw;
            height: 4vw;
          }
          .user-dropdown {
            border-radius: 1vw;
            min-width: 12vw;
          }
          .dropdown-item {
            padding: 1.5vw 2vw;
            font-size: 1.4vw;
          }
        }
        
        @media (max-width: 768px) {
          .profile-icon img,
          .guest-profile-icon img {
            width: 40px;
            height: 40px;
          }
          .user-dropdown {
            border-radius: 12px;
            min-width: 140px;
          }
          .dropdown-item {
            padding: 15px 20px;
            font-size: 16px;
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
          <a href="#">常見問題</a>
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
                <div class="dropdown-item" onclick="viewProfile()">個人資料</div>
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
            const profileIcon = document.querySelector('.profile-icon');
            const guestProfileIcon = document.querySelector('.guest-profile-icon');
            
            // 檢查是否點擊在頭像或下拉選單之外
            const clickedOutside = (
                (!profileIcon || !profileIcon.contains(event.target)) &&
                (!guestProfileIcon || !guestProfileIcon.contains(event.target))
            );
            
            if (clickedOutside) {
                if (userDropdown) userDropdown.classList.remove('show');
                if (guestDropdown) guestDropdown.classList.remove('show');
            }
        });

        // 已登入用戶功能函數
        window.viewProfile = function() {
            alert('個人資料功能開發中...');
            document.getElementById('userDropdown').classList.remove('show');
        };

        window.viewMyProposals = function() {
            alert('我的提案功能開發中...');
            document.getElementById('userDropdown').classList.remove('show');
        };

        window.logoutUser = function() {
            if (confirm('確定要登出嗎？')) {
                localStorage.removeItem('ntueDreamUser');
                localStorage.removeItem('ntueDreamUserExpire');
                window.location.reload();
            }
        };

        // 未登入用戶功能函數
        window.goToLogin = function() {
            window.location.href = 'login.html';
        };
    }
}

customElements.define('header-component', HeaderComponent);