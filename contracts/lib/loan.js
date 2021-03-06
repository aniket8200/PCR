'use strict';

// Utility class for ledger state
const State = require('./../ledger-api/state.js');

const loanState = {
	PENDING: 0,
	ONGOING: 1,
	FINISHED: 2
};

class Installment {
	constructor(amount, date, lateTime) {
		this.amount = amount;
		this.date = date;
		this.lateTime = lateTime;
	}

	getAmount() {
		return this.amount;
	}

	getDate() {
		return this.date;
	}

	getLateTime() {
		return this.lateTime;
	}
}

/**
 * Loan:
 * Borrower's Identity: x509 certificate
 * Lender's Identity: x509 certificate
 * Loan Amount: double/int
 * Asset of borrower :[] of assets
 * interest: double
 * Installments: [] of installments
 * Current Remaining Amount ( After interest )
 * Last installment date: Data
 * Next installment date: Data
 * Next installment amount: double/int
 * state: {PENDING, FINISHED, ONGOING}
 */

class Loan extends State {
	constructor(obj) {
		super(Loan.getClass(), [obj.lenderIdentity, obj.borrowerIdentity, obj.loanCreationTime]);
		Object.asign(this, obj);
	}
    
    /**
     * Basic getters and setters
    */
    // getLoanId() {
    // 	return this.loanId;
    // }

    getLoanCreationTime(){
    	return this.loanCreationTime;
    }

    getBorrowerIdentity() {
    	return this.borrowerIdentity;
    }
	
    getLenderIdentity() {
    	return this.lenderIdentity;
    }

    getAmount() {
    	return this.amount;
    }

	getAssets() {
		return this.assets;
	}

	getInterest() {
		return this.interest;
	}

	getInstallments() {
		this.installments;
	}

	getRemainingAmount() {
		return this.remainingAmount;
	}

	setRemainingAmount(remainingAmount) {
		this.remainingAmount = remainingAmount;
	}

	getLastInstallmentDate() {
		return this.lastInstallmentDate;
	}

	setLastInstallmentDate() {
		this.lastInstallmentDate = lastInstallmentDate;
	}

	getNextInstallmentDate() {
		return this.nextInstallmentDate;
	}

	setNextInstallmentDate(nextInstallmentDate) {
		this.nextInstallmentDate = nextInstallmentDate;
	}

	getNextInstallmentAmount() {
		return this.nextInstallmentAmount;
	}

	setNextInstallmentAmount(nextInstallmentAmount) {
		this.nextInstallmentAmount = nextInstallmentAmount;
	}

	getState() {
		return this.state;
	}

	setState(state) {
		this.state = state;
	}

	/**
     * Useful methods to encapsulate commercial paper states
     */
	addInstallment(amountPaid) {
		var curDate = Date(Date.now())
		var installment = new Installment(amountPaid, curDate, curDate - this.getNextInstallmentDate);
		this.installments.push(installment);
	}

    /**
     * Deserialize a state data to commercial paper
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, Loan);
    }

    /**
     * Factory method to create a commercial paper object
     */
    static createInstance(borrowerIdentity, lenderIdentity, amount, assets, interest, lastInstallmentDate, nextInstallmentDate, nextInstallmentAmount) {
		let loanCreationTime = Date(Date.now());
		var installmentList = [];
		var loanst = loanState.PENDING;
        return new Loan({ borrowerIdentity, lenderIdentity, loanCreationTime, amount, assets, interest, installmentList, amount, interest, lastInstallmentDate, nextInstallmentDate ,nextInstallmentAmount, loanst });
    }

    static getClass() {
        return 'Loan';
    }
}

module.exports = Loan;
