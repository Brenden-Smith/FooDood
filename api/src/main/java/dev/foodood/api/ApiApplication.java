package dev.foodood.api;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.IOException;
import java.io.InputStream;

/**
 * @author Brenden Smith
 * <p>
 * Initializes the Spring Boot application.
 */
@SpringBootApplication
public class ApiApplication {

    /**
     * Starts the Spring Boot application.
     *
     * @param args Command line arguments.
     */
    public static void main(String[] args) {

        SpringApplication.run(ApiApplication.class, args);
    }

    /**
     * Initializes the Firebase application
     */
    public static void initializeFirebase() throws IOException {
        InputStream serviceAccount = ApiApplication.class
                .getClassLoader()
                .getResourceAsStream("static/serviceAccount.json");
        assert serviceAccount != null;
        GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(credentials)
                .build();
        FirebaseApp.initializeApp(options);
    }


    /**
     * Gets the Firestore database.
     *
     * @return Firestore object
     */
    @Bean
    public static Firestore getFirestore() throws IOException {
        if (FirebaseApp.getApps().isEmpty()) initializeFirebase();
        return FirestoreClient.getFirestore();
    }

}
