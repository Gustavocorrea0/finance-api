import axios, { AxiosPromise } from "axios";
import { TransactionsData } from "../interfaces/transactionData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const postData = async (data: TransactionsData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/add-transaction', data)
    return response;
}

export function useTransactionPost() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 3,
        onSuccess: () => {
            queryClient.invalidateQueries(['transactions-data'])
        }
    });

    return mutate;
    
}