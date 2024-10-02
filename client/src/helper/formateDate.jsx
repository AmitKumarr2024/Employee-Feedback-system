
const formateDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const diffTime = today - date;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }
};

export default formateDate;
