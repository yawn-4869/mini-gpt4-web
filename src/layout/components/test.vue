<template>
  <header id="app-header" class="app-header">

    <div class="background-container">
      <div id="background-back" class="background"></div>
      <div id="background-front" class="background"></div>
    </div>

    <div class="header-content">
      <div id="small-toolbar" class="app-toolbar">

        <div class="icon-button">
          <div class="icon">
            <i class="material-icons">menu</i>            
          </div>
        </div>

        <div id="small-title" class="small-title">Some Title</div>     
        <div class="icon-button">
          <div class="icon">            
            <i class="material-icons">search</i>
          </div>
        </div>
        
        <div class="icon-button">
          <div class="icon">            
            <i class="material-icons">more_vert</i>
          </div>
        </div>

      </div>

      <div id="large-toolbar" class="app-toolbar tall">
        <div id="large-title" class="large-title">Some Title</div>
      </div>
    </div>
  </header>

  <div class="card">

    <div class="card-title">Cu mei vide viris gloriatur, at populo eripuit sit</div>

    <p>Bacon ipsum dolor amet turducken short ribs strip steak, cupim pastrami kielbasa sirloin doner drumstick pork belly meatloaf swine shank short loin bacon. Pastrami andouille bresaola spare ribs, jerky drumstick jowl kevin ground round bacon. Hamburger filet mignon tongue pancetta ground round strip steak. Biltong boudin swine, pork chop pig tri-tip short loin shank alcatra kielbasa. Picanha fatback jowl, pastrami tri-tip chicken turkey. Spare ribs picanha alcatra kielbasa rump t-bone shankle meatball landjaeger beef doner biltong fatback short ribs salami. Burgdoggen picanha frankfurter, brisket tongue pig beef ribs doner strip steak hamburger.</p>

    <p>Capicola tri-tip landjaeger strip steak. Ham boudin pig kielbasa landjaeger prosciutto. Shank short ribs spare ribs ball tip salami alcatra. Prosciutto alcatra jerky flank meatball andouille rump bacon. Short loin shoulder tenderloin bresaola. Bacon pastrami turkey ham drumstick tongue kevin meatloaf spare ribs pork belly. Alcatra meatloaf doner tail bresaola meatball ham hock cow.</p>

    <p>Sausage andouille pork chop tri-tip. Ham beef ribs ball tip pork chop picanha biltong. Shoulder rump sirloin meatball ham hock. Flank pancetta ham kielbasa short ribs, leberkas hamburger. Ham hock bresaola ball tip chuck rump pork loin jowl brisket swine tenderloin. Sirloin t-bone jowl ham pork belly leberkas kielbasa.</p>

    <p>Tongue biltong tail capicola beef ribs sausage pig, meatloaf ball tip landjaeger t-bone shankle kielbasa chuck jerky. Tongue chicken ham, beef ribs pastrami meatball ham hock cow leberkas pig. Pork belly turducken sausage salami strip steak cupim chicken chuck landjaeger t-bone bresaola capicola ribeye. Cow fatback filet mignon, turducken tri-tip cupim t-bone pastrami.</p>

    <p>Tongue cow tenderloin pork filet mignon chicken spare ribs, sirloin strip steak pork chop tail turducken. Boudin tail meatloaf shankle leberkas chicken ball tip. Fatback salami ball tip short ribs, cow beef tenderloin venison tail ground round jowl. Beef prosciutto turducken shank. Flank bacon sausage, porchetta tongue picanha pork chop tenderloin drumstick frankfurter beef fatback. Tenderloin biltong short loin, filet mignon tail brisket venison sausage andouille ham shank landjaeger t-bone meatball.</p>

  </div>
</template>

