package com.prasad.task_service.service;

import com.prasad.task_service.dto.TaskDTO;
import com.prasad.task_service.entity.Task;
import com.prasad.task_service.entity.TaskStatus;
import com.prasad.task_service.exception.TaskNotFoundException;
import com.prasad.task_service.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TaskDTO getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
        return convertToDTO(task);
    }

    @Override
    public TaskDTO createTask(TaskDTO taskDTO) {
        Task task = convertToEntity(taskDTO);
        Task savedTask = taskRepository.save(task);
        return convertToDTO(savedTask);
    }

    @Override
    public TaskDTO updateTask(Long id, TaskDTO taskDTO) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        existingTask.setTitle(taskDTO.getTitle());
        existingTask.setDescription(taskDTO.getDescription());
        existingTask.setStatus(taskDTO.getStatus());
        existingTask.setDueDate(taskDTO.getDueDate());
        existingTask.setEmployeeId(taskDTO.getEmployeeId());

        Task updatedTask = taskRepository.save(existingTask);
        return convertToDTO(updatedTask);
    }

    @Override
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new TaskNotFoundException(id);
        }
        taskRepository.deleteById(id);
    }

    private TaskDTO convertToDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus());
        dto.setDueDate(task.getDueDate());
        dto.setEmployeeId(task.getEmployeeId());
        return dto;
    }

    private Task convertToEntity(TaskDTO dto) {
        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setStatus(dto.getStatus() != null ? dto.getStatus() : TaskStatus.TODO);
        task.setDueDate(dto.getDueDate());
        task.setEmployeeId(dto.getEmployeeId());
        return task;
    }
}
