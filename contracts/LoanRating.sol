pragma solidity ^0.8.0;

contract LoanRating {
    // Define the payment struct to store payment information
    struct Payment {
        uint256 amount;
        uint256 dueTimestamp;
        uint256 paidTimestamp;
    }

    // Define the borrower struct to store borrower information
    struct Borrower {
        Payment[] payments;
    }

    // Define the borrower mapping to store borrower data by address
    mapping(address => Borrower) borrowers;

    // Define the function to add a payment for a borrower
    function addPayment(uint256 amount, uint256 dueTimestamp) public {
        Payment memory payment = Payment(amount, dueTimestamp, 0);
        borrowers[msg.sender].payments.push(payment);
    }

    // Define the function to update a payment as paid for a borrower
    function updatePayment(uint256 index) public {
        borrowers[msg.sender].payments[index].paidTimestamp = block.timestamp;
    }

    // Define the function to calculate the borrower rating
    function getBorrowerRating(
        address borrowerAddress
    ) public view returns (uint256) {
        uint256 missedOrDelayedPayments = 0;
        uint256 totalPayments = borrowers[borrowerAddress].payments.length;
        uint256 paymentTimestampSum = 0;

        for (uint256 i = 0; i < totalPayments; i++) {
            Payment memory payment = borrowers[borrowerAddress].payments[i];

            if (
                payment.paidTimestamp == 0 &&
                payment.dueTimestamp < block.timestamp
            ) {
                missedOrDelayedPayments++;
            } else {
                paymentTimestampSum +=
                    payment.paidTimestamp -
                    payment.dueTimestamp;
            }
        }

        if (totalPayments == 0) {
            return 0;
        } else {
            uint256 averagePaymentDelay = paymentTimestampSum / totalPayments;
            uint256 missedOrDelayedPercentage = (missedOrDelayedPayments *
                100) / totalPayments;
            uint256 borrowerRating = ((100 - missedOrDelayedPercentage) *
                averagePaymentDelay) / 2592000; // 2592000 seconds = 1 month
            if (borrowerRating > 500) {
                borrowerRating = 500;
            }
            return borrowerRating;
        }
    }
}
