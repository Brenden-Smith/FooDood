package dev.foodood.api.entity;

import com.google.cloud.Timestamp;
import com.google.cloud.firestore.GeoPoint;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {
    private String name;
    private String email;
    private Timestamp birthday;
    private Timestamp createdAt;
    private GeoPoint location;

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Unformatted {
        private String name;
        private String email;
        private Date birthday;
        private Date createdAt;
        private float latitude;
        private float longitude;
    }

    public User(Unformatted unformattedUser) {
        this.name = unformattedUser.getName();
        this.email = unformattedUser.getEmail();
        this.birthday = Timestamp.of(unformattedUser.getBirthday());
        this.createdAt = Timestamp.of(unformattedUser.getCreatedAt());
        this.location = new GeoPoint(unformattedUser.getLatitude(), unformattedUser.getLongitude());
    }
}
