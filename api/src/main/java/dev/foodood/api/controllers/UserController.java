package dev.foodood.api.controllers;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import dev.foodood.api.entities.User;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.concurrent.ExecutionException;

/**
 * @author Brenden Smith
 *
 * Controller for the User entity
 */
@RestController
@RequestMapping(path="/users")
@Builder
public class UserController {

    @Autowired
    private final Firestore db;

    /**
     * Creates a new user
     *
     * @param unformattedUser User information that has not been formatted through Firebase yet
     * @return The ID of the new user
     */
    @PostMapping(
            produces="text/plain"
    )
    public ResponseEntity<User> create(@RequestBody User.Unformatted unformattedUser) throws ExecutionException, InterruptedException {
        // Precondition: Input user must not be null
        if (unformattedUser == null) return ResponseEntity.badRequest().build();

        // Create a new user in the database
        ApiFuture<DocumentReference> future = db.collection("users").add(new User(unformattedUser));
        return ResponseEntity.created(URI.create(future.get().getId())).build();
    }
}
