<template>
  <f7-page name="Home">
    <!-- Top Navbar -->
    <div class="navbar">
        <div class="navbar-bg"></div>
        <div class="navbar-inner">
            <div class="title">Virtual Assistance App by Link Consulting</div>
        </div>
    </div>


    <f7-block-title>Funcionalidades</f7-block-title>
    <f7-block strong>

      <f7-button large raised outline href="/ar/">
        <p>Realidade Aumentada&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <span class="camera-icon"></span>
      </f7-button>

      <br>

      <f7-button large raised outline href="/chat/null">
        <p>Assistência Virtual&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <span class="bot-icon"></span>
      </f7-button>

    </f7-block>
  </f7-page>
</template>

<script>
  export default {
    props: {
      f7router: Object,
    },
  }
</script>

<style>
  .bot-icon {
    background: url('../../public/icons/bot-icon.png');
    height: 24px;
    width: 24px;
    display: block;
  }
  .camera-icon {
    background: url('../../public/icons/camera-icon.png');
    height: 24px;
    width: 24px;
    display: block;
  }
</style>