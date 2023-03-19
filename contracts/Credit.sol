// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Nft";

contract Credit is Ownable {
    NFT nftContract = NFT(0x2D25aDd15fAB62d8eA20EC83477bB78839F369cb);

    uint256 public totalLoans;

    struct Loan {
        uint256 amount;
        uint256 interestRate;
        uint256 durationInDays;
        uint256 startTimestamp;
        bool paidBack;
        address borrower;
    }

    mapping(uint256 => Loan) public loans;

    event NewLoan(
        uint256 loanId,
        uint256 amount,
        uint256 interestRate,
        uint256 durationInDays,
        uint256 startTimestamp,
        address borrower
    );

    function createLoan(
        uint256 _amount,
        uint256 _interestRate,
        uint256 _durationInDays
    ) public {
        require(_amount > 0, "Amount must be greater than 0");
        require(_interestRate > 0, "Interest rate must be greater than 0");
        require(_durationInDays > 0, "Duration must be greater than 0");

        totalLoans++;

        loans[totalLoans] = Loan({
            amount: _amount,
            interestRate: _interestRate,
            durationInDays: _durationInDays,
            startTimestamp: block.timestamp,
            paidBack: false,
            borrower: msg.sender
        });

        emit NewLoan(
            totalLoans,
            _amount,
            _interestRate,
            _durationInDays,
            block.timestamp,
            msg.sender
        );
    }

    function getLoan(uint256 _loanId) public view returns (Loan memory loan) {
        loan = loans[_loanId];
    }

    function payBackLoan(uint256 _loanId) public payable {
        Loan storage loan = loans[_loanId];
        require(
            msg.sender == loan.borrower,
            "Only the borrower can pay back the loan"
        );
        require(!loan.paidBack, "Loan has already been paid back");
        //require(block.timestamp >= loan.startTimestamp + loan.durationInDays * 1 days, "Loan is not yet due");
        require(
            msg.value ==
                loan.amount + ((loan.amount * loan.interestRate) / 100),
            "Amount sent must be equal to the amount borrowed plus the interest"
        );

        loan.paidBack = true;

        nftContract.makeAnNFT(msg.sender, 4);
    }
}
