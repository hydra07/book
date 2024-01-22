package com.restfull.api.repositories;

import com.restfull.api.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long>{
    Image findByPath(String path);
}
