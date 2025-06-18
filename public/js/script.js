function toggleMenu() {
  const menu = document.getElementById('menu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
        } else {
          menu.style.display = 'none';
        }
}  


  

  
  
  //ギャラリーモーダルスクリプト
  document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.mainimg'); //画像クラス指定
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
  
    let currentIndex = 0;
  
    // 画像をクリックしてモーダルを開く
    images.forEach((img, index) => {
      img.addEventListener('click', () => {
        currentIndex = index;
        openModal();
      });
    });
  
    // モーダルを開く
    function openModal() {
      modal.style.display ='flex';
      updateModalImage();
    }
  
    // モーダルを閉じる
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // 次の画像
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateModalImage();
    });
  
    // 前の画像
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateModalImage();
    });
  
    // モーダル画像を更新
    function updateModalImage() {
      modalImage.src = images[currentIndex].src;
    }
  
    // 外部クリックでモーダルを閉じる
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });




$(function () {

  //ページ内スクロール
  var navHeight = $(".header").outerHeight();

  $('a[href^="#"]').on("click", function () {
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top - navHeight;
    $("html, body").animate({ scrollTop: position, }, 300, "swing");
    return false;
  });

  //ページトップ
  $("#js-page-top").on("click", function () {
    $("body,html").animate({ scrollTop: 0, }, 300);
    return false;
  });

  






});



  //ギャラリーモーダルスクリプト
  document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.mainimg');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
  
    let currentIndex = 0;
  
    // 画像をクリックしてモーダルを開く
    images.forEach((img, index) => {
      img.addEventListener('click', () => {
        currentIndex = index;
        openModal();
      });
    });
  
    // モーダルを開く
    function openModal() {
      modal.style.display = 'flex';
      updateModalImage();
    }
  
    // モーダルを閉じる
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // 次の画像
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateModalImage();
    });
  
    // 前の画像
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateModalImage();
    });
  
    // モーダル画像を更新
    function updateModalImage() {
      modalImage.src = images[currentIndex].src;
    }
  
    // 外部クリックでモーダルを閉じる
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
  

