// window.addEventListener("scroll", function () {
//   const leaf = document.getElementById("leaf");
//   const scrollY = window.scrollY;

//   // 讓葉子根據 scroll 上下移動、左右擺動
//   leaf.style.transform = `translate(-50%, ${scrollY * 0.3}px) rotate(${scrollY * 0.2}deg)`;
// });


// leaf僅移動位置，沒有擺動
// const leaf = document.getElementById('leaf');

//     function animateLeaf() {
//       const scrollY = window.scrollY;

//       // 漂浮幅度：你可以調整 50、30、0.2 這些值
//       const offsetX = Math.sin(scrollY * 0.01) * 50; // 左右擺動
//       const offsetY = Math.cos(scrollY * 0.005) * 30; // 上下飄
//       const rotation = scrollY * 0.2; // 旋轉角度

//       leaf.style.transform = `
//         translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))
//         rotate(${rotation}deg)
//       `;

//       requestAnimationFrame(animateLeaf);
//     }

//     animateLeaf();


/* leaf像鐘擺搖晃動畫
    const leaf = document.getElementById('leaf');
    let t = 0; // 時間變數

    function animateLeaf() {
      t += 0.02; // 每 frame 累積

      const scrollY = window.scrollY;

      // 持續擺動：用時間控制
      const offsetX = Math.sin(t) * 5;
      const offsetY = Math.cos(t * 2) * 3;

      // 滾動影響：位移幅度或旋轉
      const rotation = scrollY * 0.2;

      leaf.style.transform = `
        translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))
        rotate(${rotation}deg)
      `;

      requestAnimationFrame(animateLeaf);
    }

    animateLeaf();
*/


// 葉子固定葉柄隨上下擺動
    // const leaf = document.getElementById('leaf');
    // let t = 0;

    // function animateLeaf() {
    //   t += 0.02;  // 控制擺動速度

    //   const swing = Math.sin(t) * 10; // 左右擺動角度（±15度）
    //   const scrollY = window.scrollY;
    //   const fall = scrollY * 0.5; // 滾動向下位移幅度

    //   leaf.style.transform = `
    //     translateY(${fall}px)
    //     rotate(${swing}deg)
    //   `;

    //   requestAnimationFrame(animateLeaf);
    // }

    // animateLeaf();

// 多片葉子隨滾動擺動動畫
    const leaves = document.querySelectorAll('.leaf');

    // 為每片葉子設定不同參數
    const settings = Array.from(leaves).map(() => ({
      baseAngle: Math.random() * 40 - 60,   // 角度
      swingSpeed: Math.random() * 0.01 + 0.02, // 擺動速度
      swingRange: Math.random() * 10 + 5    // 擺動幅度 
    }));

    function animateLeaves() {
      const scrollY = window.scrollY;

      leaves.forEach((leaf, i) => {
        const { baseAngle, swingSpeed, swingRange } = settings[i];
        const t = performance.now() * 0.002; // 時間
        const swing = Math.sin(t * swingSpeed * 100) * swingRange;
        const fall = scrollY * 0.5;

        leaf.style.transform = `
          translateY(${fall}px)
          rotate(${baseAngle + swing}deg)
        `;
      });

      requestAnimationFrame(animateLeaves);
    }

    animateLeaves();

