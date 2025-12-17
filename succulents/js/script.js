document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    // --- 1. 滾動時控制按鈕顯示/隱藏 ---
    window.onscroll = function() {
        // 設定捲軸滾動的閾值 (例如：捲動超過視窗高度的 400 像素後才顯示)
        if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    };

    // --- 2. 點擊按鈕，平滑滾動回頂部 ---
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 關鍵：啟用平滑滾動
        });
    });
});