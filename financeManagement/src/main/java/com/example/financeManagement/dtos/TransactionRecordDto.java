package com.example.financeManagement.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.Date;

public record TransactionRecordDto(@NotNull @NotBlank String description, @NotNull BigDecimal value,
                                   @NotNull Date date, @NotNull @NotBlank String category,
                                   @NotNull @NotBlank String formPayment, @NotNull @NotBlank String type,
                                   @NotNull @NotBlank String nameUser, @NotNull @NotBlank String idUser) {
}
