import config from '../config/config';
import { GET_TRANSACTIONS, GET_WALLET, SETUP_API, TRANSACTION } from '../config/constants';

const { walletBaseUri: BASE_URI } = config;

export type TransactionType = 'CREDIT' | 'DEBIT';

const post = async (url: string, body: unknown) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : String(err));
  }
}

const get = async (url: string) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : String(err));
  }
}

export type SetupWalletBody = {
  balance: number;
  name: string;
}

export type SetupWalletResponse = {
  balance: number;
  date: string;
  id: string;
  name: string;
  transactionId: string;
};

export const setupWallet = (body: SetupWalletBody): Promise<SetupWalletResponse> => {
  const url = `${BASE_URI}${SETUP_API}`;
  console.log('Setting up wallet with URL:', url);
  return post(url, body);
}

export type StartTransactionBody = {
  amount: number;
  description: TransactionType;
}

export const startTransactions = (walletId: string, body: StartTransactionBody) => {
  const url = `${BASE_URI}${TRANSACTION}/${walletId}`;
  return post(url, body);
}

export type GetWalletResponse = {
  balance: number;
  date: string;
  id: string;
  name: string;
  _id: string;
  __v: number;
}

export const getWallet = (walletId: string): Promise<GetWalletResponse> => {
  const url = `${BASE_URI}${GET_WALLET}/${walletId}`;
  return get(url);
}

type OptionsProps = {
  limit?: number;
  skip?: number;
  sortByDate?: 'asc' | 'desc';
  sortByAmount?: 'asc' | 'desc';
}

export type GetTransactionsResponse = {
  amount: number;
  balance: number;
  date: string;
  description: string;
  id: string;
  type: TransactionType;
  walletId: string;
  _id: string;
  __v: number;
}

export const getTransactions = (walletId: string, { limit, skip, sortByDate, sortByAmount }: OptionsProps = {}): Promise<GetTransactionsResponse[]> => {
  let url = `${BASE_URI}${GET_TRANSACTIONS}?walletId=${walletId}`;
  url = limit ? `${url}&limit=${limit}` : url;
  url = skip ? `${url}&skip=${skip}` : url;
  url = sortByDate ? `${url}&sortByDate=${sortByDate}` : url;
  url = sortByAmount ? `${url}&sortByAmount=${sortByAmount}` : url;
  return get(url);
}
