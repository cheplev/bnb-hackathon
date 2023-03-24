// pragma solidity ^0.8.0;

// contract LoanCalculator {
//     uint maxSum = 100 ether; // maximum loan amount
//     uint interestRate; // interest rate
    
//     function calculateLoanAmount(uint rating) public view returns (uint loanAmount) {
//         if (rating >= 0 && rating <= 2) {
//             loanAmount = 0;
//         } else if (rating > 2 && rating <= 4) {
//             loanAmount = maxSum / 2;
//         } else if (rating > 4 && rating <= 5) {
//             loanAmount = maxSum;
//         } else {
//             revert("Invalid rating");
//         }
//     }
    
//     function calculateInterestRate(uint rating) public view returns (uint) {
//         if (rating >= 0 && rating <= 2) {
//             revert("Low rating");
//         } else if (rating > 2 && rating <= 4) {
//             interestRate = 20;
//         } else if (rating > 4 && rating <= 5) {
//             interestRate = 10;
//         } else {
//             revert("Invalid rating");
//         }
        
//         return interestRate;
//     }
// }
