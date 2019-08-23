
////////mongoose way
const mongoose = require('mongoose');
///mongoose! 
mongoose.connect('mongodb://localhost:27017/fruitsdb', {useNewUrlParser: true}); // add the / and the name of the db


const fruitSchema = new mongoose.Schema ({
    name: String,
    rating: Number,
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
    name: "Apple",
    rating:5,
    review:"Crunchy",
});

// fruit.save();

const personSchema = new mongoose.Schema ({
    name: String,
    age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person ({
    name:"John",
    age:35,
});

//person.save()
const kiwi = new Fruit ({
    name: "Kiwi",
    rating:7,
    review:"tart",
});

const orange = new Fruit ({
    name: "Apple",
    rating:8,
    review:"Juicy",
});

const banana = new Fruit ({
    name: "Banana",
    rating:5,
    review:"food",
});

// Fruit.insertMany([kiwi,orange,banana],(er)=>{
//     if (er){
//         console.log(er);
//     }else{
//         console.log('works!')
//     }
// });

//Looking for items in the database
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