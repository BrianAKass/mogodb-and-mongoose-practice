//Commented out code to toggle options. 
const axios = require('axios');
const cheerio = require('cheerio');

////////mongoose way
const mongoose = require('mongoose');
///mongoose! 
mongoose.connect('mongodb://localhost:27017/fruitsdb', {useNewUrlParser: true}); // add the / and the name of the db

// Setup the template here 
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
//setup the specific model
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
    name: "strawberry",
    rating:10,
    review:"Strawberries r good",
});

//fruit.save();

const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    //establish relationship
    favoriteFruit: fruitSchema,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person ({
    name:"John",
    age:35,
});

const pineapple = new Fruit({
    name:"Pineapple",
    rating:10,
    review:"favorite fruit"
});

//pineapple.save();

const cherries = new Fruit ({
    name:"Cherries",
    rating: 9,
    review: "avoid the pits and it's great"
});

//cherries.save();

const amy = new Person ({
    name:"Amy",
    age:25,
    favoriteFruit: pineapple,
});

//amy.save();

//person.save();

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

const amazonSchema = new mongoose.Schema ({
    link: String,
    productName: String,
    price: String,
    rating: String,
    numReviews: String,
    prodImg:String,
});

const Amazon = mongoose.model("Amazon", amazonSchema);

axios.get(`https://amzn.to/2Hnb6f6`)
  .then((res)=> {
    const html = res.data;
    const $ = cheerio.load(html);
    const asinURL = "https://www.amazon.com/dp/"+$("#cerberus-data-metrics").attr('data-asin') + "/?tag=friftr-20";
    const product = $("#productTitle").html().replace(/\s\s+/g, '');
    const howMuch = $("#priceblock_ourprice").text();
    const stars = $('#centerCol #acrPopover').text().replace(/\s\s+/g, '');
    const revCount = $('#centerCol #acrCustomerReviewText').text().replace(/\s\s+/g, '');
    const picLink = $('#landingImage').attr('data-old-hires'); 

    const newItem = new Amazon ({
        link: asinURL,
        productTitle: product,
        price: howMuch,
        rating: stars,
        numReviews: revCount,
        prodImg:picLink,
    });

    newItem.save();
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });




// Fruit.insertMany([apple, kiwi, banana],(er)=>{
//     if (er){
//         console.log(er);
//     }else{
//         console.log('works!')
//     }
// });


// Person.updateOne({name:"John"}, {favoriteFruit: cherries},(err)=>{
//     if (err) {
//         console.log(err);
//     }else{
//         console.log("good job you didn't break it");
//     }
// });

// Fruit.deleteOne({_id: 'ObjectId("5d601e2be401b717e406ca36")'},(err)=>{
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Deleted file');
//     }
// });


// Person.deleteMany({name: /Amy/ },(err)=>{
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Deleted file');
//     }
// });

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


