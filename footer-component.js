const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = `
	<style>
		:host {
			display: block;
			width: 100%;
		}

		.footer {
			width: 100%;
			height: 26vw;
			background-color: #dcdcc0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 3vw 6vw;
			box-sizing: border-box;
			color: #666;
			font-family: 'Noto Sans TC', sans-serif;
		}

		.footer-content {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			margin-bottom: 2vw;
			gap: 2vw;
			align-items: flex-start; /* 確保所有區塊從頂部開始對齊 */
		}

		.footer-left {
			width: 40%;
			min-width: 300px;
			display: flex;
			flex-direction: column;
		}

		.footer-center,
		.footer-right {
			width: 25%;
			min-width: 220px;
			display: flex;
			flex-direction: column;
		}

		.footer-logo {
			display: flex;
			align-items: center;
			gap: 1vw;
			text-decoration: none;
			height: 3.8vw; /* 設定固定高度與其他標題對齊 */
		}

		.footer-logo-text {
  			display: flex;
  			flex-direction: column;
  			justify-content: center;
  			height: 3.8vw;
		}

		.footer-logo img {
			width: 3.2vw;
			height: 3.2vw;
		}

		.footer-title {
			font-size: 1.8vw;
			font-weight: bold;
			color: #333; /* 改為與header一致的深色 */
		}

		.footer-subtitle {
			font-size: 1vw;
			color: #666; /* 改為與header一致的灰色 */
		}

		.footer-desc {
			font-size: 1.05vw;
			line-height: 1.8;
			margin: 1.2vw 0 1.6vw 0;
		}

		.footer-social {
			display: flex;
			gap: 1.2vw;
		}

		.footer-social img {
			width: 2.2vw;
			height: 2.2vw;
		}

		.footer-center h4,
		.footer-right h4 {
			font-size: 1.3vw;
			color: #333; /* 改為與header一致的深色 */
			margin-bottom: 1vw;
			height: 3.8vw; /* 與 logo 區域保持相同高度 */
			display: flex;
			align-items: center; /* 垂直置中對齊 */
			margin-top: 0; /* 確保從頂部開始 */
		}

		.footer-center a {
			display: block;
			font-size: 1.1vw;
			margin-bottom: 0.8vw;
			color: #666;
			text-decoration: none;
		}

		.footer-center a:hover {
			color: #ffb84d; /* 改為較淡的橘色 */
		}

		.footer-right div {
			display: flex;
			align-items: center;
			font-size: 1.1vw;
			margin-bottom: 0.8vw;
		}

		.footer-right img {
			width: 1.3vw;
			height: 1.3vw;
			margin-right: 0.6vw;
			vertical-align: middle;
		}

		.footer-bottom {
			border-top: 1px solid #555;
			padding-top: 1.2vw;
			font-size: 0.95vw;
			color: #666;
			text-align: left;
		}

		/* 大螢幕版型 (1400px以上) */
		@media (min-width: 1400px) {
			.footer {
				height: 320px;
				padding: 40px 80px;
			}
			.footer-content {
				gap: 40px;
				margin-bottom: 30px;
			}
			.footer-logo img {
				width: 45px;
				height: 45px;
			}
			.footer-logo-text {
				height: 50px;
			}
			.footer-title {
				font-size: 24px;
			}
			.footer-subtitle {
				font-size: 14px;
			}
			.footer-desc {
				font-size: 15px;
				margin: 18px 0 24px 0;
			}
			.footer-social {
				gap: 18px;
			}
			.footer-social img {
				width: 32px;
				height: 32px;
			}
			.footer-center h4,
			.footer-right h4 {
				font-size: 18px;
				margin-bottom: 15px;
				height: 50px;
			}
			.footer-center a {
				font-size: 15px;
				margin-bottom: 12px;
			}
			.footer-right div {
				font-size: 15px;
				margin-bottom: 12px;
			}
			.footer-right img {
				width: 18px;
				height: 18px;
				margin-right: 8px;
			}
			.footer-bottom {
				padding-top: 18px;
				font-size: 13px;
			}
		}
		
		/* 平板版型 (768px - 1024px) */
		@media (max-width: 1024px) and (min-width: 769px) {
			.footer {
				height: auto;
				min-height: 30vw;
				padding: 4vw 5vw;
			}
			.footer-content {
				flex-direction: column;
				gap: 4vw;
				margin-bottom: 3vw;
			}
			.footer-left,
			.footer-center,
			.footer-right {
				width: 100%;
				min-width: auto;
			}
			.footer-logo img {
				width: 5vw;
				height: 5vw;
			}
			.footer-logo-text {
				height: 5vw;
			}
			.footer-title {
				font-size: 2.5vw;
			}
			.footer-subtitle {
				font-size: 1.4vw;
			}
			.footer-desc {
				font-size: 1.6vw;
				margin: 2vw 0 2.5vw 0;
			}
			.footer-social {
				gap: 2vw;
			}
			.footer-social img {
				width: 3vw;
				height: 3vw;
			}
			.footer-center h4,
			.footer-right h4 {
				font-size: 2vw;
				margin-bottom: 1.5vw;
				height: auto;
			}
			.footer-center a {
				font-size: 1.6vw;
				margin-bottom: 1.2vw;
			}
			.footer-right div {
				font-size: 1.6vw;
				margin-bottom: 1.2vw;
			}
			.footer-right img {
				width: 2vw;
				height: 2vw;
				margin-right: 1vw;
			}
			.footer-bottom {
				padding-top: 2vw;
				font-size: 1.4vw;
			}
		}
		
		/* 手機版型 (小於768px) */
		@media (max-width: 768px) {
			.footer {
				height: auto;
				min-height: 500px;
				padding: 30px 25px;
			}
			.footer-content {
				flex-direction: column;
				gap: 25px;
				margin-bottom: 20px;
			}
			.footer-left,
			.footer-center,
			.footer-right {
				width: 100%;
				min-width: auto;
			}
			.footer-logo {
				gap: 12px;
			}
			.footer-logo img {
				width: 40px;
				height: 40px;
			}
			.footer-logo-text {
				height: 40px;
			}
			.footer-title {
				font-size: 20px;
			}
			.footer-subtitle {
				font-size: 12px;
			}
			.footer-desc {
				font-size: 14px;
				margin: 15px 0 20px 0;
			}
			.footer-social {
				gap: 15px;
			}
			.footer-social img {
				width: 25px;
				height: 25px;
			}
			.footer-center h4,
			.footer-right h4 {
				font-size: 16px;
				margin-bottom: 12px;
				height: auto;
			}
			.footer-center a {
				font-size: 14px;
				margin-bottom: 10px;
			}
			.footer-right div {
				font-size: 14px;
				margin-bottom: 10px;
			}
			.footer-right img {
				width: 16px;
				height: 16px;
				margin-right: 8px;
			}
			.footer-bottom {
				padding-top: 15px;
				font-size: 12px;
			}
		}
	</style>

	<div class="footer" id="contact-us">
		<div class="footer-content">
			<div class="footer-left">
				<a href="index.html" class="footer-logo">
					<img src="img/ntueDream-logo.png" alt="Logo">
					<div class="footer-logo-text">
						<div class="footer-title">芝山圓夢媒合站</div>
						<div class="footer-subtitle">提案媒合平台</div>
					</div>
				</a>
				<div class="footer-desc">
					連結創意與機會，實現夢想的橋樑。<br>
					芝山圓夢媒合站致力於促進學生與企業間的合作，創造雙贏局面。
				</div>
			</div>

			<div class="footer-center">
				<h4>快速連結</h4>
				<a href="index.html">首頁</a>
				<a href="proposal.html">夢想聚合</a>
				<a href="overview.html">提案總覽</a>
				<a href="questions.html">常見問題</a>
			</div>

			<div class="footer-right">
				<h4>聯絡我們</h4>
				<div><img src="img/location.png" alt="loc">台北市大安區和平東路二段134號</div>
				<div><img src="img/email.png" alt="email">s11219039@stu.ntue.edu.tw</div>
				<div><img src="img/phone.png" alt="phone">(02) 6639-6688</div>
			</div>
		</div>
		<div class="footer-bottom">
			© 國立臺北教育大學，版權所有。
		</div>
	</div>
`;

class FooterComponent extends HTMLElement {
	connectedCallback() {
		this.attachShadow({ mode: 'open' })
			.appendChild(footerTemplate.content.cloneNode(true));
	}
}

customElements.define('footer-component', FooterComponent);
