var array = [1, 5, 5, 5, 4, 5];


upperSectionScoringChecker = (one_two_or_three, array) => {
  let sorted_array = array.sort((a, b) => {
    return a - b;
  });
  let filtered_array = sorted_array.filter((number) =>
    number === one_two_or_three
  );
  return filtered_array.length * one_two_or_three;
}

yahtzeeScoringChecker = (array) => {
  let sorted_array = array.sort((a, b) => {
    return a - b;
  });
  if (sorted_array[0] === sorted_array[5]) {
    return sorted_array[0] * 6;
  }
  else {
    return 0;
  }
}

chanceScoringChecker = (array) => {
  let chance_sum = array.reduce((a, b) => {
    return a + b;
  }, 0);
  return chance_sum;
}
