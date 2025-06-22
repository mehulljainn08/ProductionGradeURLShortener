package com.url.shortener.Repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.url.shortener.entity.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByUserName(String username);
}
