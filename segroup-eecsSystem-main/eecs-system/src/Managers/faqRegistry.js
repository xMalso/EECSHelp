class FaqRegistry{
    constructor(){
        if(!FaqRegistry.instance) {
            this.data = []
            FaqRegistry.instance = this;
        }
        return FaqRegistry.instance
    }

    addQ(faq){
        this.data.push(faq)
    }
    removeQ(faq){
        this.data.pop(faq)
    }

    getAll(){
        return this.data
    }
}

class faq{
    constructor(question, answer){
        this.question = question
        this.answer = answer
    }
}
const faqRegistry = new FaqRegistry();
//add to registry
module.exports = faqRegistry;