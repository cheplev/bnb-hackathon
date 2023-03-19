const LoanCalculator = artifacts.require('LoanCalculator');

contract('LoanCalculator', function(accounts) {
  let loanCalculator;

  beforeEach(async function() {
    loanCalculator = await LoanCalculator.new({ from: accounts[0] });
  });

  it('should calculate the loan amount correctly for rating between 0 and 2', async function() {
    const rating = 1;
    const loanAmount = await loanCalculator.calculateLoanAmount(rating);
    assert.equal(loanAmount, 0, "Loan amount not calculated correctly for rating between 0 and 2");
  });

  it('should calculate the loan amount correctly for rating between 2 and 4', async function() {
    const rating = 3;
    const loanAmount = await loanCalculator.calculateLoanAmount(rating);
    assert.equal(loanAmount, 50 * 10 ** 18, "Loan amount not calculated correctly for rating between 2 and 4");
  });

  it('should calculate the loan amount correctly for rating between 4 and 5', async function() {
    const rating = 4.5;
    const loanAmount = await loanCalculator.calculateLoanAmount(rating);
    assert.equal(loanAmount, 100 * 10 ** 18, "Loan amount not calculated correctly for rating between 4 and 5");
  });

  it('should revert if rating is less than 0', async function() {
    const rating = -1;
    await expectRevert(loanCalculator.calculateLoanAmount(rating), "Invalid rating");
  });

  it('should revert if rating is greater than 5', async function() {
    const rating = 6;
    await expectRevert(loanCalculator.calculateLoanAmount(rating), "Invalid rating");
  });

  it('should calculate the interest rate correctly for rating between 0 and 2', async function() {
    const rating = 1;
    const interestRate = await loanCalculator.calculateInterestRate(rating);
    assert.equal(interestRate, 0, "Interest rate not calculated correctly for rating between 0 and 2");
  });

  it('should calculate the interest rate correctly for rating between 2 and 4', async function() {
    const rating = 3;
    const interestRate = await loanCalculator.calculateInterestRate(rating);
    assert.equal(interestRate, 20, "Interest rate not calculated correctly for rating between 2 and 4");
  });

  it('should calculate the interest rate correctly for rating between 4 and 5', async function() {
    const rating = 4.5;
    const interestRate = await loanCalculator.calculateInterestRate(rating);
    assert.equal(interestRate, 10, "Interest rate not calculated correctly for rating between 4 and 5");
  });

  it('should revert if rating is less than 0 when calculating interest rate', async function() {
    const rating = -1;
    await expectRevert(loanCalculator.calculateInterestRate(rating), "Invalid rating");
  });

  it('should revert if rating is greater than 5 when calculating interest rate', async function() {
    const rating = 6;
    await expectRevert(loanCalculator.calculateInterestRate(rating), "Invalid rating");
  });
});
