var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */

      var nutFree = _(products).filter(function (x) { 
        if (x.containsNuts === false) {
          return x;
        }
      });

      var mushroomFree = _(products).filter(function (x) { 
        var noMushies = true;
        for (var i = 0; i < x.ingredients.length; i++) {
          if (x.ingredients[i] === "mushrooms") {
            noMushies = false;
          }
        }
        if (noMushies) {
          return x;
        }
      });


      productsICanEat = _.intersect(nutFree, mushroomFree);
      
      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }


    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var isMultipleOf3or5 = function(x) { return x % 3 === 0 || x % 5 === 0 };

    var sum = _(_.range(0,1000)).chain()
      .filter(isMultipleOf3or5)
      .reduce(function (sum, x) { return sum + x })
      .value();

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    var ingredientCount = _(products).chain().map(function(product){
        return product.ingredients 
      }).flatten().reduce(function(list, ingredient) {
        list[ingredient] = (list[ingredient] || 0) + 1;
        return list;
      }, {}).value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
    var largestPrimeFactor = 1;
    var compositeNumber = 22;

    // get a list of all factors of 22
    // from that list, get all primes
    // from that list, return the max

    var isAFactorOf = function(divisor, dividend) {
      return dividend % divisor === 0;
    }

    var isPrime = function(num) {
      if (num === 0 || num === 1) {
        return false;
      }
      // if number has no factors (exclude 1 and itself)
      for (var i = 2; i < num; i++) {
        if (isAFactorOf(i,num)) {
          return false;
        }
      }
      return true;
    }

    largestPrimeFactor = _.range(1, compositeNumber)
    .filter(function(num){
      return isAFactorOf(num, compositeNumber);
    })
    .filter(function(num){
      return isPrime(num)
    })
    .reduce(function(memo, num){
      if (num > memo) {
        return num;
      }
      return memo;
    }, 0);

    expect(largestPrimeFactor).toBe(11);
  });
  
  /*

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {


  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

  });

  it("should find the 10001st prime", function () {

  });
  */
});
