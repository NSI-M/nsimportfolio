<template>
        <header class="kielheader">
            <NuxtLink to="/" class="logocontainer" external  target="_self" style="text-decoration: none;">
                    <img src="@/assets/img/logo.png" class="headlogo">
                    <div class="headertitle">
                        <h2 style="font-family: 'Orbitron';font-weight: 400;">JRS</h2>
                    </div>
            </NuxtLink>
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
                            <li class="menulists"><NuxtLink to="/collections/" external  target="_self" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">Collection</NuxtLink></li>
                            <li class="menulists"><NuxtLink to="/missions/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">Our mission</NuxtLink></li>
                            <li class="menulists"><NuxtLink to="/collaborations/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">Collaboration</NuxtLink></li>
                            <li class="menulists"><NuxtLink to="/arts/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">Arts</NuxtLink></li>
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
                        <li class="menulists"><NuxtLink to="/collections/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">Collection</NuxtLink></li>
                        <li class="menulists"><NuxtLink to="/missions/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">Our mission</NuxtLink></li>
                        <li class="menulists"><NuxtLink to="/collaborations/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">Collaboration</NuxtLink></li>
                        <li class="menulists"><NuxtLink to="/arts/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">Arts</NuxtLink></li>
                    </ul>
                </div>    
            </div>
        </header>

</template>