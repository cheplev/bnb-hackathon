const LoanRating = artifacts.require("LoanRating");

contract("LoanRating", (accounts) => {
  let loanRating;

  beforeEach(async () => {
    loanRating = await LoanRating.new({ from: accounts[0] });
  });

  it("should add a payment for a borrower", async () => {
    await loanRating.addPayment(1000, Date.now() + 86400000, { from: accounts[0] });
    const borrower = await loanRating.borrowers(accounts[0]);
    assert.equal(borrower.payments.length, 1);
    assert.equal(borrower.payments[0].amount, 1000);
  });

  it("should update a payment as paid for a borrower", async () => {
    await loanRating.addPayment(1000, Date.now() + 86400000, { from: accounts[0] });
    await loanRating.updatePayment(0, { from: accounts[0] });
    const borrower = await loanRating.borrowers(accounts[0]);
    assert.equal(borrower.payments[0].paidTimestamp > 0, true);
  });

  it("should calculate the borrower rating", async () => {
    await loanRating.addPayment(1000, Date.now() - 86400000, { from: accounts[0] });
    await loanRating.addPayment(1000, Date.now() + 86400000, { from: accounts[0] });
    await loanRating.updatePayment(0, { from: accounts[0] });
    const borrowerRating = await loanRating.getBorrowerRating(accounts[0]);
    assert.equal(borrowerRating > 0, true);
    assert.equal(borrowerRating <= 500, true);
  });
});
