package com.restfull.api.repositories;

import com.restfull.api.entities.Follow;
import com.restfull.api.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    Optional<Follow> findByFollowerAndFollowed(User follower, User followed);

    List<Follow> findAllByFollower(User follower); // -> find followed

    List<Follow> findAllByFollowed(User followed); // -> find follower

}
