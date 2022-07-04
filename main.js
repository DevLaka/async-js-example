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
fakeRequest(
  "money.com/page1",
  // success callback
  function (response) {
    console.log("Request sucessful Page1");
    console.log(response);
    // If and after request to page 1 sucessfull request for page 2.
    fakeRequest(
      "money.com/page2",
      // success callback
      function (response) {
        console.log("Request sucessful Page2");
        console.log(response);
        // If and after request to page 2 sucessfull request for page 3.
        fakeRequest(
          "money.com/page3",
          // success callback
          function (response) {
            console.log("Request sucessful Page3");
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
