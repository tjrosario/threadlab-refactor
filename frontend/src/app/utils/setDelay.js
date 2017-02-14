const setDelay = ((() => {
  let timer;
  timer = 0;
  return (callback, ms) => {
    clearTimeout(timer);
    return timer = setTimeout(callback, ms);
  };
}))();

export default setDelay;