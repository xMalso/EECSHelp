// ran as a singleton on client side

class CurrentUserManager {
    constructor (){
        if (!CurrentUserManager.instance){
            this.user = []
            this.load()
            CurrentUserManager.instance = this;
        }
        return CurrentUserManager.instance
    }

    setUser(user){
        this.user = user
        console.log(this.user, "useerrr")
        this.save()
    }

    getCurrent(){
        this.load()
        return this.user
    }

    save(){
        console.log("saving user as ", this.user)
        localStorage.setItem("currentUser", JSON.stringify(this.user))
    }
    
    load(){
        try {
           const user = localStorage.getItem("currentUser");
            if (user) {
                this.user = JSON.parse(user);
            } else {
                this.user = null;
            }
        } catch (err) {
            console.error("Error loading data:", err);
            this.user = null;
        }  
    }

}

  class User{
    constructor(name, id, email, username, password, userType){
        this.name = name
        this.id = id
        this.email = email
        this.username = username
        this.password = password
        this.userType = userType
    }
}


const currentUserManager = new CurrentUserManager();

export default currentUserManager;