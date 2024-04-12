package com.restfull.api.repositories;

import com.restfull.api.entities.Bookmark;
import com.restfull.api.entities.Highlight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HighlightRepository extends JpaRepository<Highlight, Long> {
    Optional<Highlight> findById(long id);
}
