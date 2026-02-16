package com.fitweek.backend.repository;

import com.fitweek.backend.domain.entities.SetLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SetLogRepository extends JpaRepository<SetLog,Long> {
//    cascading effect takes care of all the
}
