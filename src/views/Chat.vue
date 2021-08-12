<template>
  <f7-page name="Chat">
    <f7-navbar back-link="Back">{{f7route.params.maquina}}</f7-navbar>
  </f7-page>
</template>

<script>
  export default {
    props: {
      f7route: Object,
      f7router: Object,
    },
  };
</script>