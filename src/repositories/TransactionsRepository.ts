import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balanceFn = (accumulator: Balance, current: Transaction): Balance => {
      switch (current.type) {
        case 'income':
          accumulator.income += current.value;
          break;
        case 'outcome':
          accumulator.outcome += current.value;
          break;
        default:
          break;
      }

      return accumulator;
    };

    const { income, outcome } = this.transactions.reduce(balanceFn, {
      income: 0,
      outcome: 0,
      total: 0,
    });

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
