let str = "";
function pyramid(height) {
    // Write your code below this line
    for(let i = 0; i < height; i++){
        for(let j = 0; j < height - i - 1; j++){
            str += "";
        }
        str += "#";
        console.log(str);
        }
}

pyramid(4);

// function pyramid(height) {
//     // Write your code below this line
//     for(let i = height; i >= 0; i--){
//         for(let j = height -i; j >= 0; j--){
//             str += "#";
//     }
//     console.log(str);
// }
// }

//   #
//  ##
// ###
