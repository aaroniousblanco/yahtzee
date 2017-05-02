var array = [2, 2, 2, 2, 2];


upperSectionScoringChecker = (die_numeric_value, array) => {
  let sorted_array = array.sort((a, b) => {
    return a - b;
  });
  let filtered_array = sorted_array.filter((number) =>
    number === die_numeric_value
  );
  return filtered_array.length * die_numeric_value;
}

largeStraightScoringChecker = (array) => {
  let sorted_array = array.sort((a, b) => {
    return a - b;
  });
  if (sorted_array[0] === 1 && sorted_array[1] === 2 && sorted_array[2] === 3 && sorted_array[3] === 4 && sorted_array[4] === 5) {
    return 40;
  }
  else if (sorted_array[0] === 2 && sorted_array[1] === 3 && sorted_array[2] === 4 && sorted_array[3] === 5 && sorted_array[4] === 6) {
    return 40;
  }
  else {
    return 0;
  }
}

smallStraightScoringChecker = (array) => {
  let sorted_array = array.sort((a, b) => {
    return a - b;
  });
  let filtered_array = sorted_array.filter(function(item, position, arr) { //removes duplicate values from sorted_array
    return !position || item != arr[position - 1];
  });
  if (filtered_array[0] === 1 && filtered_array[1] === 2 && filtered_array[2] === 3 && filtered_array[3] === 4) {
    return 30;
  }
  else if (filtered_array[0] === 2 && filtered_array[1] === 3 && filtered_array[2] === 4 && filtered_array[3] === 5) {
    return 30;
  }
  else if (filtered_array[0] === 3 && filtered_array[1] === 4 && filtered_array[2] === 5 && filtered_array[3] === 6) {
    return 30;
  }
  else if (filtered_array[1] === 1 && filtered_array[2] === 2 && filtered_array[3] === 3 && filtered_array[4] === 4) {
    return 30;
  }
  else if (filtered_array[1] === 2 && filtered_array[2] === 3 && filtered_array[3] === 4 && filtered_array[4] === 5) {
    return 30;
  }
  else if (filtered_array[1] === 3 && filtered_array[2] === 4 && filtered_array[3] === 5 && filtered_array[4] === 6) {
    return 30;
  }
  else {
    return 0;
  }
}

fullHouseScoringChecker = (array) => {
  let sorted_array = array.sort((a, b) => {
    return a - b;
  });
  if (sorted_array[0] === sorted_array[1] && sorted_array[2] === sorted_array[4] && sorted_array[0] !== sorted_array[2]) {
    return 25;
  }
  else if (sorted_array[0] === sorted_array[2] && sorted_array[3] === sorted_array[4] && sorted_array[0] !== sorted_array[3]) {
    return 25;
  }
  else {
    return 0;
  }
}

yahtzeeScoringChecker = (array) => {
  let sorted_array = array.sort((a, b) => {
    return a - b;
  });
  if (sorted_array[0] === sorted_array[4]) {
    return sorted_array[0] * 5;
  }
  else {
    return 0;
  }
}

console.log(yahtzeeScoringChecker(array));

chanceScoringChecker = (array) => {
  let chance_sum = array.reduce((a, b) => {
    return a + b;
  }, 0);
  return chance_sum;
}
