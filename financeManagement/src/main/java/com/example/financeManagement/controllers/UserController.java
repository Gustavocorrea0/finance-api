package com.example.financeManagement.controllers;

import com.example.financeManagement.dtos.UserRecordDto;
import com.example.financeManagement.models.UserModel;
import com.example.financeManagement.repositories.UserRepository;
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

@RestController
public class UserController {
    @Autowired
    UserRepository userRepository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/add-user")
    public ResponseEntity<UserModel> saveNewUser(@RequestBody @Valid UserRecordDto userRecordDto) {
        var userModel = new UserModel();
        BeanUtils.copyProperties(userRecordDto, userModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(userRepository.save(userModel));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/search-users")
    public ResponseEntity<List<UserModel>> getAllUsers() {
        List<UserModel> userList = userRepository.findAll();
        if (!userList.isEmpty()) {
            for (UserModel userModel: userList) {
                UUID id = userModel.getIdUser();
                userModel.add(linkTo(methodOn(UserController.class).getOneUser(id)).withSelfRel());
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(userList);
    }

    @GetMapping("/search-one-user/{id}")
    public ResponseEntity<Object> getOneUser(@PathVariable(value = "id") UUID id) {
        Optional<UserModel> userSearch = userRepository.findById(id);
        if (userSearch.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Found");
        }
        userSearch.get().add(linkTo(methodOn(UserController.class).getAllUsers()).withRel("Users List"));
        return ResponseEntity.status(HttpStatus.OK).body(userSearch.get());
    }

    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable(value = "id") UUID id) {
        Optional<UserModel> userModel = userRepository.findById(id);
        if (userModel.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        userRepository.delete(userModel.get());
        return ResponseEntity.status(HttpStatus.OK).body("User remove with successfully");
    }

}
