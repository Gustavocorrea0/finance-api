package com.example.financeManagement.controllers;

import com.example.financeManagement.dtos.TransactionRecordDto;
import com.example.financeManagement.models.TransactionModel;
import com.example.financeManagement.repositories.TransactionRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

/*
*   Saidas | Gastos
*   Entradas | Receitas
*/

@RestController
public class TransactionController {
    @Autowired
    TransactionRepository transactionRepository;

    @PostMapping("/add-transaction")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<TransactionModel> saveNewTransactions(@RequestBody @Valid TransactionRecordDto transactionRecordDto){
        var transactionModel = new TransactionModel();
        BeanUtils.copyProperties(transactionRecordDto, transactionModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(transactionRepository.save(transactionModel));
    }

    @GetMapping("/search-one-transaction/{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<Object> getOneTransaction(@PathVariable(value = "id") UUID id){
        Optional<TransactionModel> transactionSearch = transactionRepository.findById(id);
        if (transactionSearch.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Expanse not found");
        }
        transactionSearch.get().add(linkTo(methodOn(TransactionController.class).getAllTransaction()).withRel("Expenses List"));
        return ResponseEntity.status(HttpStatus.OK).body(transactionSearch.get());
    }

    @GetMapping("/search-all-transactions")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<List<TransactionModel>> getAllTransaction() {
        List<TransactionModel> transactionList = transactionRepository.findAll();
        if(!transactionList.isEmpty()){
            for (TransactionModel transactionModel : transactionList){
                UUID id = transactionModel.getIdTransaction();
                transactionModel.add(linkTo(methodOn(TransactionController.class).getOneTransaction(id)).withSelfRel());
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(transactionList);
    }

    @DeleteMapping("/delete-transaction/{id}")
    public ResponseEntity<Object> deleteTransactions(@PathVariable(value = "id") UUID id){
        Optional<TransactionModel> transactionsModel = transactionRepository.findById(id);
        if(transactionsModel.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Transaction Not Found");
        }
        transactionRepository.delete(transactionsModel.get());
        return ResponseEntity.status(HttpStatus.OK).body("Transaction remove with successfully");
    }
}