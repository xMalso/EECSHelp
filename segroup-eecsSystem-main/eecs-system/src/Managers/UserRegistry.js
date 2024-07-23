// ran as a singleton on server side


class UserRegistry {
    constructor(){
        if(!UserRegistry.instance){
            this.users = []
            UserRegistry.instance = this;
        }
        return UserRegistry.instance
    }

    findUserByUsername(username){
        //can be simplified tbf
        for (let i=0; i< this.users.length; i++){
            if (this.users[i].username.toLowerCase() === username.toLowerCase()){
                return this.users[i]
            }
        }
        return false
    }
    addUser(user){
        this.users.push(user)
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

const userRegistry = new UserRegistry();
userRegistry.addUser(new User("Student1","ec12345","student1@qmul.ac.uk","student1","student1","student"))
userRegistry.addUser(new User("Student2","ec23456","student2@qmul.ac.uk","student2","student2","student"))
userRegistry.addUser(new User("Technician QMUL","te12345","technician@qmul.ac.uk","technician","technician","technician"))
userRegistry.addUser(new User("Admin QMUL","te12345","admin@qmul.ac.uk","admin","admin","admin"))
userRegistry.addUser(new User("Luke","ec2300","luke@qmul.ac.uk","luke","luke123","student"))
userRegistry.addUser(new User("Darena","ec34456","darena@qmul.ac.uk","darena","darena123","student"))
userRegistry.addUser(new User("Yousuf","ec2349","yousuf@qmul.ac.uk","yousuf","yousuf123","student"))
userRegistry.addUser(new User("Mo","ec12121","mo@qmul.ac.uk","mo","mo1223","student"))
userRegistry.addUser(new User("Finn","ec9876","student2@qmul.ac.uk","finn","finn123","student"))
userRegistry.addUser(new User("Isaac","ec10293","student2@qmul.ac.uk","isaac","isaac123","student"))
userRegistry.addUser(new User("Saad","ec99999","student2@qmul.ac.uk","saad","saad123","student"))

module.exports = userRegistry;