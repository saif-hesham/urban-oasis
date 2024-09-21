const formatFieldName = (field: string, upper = true) => {
  return field
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/\b\w/g, char =>
      upper ? char.toUpperCase() : char.toLowerCase()
    );
};

export default formatFieldName;
