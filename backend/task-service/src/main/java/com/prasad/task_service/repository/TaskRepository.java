package com.prasad.task_service.repository;
 
import com.prasad.task_service.entity.Task;
import com.prasad.task_service.entity.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import java.util.List;
 
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByStatus(TaskStatus status);
    List<Task> findByEmployeeId(Long employeeId);
    Page<Task> findAll(Pageable pageable);
}
