async function transitionAction(step) {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const body = document.querySelector("body");
  if (step == "start") {
    body?.classList.add("page-transition");
    await sleep(500);
  } else {
    await sleep(500);
    body?.classList.remove("page-transition");
  }
}

export default transitionAction;
