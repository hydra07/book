package com.restfull.api.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "followers", uniqueConstraints = @UniqueConstraint(columnNames = {"follower_id", "followed_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator =
//            "gen_follows_id")
//    @SequenceGenerator(name = "gen_follows_id", sequenceName = "seq_follows_id",
//            allocationSize = 1)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "user_id")
    private User follower;

    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name ="user_id")
    private User followed;


    /**
     * Constructor
     *
     * @param follower người theo dõi
     * @param followed người được theo dõi
     */
    public Follow(User follower, User followed) {
        this.follower = follower;
        this.followed = followed;
    }
}
