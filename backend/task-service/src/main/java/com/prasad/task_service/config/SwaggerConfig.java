package com.prasad.task_service.config;
 
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
 
@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Enterprise Task Manager - Task Service")
                .version("1.0.0")
                .description("Task Management API with Role-Based Access Control")
                .contact(new Contact().name("Prasad").email("prasad@example.com")));
    }
}
