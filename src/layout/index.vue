<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <div class="banner">
        <div class="title">
          <h1>基于多模态大模型的工程结构震害智能评估系统</h1>
          <br>
          <h2>四川大学工程结构韧性防灾研究团队</h2>
        </div>
        <!-- <img class="img-wrapper" :src="'/logo2.png'"> -->
      </div>
      <app-main />
      <div class="footer">
        <!-- <div class="bubbles">
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
        </div> -->

        <div class="content">
          <div class="info-wrapper">
            <div>
              <b>通讯地址</b>
              <a href="#"> 四川大学中国西部抗震防灾研究中心 </a>
            </div>
            <div style="margin-top: 5px;">
              <b>联系方式</b>
              <a href="#"> 王健泽, jzwang@scu.edu.cn</a>
            </div>
          </div>
          <div class="copyright-wrapper">
            <p>Copyright &copy; 2024 四川大学工程结构韧性防灾研究团队版权持有</p>
          </div>
        </div>
      </div>
      <!-- <svg style="position:fixed; top:100vh">
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
      </svg> -->
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
    // fixedHeader() {
    //   return this.$store.state.settings.fixedHeader
    // },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  data() {
    return {
      fixedHeader: false
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    handleScroll() {
      if (window.scrollY >= 200) {
        this.fixedHeader = true;
      } else {
        this.fixedHeader = false;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  @function makelongshadow($color) {
    $val: 0px 0px $color;
    @for $i from 1 through 200 {
      $val: #{$val}, #{$i}px #{$i}px #{$color};
    }
    @return $val;
  }

  @mixin longshadow($color) {
    text-shadow: makelongshadow($color);
  }

  $color: #2171b5;

  .banner {
    padding: 15px;
    text-align: center;
    overflow: hidden;
    background-color: $color;
    .title {
      float: center;
      width: 100%;
      text-align: center;
    }
    
    h1, h2 {
      line-height: 1;
      margin: 0;
      color: #fff;
    }
    
    h1 {
      font-size: 28px;
      @include longshadow(darken($color, 5% ));
    }
    
    h2 {
      font-size: 20px;
      @include longshadow(darken($color, 8% ));
    }

    // .img-wrapper {
    //   width: 270px;
    //   height: 90px;
    //   position: relative;
    //   float: right;
    //   margin-right: 20px
    // }
  }

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
    height: 50px;
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
    --footer-background:#2171b5;
    display:grid;
    position: relative;
    grid-area: footer;
    margin-top: 1.5rem;
    background: linear-gradient(to bottom, var(--footer-background) 50%, #f5f9ff 50%);
  //   .bubbles {
  //       position: absolute;
  //       top:0;
  //       left:0;
  //       right:0;
  //       height:1rem;
  //       background:var(--footer-background);
  //       filter:url("#blob");
  //       .bubble {
  //           position: absolute;
  //           left:var(--position, 50%);
  //           background:var(--footer-background);
  //           border-radius:100%;
  //           animation:bubble-size var(--time, 4s) ease-in infinite var(--delay, 0s),
  //               bubble-move var(--time, 4s) ease-in infinite var(--delay, 0s);
  //           transform:translate(-50%, 100%);
  //       }
  //   }
    .content {
        z-index: 2;
        display:grid;
        font-family: "STFangsong";
        grid-template-columns: 1fr auto;
        grid-gap: 4rem;
        padding: 1rem;
        background:var(--footer-background);
        .info-wrapper {
          font-size:16px;
        }
        a, p {
            color:#F5F7FA;
            text-decoration:none;
            
        }
        b {
            color:white;
        }
        p {
            margin-top: 25px;
            font-size: 12px;
        }
  //       >div {
  //           display:flex;
  //           flex-direction:column;
  //           justify-content: center;
  //           >div {
  //               margin:0.25rem 0;
  //               >* {
  //                   margin-right:.5rem;
  //               }
  //           }
  //           .image {
  //               align-self: center;
  //               width:4rem;
  //               height:4rem;
  //               margin:0.25rem 0;
  //               background-size: cover;
  //               background-position: center;
  //           }
  //       }
    }
  }

  // @keyframes bubble-size {
  //     0%, 75% {
  //         width:var(--size, 4rem);
  //         height:var(--size, 4rem);
  //     }
  //     100% {
  //         width:0rem;
  //         height:0rem;
  //     }
  // }
  // @keyframes bubble-move {
  //     0% {
  //         bottom:-4rem;
  //     }
  //     100% {
  //         bottom:var(--distance, 10rem);
  //     }
  // }

</style>
