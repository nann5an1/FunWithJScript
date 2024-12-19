// Let's validate some credit cards.

// There are different types of credit cards used today. Each credit card has a credit card number. Your job today will be to check if that number is valid, and if the number is valid, you will have to print what type of credit card it is. A credit card number looks like: 4003600000000014

// Let's first focus on what makes a credit card number valid. An algorithm called Luhn's Algorithm is used. You can determine whether the credit card number is valid using the following steps:

//     Multiply every other digit by 2, starting with the number’s second-to-last digit, and then add those products’ digits together.
//     Add the sum to the sum of the digits that weren’t multiplied by 2.
// If the total’s last digit is 0 (or, put more formally, if the total modulo 10 is congruent to 0), the number is valid!

// For the sake of discussion, let’s first underline every other digit, starting with the number’s second-to-last digit:

// 4003600000000014

// Okay, let’s multiply each of the underlined digits by 2:

// 1•2 + 0•2 + 0•2 + 0•2 + 0•2 + 6•2 + 0•2 + 4•2

// That gives us:

// 2 + 0 + 0 + 0 + 0 + 12 + 0 + 8

// Now let’s add those products’ digits (i.e., not the products themselves) together:

// 2 + 0 + 0 + 0 + 0 + 1 + 2 + 0 + 8 = 13

// Now let’s add that sum (13) to the sum of the digits that weren’t multiplied by 2 (starting from the end):

// 13 + 4 + 0 + 0 + 0 + 0 + 0 + 3 + 0 = 20

// Yup, the last digit in that sum (20) is a 0, so this card is legit!
// Also, American Express uses 15-digit numbers and MasterCard uses 16-digit numbers. Mastercard numbers always start with 5. American Express card numbers start with 34 or 37. Your job is to print AMEX if the card is valid and an American Express card, and to print MASTERCARD if the card is valid and a MasterCard. Print INVALID if the card is not valid.

const digitsProduct = (digitsCheck) => digitsCheck.map(digit => digit * 2);
function digitsCombined(count, digitsProduct){
    let strConcat = "";
    let total = 0;
    for(let i = 0; i < count; i++){
        strConcat += String(digitsProduct[i]);
    }
    for(let i = 0; i < strConcat.length; i++){
        total += Number(strConcat[i]);
    }
    return total;
}

function validateCard(cardNumber) {
    let count = 0;
    let output = "";
    let digitsCheck = [];
    let remainingDigitsTotal = 0;
    let strConvert = String(cardNumber);
    let numOfDigits = strConvert.length;
    for(let i = 0; i < numOfDigits; i+= 2){
        digitsCheck.push(Number(strConvert[i]));
        count++;
    }
    for(let i = 1; i < numOfDigits; i+= 2){
        remainingDigitsTotal += Number(strConvert[i]);
    }
    let evenTotal = digitsCombined(count, digitsProduct(digitsCheck));
    let finalSum = evenTotal + remainingDigitsTotal;
    console.log(finalSum);
    if(finalSum % 10 === 0){
        if(numOfDigits === 15 && strConvert[0] === "3")
            output += "AMEX";
        else if(numOfDigits === 16 && strConvert[0] === "4")
            output += "VISA";
        else if(numOfDigits === 16 && strConvert[0] === "5")
            output += "MASTER";
        else if(numOfDigits === 16 && strConvert[0] === "6")
            output += "DISCOVER";
        else
            output += "VALID";
    }
    else
        output += "INVALID";
    // console.log(output);
}

/*test cases*/
validateCard(5105105105105100); //MASTER
validateCard(6011111111111117); //DISVOVER
validateCard(4111111111111111); //VISA
validateCard(3530111333300000); //others