window.addEventListener('load', function() {
          const normalLeaves = document.querySelectorAll('.normal-leaf');
          const specialLeaf = document.querySelector('.special-leaf');

          // 正常葉子搖曳參數
          const normalSettings = Array.from(normalLeaves).map(() => ({
            baseAngle: Math.random() * 40 - 60,
            swingSpeed: Math.random() * 0.01 + 0.01,
            swingRange: Math.random() * 10 + 5
          }));

          // 特殊落葉搖曳參數
          const specialSetting = {
            baseAngle: Math.random() * 40 - 60,
            swingSpeed: Math.random() * 0.01 + 0.01,
            swingRange: Math.random() * 10 + 5
          };

          function animateLeaves() {
            const t = performance.now() * 0.002;
            const scrollY = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollRatio = docHeight > 0 ? scrollY / docHeight : 0;

            // 🎐 正常葉子：固定搖曳，不跟著滾動位移
            normalLeaves.forEach((leaf, i) => {
              const { baseAngle, swingSpeed, swingRange } = normalSettings[i];
              const swing = Math.sin(t * swingSpeed * 100) * swingRange;

              leaf.style.transform = `
                rotate(${baseAngle + swing}deg)
              `;
            });

            // 🍃 特殊落葉：搖曳 + 上下位移 + 左右漂移 + 傾斜 + 縮放
            const { baseAngle, swingSpeed, swingRange } = specialSetting;
            const specialSwing = Math.sin(t * swingSpeed * 100) * swingRange;

            let translateX, translateY, rotate, scale;

            if (scrollRatio < 0.5) {
              // 上半段：慢慢往左
              translateX = -scrollRatio * 200; // 最多左飄 -100vw
              translateY = scrollRatio * window.innerHeight * 0.8;
              rotate = specialSwing + scrollRatio * 150; // 最多左飄 -30vw
              scale = 1 - scrollRatio * 0.2;
            }
            else {
              // 下半段：往右滑回來
              translateX = (scrollRatio - 0.5) * 300 - 120; // 從 -15vw ➜ +5vw
              translateY = scrollRatio * window.innerHeight * 0.6;
              rotate = specialSwing + 30 + (scrollRatio - 0.5) * 30;
              scale = 0.9 + (scrollRatio - 0.5) * 0.1;
            }

            specialLeaf.style.transform = `
              translateX(${translateX}vw)
              translateY(${translateY}px)
              rotate(${baseAngle + rotate}deg)
              scale(${scale})
            `;

            requestAnimationFrame(animateLeaves);
          }

          animateLeaves();
        });


        // 滾動比例顯示
        const box = document.createElement('div');
        box.style.position = 'fixed';
        box.style.top = '10px';
        box.style.right = '10px';
        box.style.background = 'rgba(0,0,0,0.5)';
        box.style.color = 'white';
        box.style.padding = '5px';
        box.style.fontSize = '14px';
        document.body.appendChild(box);

        window.addEventListener('scroll', () => {
          const ratio = window.scrollY / (document.body.scrollHeight - window.innerHeight);
          box.textContent = 'Scroll ratio: ' + ratio.toFixed(3);
        });


        // 滾動到特定位置淡入顯示圖片
        const img = document.querySelector('.reveal-image');

        window.addEventListener('scroll', () => {
          const scrollY = window.scrollY;
          const docHeight = document.body.scrollHeight - window.innerHeight;
          const scrollRatio = scrollY / docHeight;

          if (scrollRatio >= 0.36 && scrollRatio < 0.45) {
            img.classList.add('active');
          } else {
            img.classList.remove('active'); // 若想只觸發一次，可把這行拿掉
          }
        });

// 咖啡豆飄浮動畫
  // 飄浮動畫
const coffee = document.querySelector('.coffee-floating');
let t = 0;
const coffeeSwing = {
  baseAngle: 90,
  swingSpeed: Math.random() * 0.01 + 0.01,
  swingRange: Math.random() * 10 + 1
};
function animateCoffee() {
  t += 0.02;
  const scrollY = window.scrollY;
  const offsetX = Math.sin(t) * 2;
  const offsetY = Math.cos(t) * 2;
  const swing = Math.sin(t * coffeeSwing.swingSpeed * 30) * coffeeSwing.swingRange;
  const rotation = scrollY * 0.51 + swing;

  coffee.style.transform = `
    translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))
    rotate(${coffeeSwing.baseAngle + rotation}deg)
  `;

  requestAnimationFrame(animateCoffee);
}
animateCoffee();

// 淡出效果
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const bodyHeight = document.body.scrollHeight;

  const distanceToBottom = bodyHeight - (scrollY + windowHeight);
  const fadeDistance = 600;

  let opacity = 1;
  if (distanceToBottom < fadeDistance) {
    opacity = distanceToBottom / fadeDistance;
  }

  coffee.style.opacity = opacity;
});



// // 滾動時淡入顯示區塊
//   window.addEventListener('scroll', function() {
//   const block = document.querySelector('.block');
//   const scrollY = window.scrollY;
//   const windowHeight = window.innerHeight;

//   // 淡入條件：超過 0.5 高度
//   if (scrollY > windowHeight * 0.5 && scrollY < windowHeight * 0.7) {
//     block.classList.add('show');
//   } else {
//     block.classList.remove('show');
//   }
//   });

// 滾動時淡入顯示圖片
// 這段程式碼會在滾動到特定位置時淡入


// 圖片，並在滾動到其他位置時淡出。
  const slides = document.querySelector('.slides');
  const slideCount = document.querySelectorAll('.slide').length;
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let currentIndex = 0;

  function showSlide(index) {
    // 如果滑到最後一張後回到第一張
    if (index >= slideCount) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = slideCount - 1;
    } else {
      currentIndex = index;
    }
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  prevBtn.addEventListener('click', () => {
    showSlide(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    showSlide(currentIndex + 1);
  });

  // 自動輪播
  let autoSlide = setInterval(() => {
  showSlide(currentIndex + 1);
  }, 3000);

  prevBtn.addEventListener('click', () => {
    clearInterval(autoSlide);  // 點左鍵後停止自動輪播
    showSlide(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    clearInterval(autoSlide);  // 點右鍵後停止自動輪播
    showSlide(currentIndex + 1);
  });

  // base.js 中的範例功能（或你也可以直接貼在模板裡）
document.addEventListener('DOMContentLoaded', function () {
  const backToTopButton = document.getElementById("backToTop");

  // 捲動超過 300px 顯示按鈕
  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
      backToTopButton.style.display = "flex";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  // 點擊平滑滾動至頂端
  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});




    




