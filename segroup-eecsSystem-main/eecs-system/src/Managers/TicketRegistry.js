// module.exports = TicketRegistry;

import userRegistry from "./UserRegistry.js"

class TicketRegistry {
    constructor(){
        if(!TicketRegistry.instance) {
            this.data = []
            this.load()
            TicketRegistry.instance = this;
        }
        return TicketRegistry.instance
    }

   
    async addTicket(ticket){
     this.data.push(ticket)
     this.save()
     console.log(ticket)
     console.log(this.data)
    }

    save(){
       localStorage.setItem("TicketRegistry", JSON.stringify(this.data))
    }

    load(){
        try {
           const data = localStorage.getItem("TicketRegistry");
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

   deleteEc(ticket){
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

class Ticket {
    constructor(user, date, title, type, details) {
      this.user = user;
      this.date = date;
      this.title = title;
      this.type = type;
      this.details = details;
    }
  }


//initialize default EC Registry with following ECs:
const myRegistry = new TicketRegistry();
export default myRegistry;