<script>
  
  TweenLite.defaultEase = Linear.easeNone;

  var header     = document.querySelector("#app-header");
  var bgBack     = document.querySelector("#background-back");
  var bgFront    = document.querySelector("#background-front");
  var toolbar    = document.querySelector("#small-toolbar");
  var largeTitle = document.querySelector("#large-title");
  var smallTitle = document.querySelector("#small-title");

  var deltaHeight = header.offsetHeight - toolbar.offsetHeight;

  var rect1 = smallTitle.getBoundingClientRect();
  var rect2 = largeTitle.getBoundingClientRect();

  var scale = rect1.height / rect2.height;
  var x = rect1.left - rect2.left;
  var y = rect1.top  - rect2.top;

  var headerAnimation = new TimelineLite({ paused: true })
    .to(largeTitle, 1, { scale: scale, x: x, y: deltaHeight + y }, 0)
    .to(header,  1, { y: -deltaHeight }, 0)
    .to(toolbar, 1, { y: deltaHeight }, 0)
    .to(bgBack,  1, { y: deltaHeight / 2 }, 0)
    .to(bgFront, 1, { y: deltaHeight / 2 }, 0)
    .to(bgBack,  1, { alpha: 1 }, 0)
    .to(bgFront, 1, { alpha: 0 }, 0)
    .set(smallTitle, { alpha: 1 }, 1)
    .set(largeTitle, { alpha: 0 }, 1);

  var shadowAnimation = TweenLite.to(header, 0.4, { 
    boxShadow: "0 2px 5px rgba(0,0,0,0.6)",
    ease: Power1.easeOut
  }).reverse();

  var progress  = 0;
  var requestId = null;
  var reversed  = true;

  cloneCards(25);
  update();
  window.addEventListener("scroll", requestUpdate);

  function requestUpdate() {
    if (!requestId) {
      requestId = requestAnimationFrame(update);
    }
  }

  function update() {
    
    var scroll = window.pageYOffset;
    
    if (scroll < deltaHeight) {   
      progress = scroll < 0 ? 0 : scroll / deltaHeight;
      reversed = true;
    } else {
      progress = 1;
      reversed = false;
    }
    
    headerAnimation.progress(progress);
    shadowAnimation.reversed(reversed);
    
    requestId = null;
  }

  function cloneCards(count) {
    
    var main = document.querySelector("main");
    var card = document.querySelector(".card");
    
    for (var i = 0; i < count; i++) {
      main.appendChild(card.cloneNode(true));
    }  
  }

</script>

<style lang="scss">

$headerHeight: 300px;
$toolbarHeight: 64px;

* {
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  line-height: 1.4;
}

html, body {
  height: 100%;
  min-height: 100%;
  font-family: Roboto, sans-serif;
}

main {
  padding-top: $headerHeight;
  font-family: arial;
  background: #eee;    
  min-height: 100%;
}

.app-header {
  display: block;
  background: #3f51b5;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  color: #fff;
  height: $headerHeight;
  box-shadow: 0 2px 5px rgba(0,0,0,0);
}

.header-content {
  position: relative;
  height: 100%;
  width: 100%;
}

.app-toolbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: $toolbarHeight;  
  padding: 0 16px;
  pointer-events: none;
  font-size: 20px;
}

#large-toolbar {
  position: absolute;
  bottom: 0;    
  transform-origin: left top;  
  margin-bottom: 24px;
  margin-bottom: 16px;
  width: 100%;
}

.small-title,
.large-title {
  transform-origin: left top;
  white-space: nowrap;  
  flex: 1;
  flex-basis: 0.000000001px;
  overflow: hidden;  
  font-weight: 400;
  line-height: 1.5;  
  position: relative;
}

.small-title {
  margin-left: 14px;  
  // visibility: hidden;
  opacity: 0;
}

.large-title {
  will-change: transform, opacity;
  font-size: 56px;
  font-size: 2em;
  margin-left: 64px;
}

.icon-button {
  display: inline-block;
  position: relative;  
  padding: 6px;  
  outline: none;
  user-select: none;
  font-size: 0;
  line-height: 1;
  width: 40px;
  height: 40px;
  box-sizing: border-box !important;
  
  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    vertical-align: middle;
    fill: currentcolor;
    stroke: none;
    width: 100%;
    height: 100%;
  }
}

.background-container {
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.background {
  pointer-events: none;
  position: absolute;
  background-size: cover;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  will-change: transform, opacity;
}

#background-back {
  background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/mountain-02.jpg);
  background-position: left center;
  opacity: 0;
  // visibility: hidden;
}

#background-front {
  background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/mountain-01.jpg);
  background-position: left center;
}

.card {
  padding: 16px;
  margin: 24px;
  border-radius: 2px;
  background-color: #fff;
  color: rgba(0,0,0,0.87);
  box-shadow: 
    0 2px 2px 0 rgba(0, 0, 0, 0.14), 
    0 1px 5px 0 rgba(0, 0, 0, 0.12), 
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  
  .card-title {    
    padding: 24px 16px 8px;
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
  }
  
  p {
    font-size: 1.6rem;
    font-weight: 400;
    letter-spacing: 0.010em;
    line-height: 1.6em;
    padding: 0 16px;
  }  
}

</style>