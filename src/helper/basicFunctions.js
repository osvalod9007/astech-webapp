export const counterDevice = (devices) => {
  let completed = 0,
    submitted = 0,
    connected = 0,
    offline = 0;
  if (devices !== undefined) {
    devices.map((value) => {
      switch (value.status) {
        case "Completed":
          completed++;
          break;
        case "Submitted":
          submitted++;
          break;
        case "Connected":
          connected++;
          break;
        case "Offline":
          offline++;
          break;
        default:
          break;
      }
    });
  }
  return {
    connected,
    submitted,
    completed,
    offline,
  };
};

export const sortByString = (a, b) => {
  return (a === b && 0) || (a < b && -1) || (a < b && 1);
};
