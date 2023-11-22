function RMR(weight, height, age, gender){
    if (gender === "m") {
        gender = 5;
    } else if (gender === "f") {
        gender = -161;
    }

    var rmr = 10 * weight + 6.25 * height - 5 * age + gender;
    return rmr
}
function Calories(rmr, activityLevel){
    if (activityLevel === "1") {
        activityLevel = 1.2;
    } else if (activityLevel === "2") {
        activityLevel = 1.375;
    } else if (activityLevel === "3") {
        activityLevel = 1.55;
    } else if (activityLevel === "4") {
        activityLevel = 1.725;
    } else if (activityLevel === "5") {
        activityLevel = 1.9;
    }
    return activityLevel * rmr;
}
//To lose weight consume fewer calories then what Calories return
//To gain weight consume more calories then what Calories return
//To keep weight consume the same calories then what Calories return
