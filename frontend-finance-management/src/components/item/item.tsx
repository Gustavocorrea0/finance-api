import { useState } from "react";
import "./item.css"
//import { UseTransactionDataWithID } from "../../hooks/useTransactionDataWithID";
import ModalListOneItem from "../modal/listOneItem/listOneItemModal";

interface ItemProps {
    idTransaction?: any,
    description: string,
    value: number,
    date: Date,
    category: string,
    formPayment: string,
    type: string,
    nameUser: string,
    idUser: string
}

export function Item({ idTransaction, description, value, date, category, formPayment, type, nameUser, idUser }: ItemProps) {
    //const { data } = UseTransactionDataWithID(idTransaction);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);

    const handleOpenModal = () => {
        setSelectedItem({
            idTransaction,
            description,
            value,
            date,
            category,
            formPayment,
            type,
            nameUser,
            idUser
        })
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    }

    // ATIVAR DELETAR ARQUIVO 
    return (
        <div className="container">
            <div className="item">
                <div className="description-item">{description}</div>
                <div className="value-item">R$ {value}</div>
                <div className="type-item">{type}</div>
                <button className="btn-check-item" onClick={handleOpenModal}>Verificar</button>
            </div>
            <ModalListOneItem isOpen={isModalOpen} onClose={handleCloseModal} item={selectedItem}/>
        </div>
    );
}