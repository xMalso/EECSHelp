class OutcomeRegistry {
    constructor(){
        if(!OutcomeRegistry.instance) {
            this.data = []
            this.load()
            OutcomeRegistry.instance = this;
        }
        return OutcomeRegistry.instance
    }

    async addEC(ec, outcome){
     this.data.push({ec, outcome})
     this.save()
    }

    save(){
       localStorage.setItem("OutcomeRegistry", JSON.stringify(this.data))
    }

    load(){
        try {
           const data = localStorage.getItem("OutcomeRegistry");
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

   getEC(index){
   this.load()
    return this.data[index];
   }

   getAll(){
   this.load()
    return this.data;
   }

   delete(index){
    this.data.splice(index, 1)
    this.save()
   }

    getEcIndex(ec){
        this.load()
        return this.data.indexOf(ec)
    }
}

const myOutcome = new OutcomeRegistry();

export default myOutcome;