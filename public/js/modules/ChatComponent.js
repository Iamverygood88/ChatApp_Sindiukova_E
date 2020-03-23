export default {
    props: ['fnm'], 

    template: `
       <p class="user-join">
       <span> {{ fnm.message.name }} {{ fnm.message.type }}</span>
       </p>
    
    `,

    data: function() {
        return { 
            message : "hello from the template", 
            // matchedID: this.$parent.socketID == this.fnm.id
        };
    }


    

}