package com.restfull.api.repositories;

import com.restfull.api.entities.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

@Repository
public interface TypeRepository extends JpaRepository<Type, Long> {
    Set<Type> findByBooksId(Long id);
    Optional<Type> findByName(String name);


    @Modifying
    @Transactional
    @Query("delete from Type t where t.id = :id")


    void deleteType(@Param("id") Long id);

    @Transactional
    @Modifying
    @Query("delete from Book b where b.id = :typeId")
    void deleteByTypeId(@Param("typeId") Long typeId);


}
