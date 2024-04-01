package com.restfull.api.repositories;

import com.restfull.api.entities.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface TypeRepository extends JpaRepository<Type, Long> {
    Set<Type> findByBooksId(Long id);
    Optional<Type> findByName(String name);
}
