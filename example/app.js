//Commented out code to toggle options. 


////////mongoose way
const mongoose = require('mongoose');
///mongoose! 
mongoose.connect('mongodb://localhost:27017/fruitsdb', {useNewUrlParser: true}); // add the / and the name of the db


const fruitSchema = new mongoose.Schema ({
    name: {
        type:String,
        //these messages are useful for later.
        required: [true, "Need a name"],
    },
    rating: {
        //check docs for validations
        type: Number,
        min:1,
        max:10,
    },
    review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
    name: "strawberry",
    rating:10,
    review:"Strawberries r good",
});

//fruit.save();

const personSchema = new mongoose.Schema ({
    name: String,
    age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person ({
    name:"John",
    age:35,
});

// person.save()

const kiwi = new Fruit ({
    name: "Kiwi",
    rating:7,
    review:"tart",
});

const apple = new Fruit ({
    name: "Apple",
    rating:8,
    review:"Juicy",
});

const banana = new Fruit ({
    name: "Banana",
    rating:5,
    review:"food",
});

// Fruit.insertMany([apple, kiwi, banana],(er)=>{
//     if (er){
//         console.log(er);
//     }else{
//         console.log('works!')
//     }
// });


// Fruit.updateOne({_id:"5d600582aa1b8afcdf0be858"}, {name:"strawberry"},(err)=>{
//     if (err) {
//         console.log(err);
//     }else{
//         console.log("good job you didn't break it");
//     }
// });

// Fruit.deleteOne({_id: "5d5ffca6d79e870178070712"},(err)=>{
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Deleted file');
//     }
// });


Person.deleteMany({name: /John/ },(err)=>{
    if (err) {
        console.log(err);
    } else {
        console.log('Deleted file');
    }
});

//Looking for items in the database. post last to check all updates
Fruit.find((err,fruits)=>{
    if (err) {
        console.log(err);
    } else {
        //console.log(fruits);
        fruits.forEach((i)=>{
            console.log(i.name);
        });
    };
    //close node when finished
    mongoose.connection.close();
});