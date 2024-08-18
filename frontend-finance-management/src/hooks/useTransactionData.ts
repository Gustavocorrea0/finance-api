import axios, { AxiosPromise } from "axios";
import { TransactionsData } from "../interfaces/transactionData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const fetchData = async (): AxiosPromise<TransactionsData[]> => {
    const response = axios.get(API_URL + '/search-all-transactions')
    return response;
}

export function useTransactionData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['transactions-data'],
        retry: 2
    });

    return {
        ...query,
        data: query.data?.data
    }
}