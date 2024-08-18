import { useState } from 'react';
import './App.css'
import { Item } from './components/item/item';
import { useTransactionData } from './hooks/useTransactionData'
import { CreateModalTransaction } from './components/modal/addItem/addItemModal';

function App() {
  const { data } = useTransactionData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
  }

  return (
    <div className='container'>

      <div className='black-block'>
        <h1>AGC - Finance</h1>
      </div>

      <div className='revenues-block'><h3>Entradas</h3></div>
      <div className='expenses-block'><h3>Saidas</h3></div>
      <div className='balance-block'><h3>Saldo</h3></div>

      <div className='item-grid'>

        <div className="header-item">
          <div className="description-item"><h4>Descricao</h4></div>
          <div className="value-item"><h4>Valor</h4></div>
          <div className="type-item"><h4>Tipo</h4></div>
        </div>

        <div className='item-grid-2'>
          {data?.map(transactionData =>
            <Item
              key={transactionData.idTransaction}
              description={transactionData.description}
              value={transactionData.value}
              date={transactionData.date}
              category={transactionData.category}
              formPayment={transactionData.formPayment}
              type={transactionData.type}
              nameUser={transactionData.nameUser}
              idUser={transactionData.idUser}
            />
          )}
        </div>
      </div>
      {isModalOpen && <CreateModalTransaction closeModal={handleOpenModal}/>}
      <button className='btn-add' onClick={handleOpenModal}>+</button>
      <div className='end-screean'></div>
    </div>
  )
}

export default App
