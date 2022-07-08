// Step 1: Changing background color after 1 second delay.
/*
setTimeout(() => {
  document.body.style.backgroundColor = "#FFC54D";
  setTimeout(() => {
    document.body.style.backgroundColor = "#BD4291";
    setTimeout(() => {
      document.body.style.backgroundColor = "#F94C66";
      setTimeout(() => {
        document.body.style.backgroundColor = "#53BF9D";
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

// Step 2: Create a function for step 1.
const changeColor = (color, delay, doAfter) => {
  setTimeout(() => {
    document.body.style.backgroundColor = color;
    doAfter && doAfter();
  }, delay);
};

// Step 3: Calling the step 2 function.
// EXAMPLE OF CALLBACK HELL.
/*
changeColor("#FFC54D", 1000, () => {
  changeColor("#BD4291", 1000, () => {
    changeColor("#F94C66", 1000, () => {
      changeColor("#53BF9D", 1000, () => {});
    });
  });
});
*/

// Step 4: Another example: Calling a fake API that use callbacks.
// Just focus on calling the API. Writing promises will be covered in next steps.

// Fake API
// success callback runs if task is successful.
// failure callback runs if task is unsuccessful.
const fakeRequest = (url, success, failure) => {
  const delay = Math.floor(Math.random() * 5000);
  setTimeout(() => {
    // Task fails
    if (delay > 3000) {
      // Calls failure callback
      failure("Connection Timeout.");
    }
    // Task successful
    else {
      // Calls success callback
      success(`Hi. This is your data from ${url}`);
    }
  }, delay);
};

// Calling the API
/*
fakeRequest(
  "money.com/page1",
  // success callback
  function (response) {
    console.log("Request successful Page1");
    console.log(response);
    // If and after request to page 1 successful request for page 2.
    fakeRequest(
      "money.com/page2",
      // success callback
      function (response) {
        console.log("Request successful Page2");
        console.log(response);
        // If and after request to page 2 successful request for page 3.
        fakeRequest(
          "money.com/page3",
          // success callback
          function (response) {
            console.log("Request successful Page3");
            console.log(response);
          },
          // failure callback
          function (err) {
            console.log("Request failed Page3");
            console.log(err);
          }
        );
      },
      // failure callback
      function (err) {
        console.log("Request failed Page2");
        console.log(err);
      }
    );
  },
  // failure callback
  function (err) {
    console.log("Request failed Page1");
    console.log(err);
  }
);
*/

// Step 5: Calling a fake API that uses Promise.
// Just focus on calling the API. Writing promises will be covered in next steps.

// Same API in step 4 but using Promise.
// Only URL as a parameter. No callbacks.

// Promises have 3 states.
// 1. pending : Waiting for task to complete. Eventually, will be rejected or resolved.
// 2. resolved : Task completed successfully.
// 3. rejected : Task completion failed.
const fakeRequest2 = (url) => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 5000);
    setTimeout(() => {
      if (delay > 3000) {
        reject(`Connection Timeout. Failed request to ${url}`);
      } else {
        resolve(`Hi. This is your data from ${url}`);
      }
    }, delay);
  });
};

/*
const req = fakeRequest2("money.com/page1");
console.log(req);
*/
// fakeRequest2 returns an Promise object.
// req is an Promise object. Contains then and catch methods. We pass callbacks to those 2 methods.
// "then" runs when the Promise is resolved.
// "catch" runs when the Promise is rejected.
// In another words, the callback we pass to the then will be the function that runs when resolved.
// In another words, the callback we pass to the catch will be the function that runs when rejected.
// In another words, We are sending the callback functions to Promise. And ask Promise to execute those functions
// with his data when he is ready.
/*
req
  .then((response) => {
    console.log("Request successful Page1");
    console.log(response);
    // Here, for example I don't save the promise to an object like page1 request.
    fakeRequest2("money.com/page2")
      .then((response) => {
        console.log("Request successful Page2");
        console.log(response);
        fakeRequest2("money.com/page3")
          .then((response) => {
            console.log("Request successful Page3");
            console.log(response);
          })
          .catch((err) => {
            console.log("Request failed Page3");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("Request failed Page2");
        console.log(err);
      });
  })
  .catch((err) => {
    console.log("Request failed Page1");
    console.log(err);
  });
*/

// Step 6: Make improvements to Step 5.
// We can write step 5 in better way.
// Because fakeRequestPromise() returns a Promise we don't have to nest.
// We can chain the "then" methods on Promise objects returned by calling fakeRequestPromise() method.
// A single catch method will do the job here.
/*
fakeRequest2("money.com/page1")
  .then((response) => {
    console.log("Request successful Page1");
    console.log(response);
    // return a Promise
    return fakeRequest2("money.com/page2");
  })
  .then((response) => {
    console.log("Request successful Page2");
    console.log(response);
    // return a Promise
    return fakeRequest2("money.com/page3");
  })
  .then((response) => {
    console.log("Request successful Page3");
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  })
*/

// Step 7: Creating promises.
const fakeRequest3 = (url) => {
  // Promise takes one parameter. A function.
  // This function have 2 parameters.
  // "resolve" is called when we want to resolve the Promise object.
  // "reject" is called when we want to reject the Promise object.
  // More details is there in Step5.
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 5000);
    setTimeout(() => {
      if (delay > 3000) {
        reject(`Connection Timeout. Failed request to ${url}`);
      } else {
        resolve(`Hi. This is your data from ${url}`);
      }
    }, delay);
  });
};

// Another example. Re-writing function introduced on step 2 using Promises.
// Not a good example though. Above one is more clear.
const changeColorWithPromise = (color, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.body.style.backgroundColor = color;
      resolve();
    }, delay);
  });
};

// Single line arrow functions => Implicit return.
changeColorWithPromise("#FFC54D", 1000)
  .then(() => changeColorWithPromise("#BD4291", 1000))
  .then(() => changeColorWithPromise("#F94C66", 1000))
  .then(() => changeColorWithPromise("#53BF9D", 1000));
