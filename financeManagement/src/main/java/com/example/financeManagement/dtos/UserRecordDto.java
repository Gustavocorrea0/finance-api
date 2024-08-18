package com.example.financeManagement.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserRecordDto (@NotNull @NotBlank String nameUser, @NotNull @NotBlank String emailUser,
                             @NotNull @NotBlank String passwordUser) {

}