<template>
  <f7-page name="Chat">
    <f7-navbar back-link="Back">Chat com o Assistente Virtual</f7-navbar>
    <f7-messages>
      <f7-messages-title><b>{{date}}</b>,{{hour}}</f7-messages-title>
      <f7-message
        v-for="(message, index) in messagesData"
        :key="index"
        :type="message.type"
        :image="message.image"
        :name="message.name"
        :avatar="message.avatar"
        :first="isFirstMessage(message, index)"
        :last="isLastMessage(message, index)"
        :tail="isTailMessage(message, index)"
      >
        <template #text>
          <!-- eslint-disable-next-line -->
          <span v-if="message.text" v-html="message.text"></span>
        </template>
      </f7-message>
    </f7-messages>
  </f7-page>
</template>

<script>
  export default {
    data(){
      return {
        messagesData:[],
        botName: "(escolher nome)",
        date: "",
        hour: ""
      }
    },
    props: {
      f7route: Object,
      f7router: Object,
    },
    mounted: function(){
      this.messagesData.push({
            name: this.botName,
            type: 'received',
            text: `Olá, sou o ${this.botName}!`,
          });
      if(this.f7route.params.machine === "null")
        this.messagesData.push({
          name: this.botName,
          type: 'received',
          text: 'Em que posso ser útil?',
        })
      else
        this.messagesData.push({
          name: this.botName,
          type: 'received',
          text: `Vejo que foi detetado ${this.f7route.params.machine}`,
        },
        {
          name: this.botName,
          type: 'received',
          text: `Deseja ver os problemas mais comuns de ${this.f7route.params.machine} e as suas soluções?`,
        },
        )

        let today = new Date();
        this.date = today.toDateString().substring(0, today.toDateString().length - 4);
        this.hour = `${today.getHours()}:${today.getMinutes()}`;
    },
    methods: {
      isFirstMessage(message, index) {
        const self = this;
        const previousMessage = self.messagesData[index - 1];
        if (message.isTitle) return false;
        if (
          !previousMessage ||
          previousMessage.type !== message.type ||
          previousMessage.name !== message.name
        )
          return true;
        return false;
      },
      isLastMessage(message, index) {
        const self = this;
        const nextMessage = self.messagesData[index + 1];
        if (message.isTitle) return false;
        if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name)
          return true;
        return false;
      },
      isTailMessage(message, index) {
        const self = this;
        const nextMessage = self.messagesData[index + 1];
        if (message.isTitle) return false;
        if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name)
          return true;
        return false;
      },
    }
  };
</script>