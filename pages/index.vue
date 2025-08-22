<template>
    
    <headertop/>
    <a class="visual" href="collections/" target="_self">
        <video poster="@/assets/img/jrstop.jpg" src="@/assets/img/volata16.mp4" autoplay loop muted="muted" playsinline controlslist="nodownload" oncontextmenu="return false;">
        </video>
        <p>私たちのコレクションを見る</p>
    </a>
    <div class="pflexbox">
        <h2>
            <span style="font-family: 'Orbitron';">Japan Runway Show</span>とは
        </h2>
        <p>生成AI,SNSが飽和する時代に、生身の人間が纏う表皮としてのファッションを再考する。
            
            アーバンギャルドな視点のみならず、地方・伝統芸術文化にも焦点を当て、日本のファッションシーンのさらなる興隆を。
        </p>
        <h2>
            <span style="font-family: 'Orbitron';">Our Next Schedule</span>
        </h2>
        <callender/>
        <div class="flexcontainer">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item">
                        <a href="" target="_self">
                            <img src="@/assets/img/26aw.jpg" class="d-block w-100" alt="Japan Runway Show">
                        </a>
                    </div>
                    <div class="carousel-item">
                        <a href="" target="_self">
                            <img src="@/assets/img/25fwc.jpg" class="d-block w-100" alt="Japan Runway Show">
                        </a>
                    </div>
                    <div class="carousel-item active">
                        <a href="" target="_self" >
                            <img src="@/assets/img/01.jpg" class="d-block w-100" alt="Japan Runway Show">
                        </a>
                    </div>
                    <div class="carousel-item">
                        <a href="" target="_self">
                            <img src="@/assets/img/IMG_5542.jpg" class="d-block w-100" alt="Japan Runway Show">
                        </a>
                    </div>
                    <div class="carousel-item">
                        <a href="" target="_self">
                            <img src="@/assets/img/IMG_4272.jpg" class="d-block w-100" alt="Japan Runway Show">
                        </a>
                    </div>
                    <div class="carousel-item">
                        <a href="" target="_self" >
                            <img src="@/assets/img/56-DSC03200.jpg" class="d-block w-100" alt="Japan Runway Show">
                        </a>
                    </div>
                </div>
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                </ol>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only"></span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only"></span>
                </a>
            </div>
        </div>


    <newslist/>
    </div>
    <footertop/>
    
</template>

<script setup>
if (import.meta.client) {
    const image = document.querySelector('.carousel');
    const originalFilter = image.style.filter; // 初期状態のフィルターを保存

    window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const opacity = 1.2 - 1.5* scrollTop / window.innerHeight; // スクロール量に応じて1.2～0の値を計算

            // グレースケールフィルターの透明度を調整
    image.style.filter = `grayscale(${opacity})`;
    });
}
</script>