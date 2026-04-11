package com.prasad.task_service.service;

import com.prasad.task_service.dto.TaskDTO;
import com.prasad.task_service.entity.Task;

import java.util.List;

public interface TaskService {
    List<TaskDTO> getAllTasks();
    TaskDTO getTaskById(Long id);
    TaskDTO createTask(TaskDTO taskDTO);
    TaskDTO updateTask(Long id, TaskDTO taskDTO);
    void deleteTask(Long id);
}
