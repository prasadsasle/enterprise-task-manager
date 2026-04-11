package com.prasad.task_service.controller;
 
import com.prasad.task_service.dto.TaskDTO;
import com.prasad.task_service.entity.Task;
import com.prasad.task_service.entity.TaskStatus;
import com.prasad.task_service.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import java.util.List;
 
@RestController
@RequestMapping("/tasks")
public class TaskController {
 
    @Autowired
    private TaskService taskService;
 
    // Get all tasks
    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }
 
    // Get task by ID
    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }
 
    // Create task
    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@RequestBody TaskDTO taskDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTask(taskDTO));
    }
 
    // Update task
    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long id, @RequestBody TaskDTO taskDTO) {
        return ResponseEntity.ok(taskService.updateTask(id, taskDTO));
    }
 
    // Delete task - ADMIN only (enforced in SecurityConfig)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
 
    // Paginated task list
    @GetMapping("/paginated")
    public ResponseEntity<Page<TaskDTO>> getTasksPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return ResponseEntity.ok(taskService.getTasksPaginated(pageable));
    }
 
    // Filter tasks by status
    @GetMapping("/filter")
    public ResponseEntity<List<TaskDTO>> getTasksByStatus(@RequestParam TaskStatus status) {
        return ResponseEntity.ok(taskService.getTasksByStatus(status));
    }
 
    // Get tasks by employee
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<TaskDTO>> getTasksByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(taskService.getTasksByEmployeeId(employeeId));
    }
}
