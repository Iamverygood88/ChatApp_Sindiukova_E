import ChatMessage from "./modules/ChatMessage.js";
import ChatComponent from "./modules/ChatComponent.js";




const socket = io();


//this is data destructuring. Go look it up on MDN
function setUserId({sID}) {
    console.log(sID);
    vm.socketID = sID; 
}



function leaveChat(fname) {
    vm.join.push(fname);
    
    
}


function showDisconneectMessage() {
    console.log('user Logout');
    
}

function appendMessage(message) {
    vm.messages.push(message);

}

function appendJoin(fname) {
    vm.join.push(fname);

}



const vm = new Vue({
    el: "#app",

    data: {
        donotdisplay: false,
        loginhide: true,
        type: "",
        fname: "",
        lname: "",
        socketID: "",
        message: "",
        join: [],
        messages: []
    },


    methods: {

        dispatchMessage() {

            console.log('handle email message');
            socket.emit('chat_message', { content: this.message, name: (this.fname + " " + this.lname)|| "anonymous"})
            this.message = "";

        },

        loginUser() {
            this.donotdisplay = !this.donotdisplay;
            this.loginhide = !this.loginhide;
            socket.emit('chat_join', { name: (this.fname + " " + this.lname)|| "anonymous", type: "is online",});
            
        },


        logoutUser() {
            socket.emit('chat_leave', { name: (this.fname + " " + this.lname)|| "anonymous", type: "is offline"});
            this.donotdisplay = !this.donotdisplay;
            this.loginhide = !this.loginhide;
           
        }
    
    }, 

    mounted: function() {
        console.log('vue is done mounting');
    }, 

    components: {
        newmessage: ChatMessage,
        join: ChatComponent
    }
}).$mount("#app");

socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnect', showDisconneectMessage);
socket.addEventListener('new_message', appendMessage);
socket.addEventListener('new_join', appendJoin);
socket.addEventListener('new_leave', leaveChat);
