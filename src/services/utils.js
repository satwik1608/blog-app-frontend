function iframe(pp) {
  return {
    __html: pp,
  };
}
function formatDate(date) {
  const d = new Date(date);
  const dt = d.toUTCString();

  const str = dt.substr(5, 11);
  return str;
}

module.exports = {
  iframe,
  formatDate,
};
