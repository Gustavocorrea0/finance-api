import axios, { AxiosPromise } from "axios";
import { TransactionsData } from "../interfaces/transactionData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const fetchTransectionById = async (id: string): AxiosPromise<TransactionsData> => {
    const response = axios.get(API_URL + '/search-all-transactions/' + id)
    return response;
}

export function UseTransactionDataWithID(id: string) {
    const query = useQuery({
        queryFn: () => fetchTransectionById(id),
        queryKey: ['transactions-data', id],
        retry: 2
    });

    return {
        ...query,
        data: query.data?.data
    }
}