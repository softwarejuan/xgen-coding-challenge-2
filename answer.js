(() => {
  // check saved answer
  function checkSavedAnswer() {
    const answer = localStorage.getItem("answer");
    if (answer) {
      document.querySelector(".xgen_answer").value = answer;
      const submitButton = document.querySelector(".submit");
      submitButton.click();
      console.log("answer submitted");
      localStorage.removeItem("answer");
    }
  }
  checkSavedAnswer();

  // check xgen_button is adeed
  async function checkXgenButtonAvailable() {
    return new Promise((resolve, reject) => {
      let buttons = document.getElementsByClassName("xgen_button");
      const interval = setInterval(() => {
        if (buttons.length) {
          console.log("xgen_button added ===================");
          clearInterval(interval);
          buttons[0].click();
          resolve(true);
        }
      }, 45);
    });
  }

  // check window.xgenVariable is available
  async function checkGlobalVariable() {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (window.xgenVariable) {
          console.log("window.xgenVariable is available ===================");
          clearInterval(interval);
          localStorage.setItem("answer", window.xgenVariable);
          resolve(true);
        }
      }, 45);
    });
  }

  // start function
  async function start() {
    await checkXgenButtonAvailable();
    await checkGlobalVariable();
  }
  start();
})();
