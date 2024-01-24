package com.restfull.api.services;

import com.restfull.api.entities.Follow;
import com.restfull.api.entities.User;
import com.restfull.api.repositories.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FollowService {

    @Autowired
    private FollowRepository repository;

    public Follow findByUserIdAndFollowerId(Long userId, Long followerId) {
        return repository.findByUserIdAndFollowerId(userId, followerId);
    }

    public boolean isFollowing(Long userId, Long followerId) {
        return repository.findByUserIdAndFollowerId(userId, followerId) != null;
    }

    public void follow(User user, User follower) {
        Follow follow = new Follow(user, follower);
        repository.save(follow);
    }

    public void unfollow(User user, User follower) {
        Follow follow = repository.findByUserIdAndFollowerId(user.getId(), follower.getId());
        repository.delete(follow);
    }

    public List<User> findAllFollowersByUserId(Long userId) {
        List<Follow> follows = repository.findAllByUserId(userId);
        return follows.stream().map(Follow::getFollower).collect(Collectors.toList());
//        return follows.stream().map(f -> f.getFollower().getEmail()).collect(Collectors.toList());
    }
}
