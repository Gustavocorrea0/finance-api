import React from 'react';
import './listOneItemModal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRemove: () => void;
    item: ItemProps | null;
}

const ModalListOneItem: React.FC<ModalProps> = ({ isOpen, onClose, onRemove, item }) => {
    if (!isOpen || !item) return null;

    const dateObj = new Date(item.date);

    const day = String(dateObj.getUTCDate()).padStart(2, '0');
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const year = dateObj.getUTCFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Transação</h2>
                <p><strong>Descrição:</strong> {item.description}</p>
                <p><strong>Valor:</strong> R$ {item.value}</p>
                <p><strong>Data:</strong> {formattedDate}</p>
                <p><strong>Categoria:</strong> {item.category}</p>
                <p><strong>Forma de Pagamento:</strong> {item.formPayment}</p>
                <p><strong>Tipo:</strong> {item.type}</p>
                <p><strong>Usuario:</strong> {item.nameUser}</p>
                <button onClick={onRemove} className='btn-remove'>Remover</button>
                <button onClick={onClose} className='btn-close'>Fechar</button>
            </div>
        </div>
    );
};

export default ModalListOneItem;