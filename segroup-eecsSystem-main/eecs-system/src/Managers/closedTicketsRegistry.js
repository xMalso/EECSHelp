class closedTicketRegistry {
    constructor(){
        if(!closedTicketRegistry.instance) {
            this.data = []
            this.load()
            closedTicketRegistry.instance = this;
        }
        return closedTicketRegistry.instance
    }

   
    async addTicket(ticket, feedback){
     this.data.push({ticket, feedback})
     this.save()
     console.log(ticket)
     console.log(this.data)
    }

    save(){
       localStorage.setItem("closedTicketRegistry", JSON.stringify(this.data))
    }

    load(){
        try {
           const data = localStorage.getItem("closedTicketRegistry");
            if (data) {
                this.data = JSON.parse(data);
            }
        } catch (err) {
            console.error("Error loading data:", err);
        }  
    }
   
   getLength(){
      return this.data.length;
   }

   getTicket(index){
    this.load()
    return this.data[index];
   }

   getAllTickets(){
    this.load()
    return this.data;
   }

   delete(ticket){
    this.data.splice(ticket, 1)
    this.save()
   }

   getIndex(ticket){
    this.load()
    return this.data.indexOf(ticket)
   }

   clearData() {
    localStorage.removeItem("TicketRegistry");
    this.data = [];
  }

}

//initialize default EC Registry with following ECs:
const closedRegistry = new closedTicketRegistry();

export default closedRegistry;