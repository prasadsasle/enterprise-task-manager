package com.prasad.employee_service.dto;

import lombok.Data;

@Data
public class EmployeeDTO {
    private Long id;
    private String name;
    private String email;
    private String position;
}
