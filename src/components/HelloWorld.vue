<script setup>
import { ref } from 'vue'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import vueLogo from '../assets/vue.svg'

const count = ref(0)
</script>

<template>
  <section id="center">
    <div class="hero">
      <img :src="heroImg" class="base" width="170" height="179" alt="" />
      <img :src="vueLogo" class="framework" alt="Vue logo" />
      <img :src="viteLogo" class="vite" alt="Vite logo" />
    </div>
    <div>
      <h1>Get started</h1>
      <p>Edit <code>src/App.vue</code> and save to test <code>HMR</code></p>
    </div>
    <button class="counter" @click="count++">Count is {{ count }}</button>
  </section>

  <div class="ticks"></div>

  <section id="next-steps">
    <div id="docs">
      <svg class="icon" role="presentation" aria-hidden="true">
        <use href="/icons.svg#documentation-icon"></use>
      </svg>
      <h2>Documentation</h2>
      <p>Your questions, answered</p>
      <ul>
        <li>
          <a href="https://vite.dev/" target="_blank">
            <img class="logo" :src="viteLogo" alt="" />
            Explore Vite
          </a>
        </li>
        <li>
          <a href="https://vuejs.org/" target="_blank">
            <img class="button-icon" :src="vueLogo" alt="" />
            Learn more
          </a>
        </li>
      </ul>
    </div>
    <div id="social">
      <svg class="icon" role="presentation" aria-hidden="true">
        <use href="/icons.svg#social-icon"></use>
      </svg>
      <h2>Connect with us</h2>
      <p>Join the Vite community</p>
      <ul>
        <li>
          <a href="https://github.com/vitejs/vite" target="_blank">
            <svg class="button-icon" role="presentation" aria-hidden="true">
              <use href="/icons.svg#github-icon"></use>
            </svg>
            GitHub
          </a>
        </li>
        <li>
          <a href="https://chat.vite.dev/" target="_blank">
            <svg class="button-icon" role="presentation" aria-hidden="true">
              <use href="/icons.svg#discord-icon"></use>
            </svg>
            Discord
          </a>
        </li>
        <li>
          <a href="https://x.com/vite_js" target="_blank">
            <svg class="button-icon" role="presentation" aria-hidden="true">
              <use href="/icons.svg#x-icon"></use>
            </svg>
            X.com
          </a>
        </li>
        <li>
          <a href="https://bsky.app/profile/vite.dev" target="_blank">
            <svg class="button-icon" role="presentation" aria-hidden="true">
              <use href="/icons.svg#bluesky-icon"></use>
            </svg>
            Bluesky
          </a>
        </li>
      </ul>
    </div>
  </section>

  <div class="ticks"></div>
  <section id="spacer"></section>
</template>

<style lang="less">
#center {
  text-align: center;
}

.hero {
  position: relative;
}

.base {
  z-index: 2;
  position: relative;
}

.framework {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 3;
  animation: hero-enter 3s ease-in-out 1s both;
}

.vite {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1;
  animation: hero-enter 3s ease-in-out 1.5s both;
}

.counter {
  background-color: #42b883;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.ticks {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}

.tick {
  width: 20px;
  height: 20px;
  background-color: #42b883;
  margin: 0 5px;
  border-radius: 50%;
  animation: tick 1s ease-in-out infinite;
}

@keyframes hero-enter {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes tick {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
