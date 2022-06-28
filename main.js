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
