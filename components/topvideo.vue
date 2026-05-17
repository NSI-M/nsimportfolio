<template>
    <NuxtLink  to="/collections/" target="_self" external class="evisual">
        <video poster="" src="@/assets/img/topvideo.mp4" autoplay loop muted="muted" playsinline controlslist="nodownload" oncontextmenu="return false;">
        </video>
        <button class="buybutton" @click="link">チケットを見る</button> 
    </NuxtLink>

</template>