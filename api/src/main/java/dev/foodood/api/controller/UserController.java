package dev.foodood.api.controller;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import dev.foodood.api.entity.User;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.logging.Logger;

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
     * @param user User information that has not been formatted through Firebase yet
     * @return The ID of the new user
     */
    @PostMapping(
            produces="text/plain"
    )
    public ResponseEntity<String> create(@RequestHeader Map<String, String> headers, @RequestBody User.Unformatted user) throws FirebaseAuthException {
        // Precondition: Must have valid Authorization header
        FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(headers.get("authorization"));
        if (decodedToken == null) return ResponseEntity.status(401).build();

        // Precondition: Input user must not be null
        if (user == null) return ResponseEntity.badRequest().build();

        // Create a new user in the database
        Map<String, Object> docData = new HashMap<>();
        docData.put("name", user.getName());
        docData.put("email", user.getEmail());
        docData.put("birthday", user.getBirthday());
        docData.put("createdAt", user.getCreatedAt());
        docData.put("latitude", user.getLatitude());
        docData.put("longitude", user.getLongitude());
        ApiFuture<WriteResult> future = db.collection("users").document(decodedToken.getUid()).set(docData);

        // Return the ID of the new user
        return ResponseEntity.status(201).body("Created user with ID: " + decodedToken.getUid());
    }
}
