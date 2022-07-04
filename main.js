// Step 1: Chaning background color after 1 second delay.
// setTimeout(() => {
//   document.body.style.backgroundColor = "#FFC54D";
//   setTimeout(() => {
//     document.body.style.backgroundColor = "#BD4291";
//     setTimeout(() => {
//       document.body.style.backgroundColor = "#F94C66";
//       setTimeout(() => {
//         document.body.style.backgroundColor = "#53BF9D";
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Step 2: Create a function for step 1.
const changeColor = (color, delay, doAfter) => {
  setTimeout(() => {
    document.body.style.backgroundColor = color;
    doAfter && doAfter();
  }, delay);
};

// Step 3: Calling the step 2 function.
// EXMAPLE OF CALLBACK HELL.
changeColor("#FFC54D", 1000, () => {
  changeColor("#BD4291", 1000, () => {
    changeColor("#F94C66", 1000, () => {
      changeColor("#53BF9D", 1000, () => {});
    });
  });
});

// Step 4: Another exmaple: Calling a fake API that use callbacks.
// Just focus on calling the API. Writing promises will be converd in next steps.

// Fake API
// success: callback which runs if task is sucessfull.
// failure callback which runs if task is unscessfull.
const fakeRequest = (url, success, failure) => {
  const delay = Math.floor(Math.random() * 5000);
  setTimeout(() => {
    // Task fails
    if (delay > 3000) {
      // Calls failure callback
      failure("Connection Timeout.");
    }
    // Task successfull
    else {
      // Calls success callback
      success(`Hi. This is your data from ${url}`);
    }
  }, delay);
};

// Calling the API
// fakeRequest(
//   "money.com/page1",
//   // success callback
//   function (response) {
//     console.log("Request sucessful Page1");
//     console.log(response);
//     // If and after request to page 1 sucessfull request for page 2.
//     fakeRequest(
//       "money.com/page2",
//       // success callback
//       function (response) {
//         console.log("Request sucessful Page2");
//         console.log(response);
//         // If and after request to page 2 sucessfull request for page 3.
//         fakeRequest(
//           "money.com/page3",
//           // success callback
//           function (response) {
//             console.log("Request sucessful Page3");
//             console.log(response);
//           },
//           // failure callback
//           function (err) {
//             console.log("Request failed Page3");
//             console.log(err);
//           }
//         );
//       },
//       // failure callback
//       function (err) {
//         console.log("Request failed Page2");
//         console.log(err);
//       }
//     );
//   },
//   // failure callback
//   function (err) {
//     console.log("Request failed Page1");
//     console.log(err);
//   }
// );

// Step 5: Calling a fake API that uses Promise.
// Just focus on calling the API. Writing promises will be converd in next steps.

// Same API in step 4 but using Promise.
// Only URL as a parameter. Doesn't use callbacks.

// Promises have 3 states.
// 1. pending : Waiting for task to complete. Eventually, will be rejected or resolved.
// 2. resolved : Task completed successfully.
// 3. rejected : Task completion failed.
const fakeRequest2 = (url) => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 5000);
    setTimeout(() => {
      if (delay > 3000) {
        reject("Connection Timeout");
      } else {
        resolve(`Hi. This is your data from ${url}`);
      }
    }, delay);
  });
};

const req = fakeRequest2("money.com/page1");
console.log(req);
// req is an Promise object. Contains then and catch methods. We pass callbacks to those 2 methods.
// then runs when the Promise is resolved.
// catch runs when the Prmise is rejected.
// In another words, the callback we pass to the then will be the function that runs when resolved.
// In another words, the callback we pass to the catch will be the function that runs when rejected.
// In another words, We are sending the callback functions to Prmoise. And ask Prmise to execute those functions
// with his data when he is ready.
req
  .then((response) => {
    console.log("Request sucessfull Page1");
    console.log(response);
    // Here, for example I don't save the promise to an object like page1 request.
    fakeRequest2("money.com/page2")
      .then((response) => {
        console.log("Request sucessfull Page2");
        console.log(response);
        fakeRequest2("money.com/page3")
          .then((response) => {
            console.log("Request sucessfull Page3");
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
