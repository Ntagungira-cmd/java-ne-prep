package rw.rca.ntagungira.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import rw.rca.ntagungira.Models.User;
import rw.rca.ntagungira.Pojos.Response.MessageResponse;
import rw.rca.ntagungira.Enums.ERole;
import rw.rca.ntagungira.Models.Role;
import rw.rca.ntagungira.Pojos.Request.SignupRequest;
import rw.rca.ntagungira.Repositories.RoleRepository;
import rw.rca.ntagungira.Repositories.UserRepository;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder encoder;

    @Autowired
    RoleRepository roleRepository;

    public MessageResponse createUser(SignupRequest signUpRequest){
        if (userRepository.existsByUsername(signUpRequest.getEmail())) {
            return new MessageResponse(HttpStatus.ALREADY_REPORTED,"Error: Email is already taken!");
        }

        // Create new user's account
        User user = new User(signUpRequest.getName(),
                signUpRequest.getEmail(),
                signUpRequest.getPhone(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        //assign roles to users
        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER).orElse(
                    roleRepository.save( new Role(ERole.ROLE_USER))
            );
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                if ("admin".equals(role)) {
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(adminRole);
                } else if("user".equals(role)) {
                    Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(userRole);
                }else{
                    throw new RuntimeException("Error: Role is not found.");
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return new MessageResponse(HttpStatus.CREATED,"User registered successfully!");
    }
}
