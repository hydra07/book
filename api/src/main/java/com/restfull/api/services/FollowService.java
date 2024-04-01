package com.restfull.api.services;

import com.restfull.api.entities.Follow;
import com.restfull.api.entities.User;
import com.restfull.api.repositories.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
/**
 * follower người theo dõi,
 * followed người được theo dõi
 */
@Service
public class FollowService {

    @Autowired
    private FollowRepository repository;

    public void follow(User follower, User followed) {
        Follow follow = new Follow(follower, followed);
        repository.save(follow);
    }
    public void unfollow(User follower, User followed) {
        Follow follow = repository.findByFollowerAndFollowed(follower, followed).orElseThrow();
        repository.delete(follow);
    }
    public boolean isFollowing(User follower, User followed) {
        Optional<Follow> follow = repository.findByFollowerAndFollowed(follower, followed);
        return follow.isPresent();
    }
    public List<Follow> getFollowers(User followed) {
        return repository.findAllByFollowed(followed);
    }

    public List<Follow> getFollowing(User follower) {
        return repository.findAllByFollower(follower);
    }

}
