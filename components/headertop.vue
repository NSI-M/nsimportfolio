<template>
        <header class="kielheader">
            <NuxtLink to="/" class="logocontainer" external  target="_self" style="text-decoration: none;">
                    <img src="@/assets/img/logob.png" class="headlogo">
                    <div class="headertitle">
                        <h2 style="font-family: 'adobe-caslon-pro';font-weight: 400;">NSIM</h2>
                    </div>
            </NuxtLink>
            <div class="search-container"></div>
            <div class="headerlist" >
                <Authcomp>
                    <div class="headeritem" >
                        <button class="menubutton" onclick="toggleMenu()" >
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="4" y1="9" x2="28" y2="9" stroke="#ffffff" stroke-width="1.5" fill-opacity="0"/>
                                <line x1="4" y1="18" x2="28" y2="18" stroke="#ffffff" stroke-width="1.5" fill-opacity="0"/>
                            </svg>
                        </button>
                        <ul class="menu" id="menu">
                        <li class="menulists"><NuxtLink to="/diary/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">DIARY</NuxtLink></li>
                        <li class="menulists"><NuxtLink to="/works/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">WORKS</NuxtLink></li>
                        <li class="menulists"><NuxtLink to="/study/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">STUDY</NuxtLink></li>
                        <li class="menulists"><NuxtLink to="/contact/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">CONTACT</NuxtLink></li>
                        </ul>
                    </div>
                </Authcomp>
                <div class="headeritem" >
                    <button class="menubutton" onclick="toggleMenu()" >
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="4" y1="9" x2="28" y2="9" stroke="#ffffff" stroke-width="1.5" fill-opacity="0"/>
                            <line x1="4" y1="18" x2="28" y2="18" stroke="#ffffff" stroke-width="1.5" fill-opacity="0"/>
                        </svg>
                    </button>
                    <ul class="menu" id="menu">
                        <li class="menulists"><NuxtLink to="/diary/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">DIARY</NuxtLink></li>
                        <li class="menulists"><NuxtLink to="/works/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">WORKS</NuxtLink></li>
                        <li class="menulists"><NuxtLink to="/study/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">STUDY</NuxtLink></li>
                        <li class="menulists"><NuxtLink to="/contact/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">CONTACT</NuxtLink></li>
                    </ul>
                </div>    
            </div>
            

        </header>

</template>

<script setup lang="ts">
</script>