package com.restfull.api.repositories;

import com.restfull.api.entities.Follow;
import com.restfull.api.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    Follow findByUserIdAndFollowerId(Long userId, Long followerId);
    List<Follow> findAllByUserId(Long userId);

}
