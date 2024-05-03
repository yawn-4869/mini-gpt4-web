<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
      <div class="footer">
        <div class="bubbles">
          <div
            v-for="index in 128"
            :key="index"
            class="bubble"
            :style="{
              '--size': `${2 + Math.random() * 4}rem`,
              '--distance': `${6 + Math.random() * 4}rem`,
              '--position': `${-5 + Math.random() * 110}%`,
              '--time': `${2 + Math.random() * 2}s`,
              '--delay': `${-1 * (2 + Math.random() * 2)}s`,
            }"
          ></div>
        </div>

        <div class="content">
          <div>
            <div>
              <b>通讯地址</b>
              <a href="#">四川大学江安校区</a>
            </div>
            <div>
              <b>联系方式</b>
              <a href="#">王健泽, jzwang@scu.edu.cn</a>
            </div>
          </div>
          <div>
            <p>Copyright &copy; 2024 四川大学工程结构韧性防灾研究团队版权持有</p>
          </div>
        </div>
      </div>
      <svg style="position:fixed; top:100vh">
        <defs>
          <filter id="blob">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="blob"
            />
          </filter>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

  .footer {
    z-index: 1;
    --footer-background:#671afb;
    display:grid;
    position: relative;
    grid-area: footer;
    min-height:12rem;
    margin-top: 8rem;
    background: linear-gradient(to bottom, var(--footer-background) 50%, #f5f9ff 50%);
    .bubbles {
        position: absolute;
        top:0;
        left:0;
        right:0;
        height:1rem;
        background:var(--footer-background);
        filter:url("#blob");
        .bubble {
            position: absolute;
            left:var(--position, 50%);
            background:var(--footer-background);
            border-radius:100%;
            animation:bubble-size var(--time, 4s) ease-in infinite var(--delay, 0s),
                bubble-move var(--time, 4s) ease-in infinite var(--delay, 0s);
            transform:translate(-50%, 100%);
        }
    }
    .content {
        z-index: 2;
        display:grid;
        grid-template-columns: 1fr auto;
        grid-gap: 4rem;
        padding:2rem;
        background:var(--footer-background);
        a, p {
            color:#F5F7FA;
            text-decoration:none;
        }
        b {
            color:white;
        }
        p {
            margin:0;
            font-size:.75rem;
        }
        >div {
            display:flex;
            flex-direction:column;
            justify-content: center;
            >div {
                margin:0.25rem 0;
                >* {
                    margin-right:.5rem;
                }
            }
            .image {
                align-self: center;
                width:4rem;
                height:4rem;
                margin:0.25rem 0;
                background-size: cover;
                background-position: center;
            }
        }
    }
  }

  @keyframes bubble-size {
      0%, 75% {
          width:var(--size, 4rem);
          height:var(--size, 4rem);
      }
      100% {
          width:0rem;
          height:0rem;
      }
  }
  @keyframes bubble-move {
      0% {
          bottom:-4rem;
      }
      100% {
          bottom:var(--distance, 10rem);
      }
  }

</style>
