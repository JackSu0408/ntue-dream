class HeaderComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <style>
        .header {
          width: 100%;
          height: 10.4vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 3%;
          background-color: #f5f5dc; /* 米白色背景 */
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
          color: #333; /* 深色文字在米白背景上 */
          font-weight: bold;
        }
        .logo-text .subtitle {
          font-size: 0.8vw;
          color: #666; /* 稍深的灰色 */
        }
        .nav-menu {
          display: flex;
          gap: 2vw;
        }
        .nav-menu a {
          color: #333; /* 深色導航文字 */
          text-decoration: none;
          font-size: 1.1vw;
          font-weight: bold;
          transition: color 0.3s ease;
        }
        .nav-menu a:hover {
          color:rgb(255, 174, 0); /* 較淡的橘色 hover 效果 */
        }
        .profile-icon img {
          width: 3vw;
          height: 3vw;
          border-radius: 50%;
          object-fit: cover;
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
        <div class="profile-icon">
          <img src="img/user.png" alt="User" />
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

    }
}

customElements.define('header-component', HeaderComponent);