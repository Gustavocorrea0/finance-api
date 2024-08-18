import { useEffect, useState } from "react";
import { TransactionsData } from "../../../interfaces/transactionData";
import { useTransactionPost } from "../../../hooks/useTransactionPost";
import "./addItemModal.css";

interface InputProps {
    label: string;
    type?: string;
    value: string | number;
    updateValue(value: any): void;
}

// ATIVAR DADOS DO USUARIO

interface ModalProps {
    closeModal(): void;
}

const Input = ({ label, type = "text", value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input
                type={type}
                value={value}
                onChange={(event) => updateValue(event.target.value)}
                required
            ></input>
        </>
    );
};

export function CreateModalTransaction({ closeModal }: ModalProps) {
    const [description, setDescription] = useState("");
    const [value, setValue] = useState(0);
    const [date, setDate] = useState(new Date());
    const [category, setCategory] = useState("");
    const [formPayment, setFormPayment] = useState("");
    const [type, setType] = useState("");
    const [nameUser, setNameUser] = useState("gustavo");
    const [idUser, setIdUser] = useState("fa563c19-29d2-48fa-a4ab-45938400a222");
    const { mutate, isSuccess, isLoading } = useTransactionPost();

    const formatDateToInput = (date: Date) => {
        const d = date.getDate().toString().padStart(2, "0");
        const m = (date.getMonth() + 1).toString().padStart(2, "0");
        const y = date.getFullYear();
        return `${y}-${m}-${d}`;
    };

    const formatDateToDisplay = (date: Date) => {
        const d = date.getDate().toString().padStart(2, "0");
        const m = (date.getMonth() + 1).toString().padStart(2, "0");
        const y = date.getFullYear();
        return `${d}/${m}/${y}`;
    };

    const formatToBackendDate = (date: Date) => {
        const d = date.getDate().toString().padStart(2, "0");
        const m = (date.getMonth() + 1).toString().padStart(2, "0");
        const y = date.getFullYear();
        return `${y}-${m}-${d}`;
    };

    const handleDateChange = (value: string) => {
        const [year, month, day] = value.split("-");
        setDate(new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
    };

    const submit = () => {
        const transactionsData: TransactionsData = {
            description,
            value,
            date: formatToBackendDate(date), // Formata a data para o backend
            category,
            formPayment,
            type,
            nameUser,
            idUser,
        };

        console.log(description);
        console.log(value);
        console.log(formatToBackendDate(date));
        console.log(category);
        console.log(formPayment);
        console.log(type);
        console.log(nameUser);
        console.log(idUser);

        mutate(transactionsData);
    };

    useEffect(() => {
        if (!isSuccess) {
            return;
        }
        closeModal();
    }, [isSuccess]);

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Adicionar Transação</h2>
                <form className="input-container">
                    <label>Tipo
                        <select className="list-type" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="select">Selecione</option>
                            <option value="entrada">Entrada</option>
                            <option value="saída">Saída</option>
                        </select>
                    </label>
                    <Input label="Descrição" value={description} updateValue={setDescription} />
                    <Input label="Valor" value={value} updateValue={setValue} />
                    <Input label="Data" type="date" value={formatDateToInput(date)} updateValue={handleDateChange} />
                    <label>Categoria
                        <select className="list-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="select">Selecione</option>
                            <option value="salario">Salario (Salario, Renda Extra, etc)</option>
                            <option value="casa">Casa (Agua, Luz, internet, etc)</option>
                            <option value="financiamento">Financiamento (Casa, carro, moto, etc)</option>
                            <option value="lazer">Lazer (Festa, Cinema, Video-games, jogos, Comer fora, etc)</option>
                            <option value="alimentação">Alimentação (Compras)</option>
                            <option value="saúde">Saúde (Medicamentos, internacões, etc)</option>
                            <option value="esportes">Esportes (Futebol, Acadêmia, Ciclismo, Kart, etc)</option>
                            <option value="roupa">Roupa (Calça, camisa, blusa, etc)</option>
                            <option value="sapato">Sapato (Tenis, Chuteira, etc)</option>
                        </select>
                    </label>
                    <Input label="Forma de Pagamento" value={formPayment} updateValue={setFormPayment} />
                </form>
                <button onClick={submit} className="btn-submit">{isLoading ? "Carregando..." : "Confirmar"}</button>
                <button onClick={closeModal} className="btn-close">Cancelar</button>
            </div>
        </div>
    );
}