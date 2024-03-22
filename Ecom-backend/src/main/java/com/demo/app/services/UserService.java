package com.demo.app.services;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.demo.app.model.Role;
import com.demo.app.model.User;
import com.demo.app.repository.RoleDao;
import com.demo.app.repository.UserDao;

@Service
public class UserService {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private RoleDao roleDao;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

//	public User registerNewUser(User user) {
//		Role role = roleDao.findById("User").get();
//		
//		Set<Role>roles = new HashSet();
//		roles.add(role);
//		user.setRole(roles);
//		
//		user.setUserPassword(getEncodedPassword(user.getUserPassword()));
//		
//		return userDao.save(user);
//	}
	
	
	public void initRolesAndUser() {
		Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role");
        roleDao.save(adminRole);
        
        Role userRole = new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("Default role for newly created record");
        roleDao.save(userRole);
        
        User adminUser = new User();
        adminUser.setUserName("admin123");
        adminUser.setUserPassword(getEncodedPassword("admin@pass"));
        adminUser.setUserFirstName("admin");
        adminUser.setUserLastName("admin");
        
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRole(adminRoles);
        userDao.save(adminUser);
        
	}
	
	public User registerNewUser(User user) {
		
		Role role = roleDao.findById("User").get();
		
		Set<Role> roleSet = new HashSet<>();
		roleSet.add(role);
		user.setRole(roleSet);
		String password = getEncodedPassword(user.getUserPassword());
		user.setUserPassword(password);
		
		return userDao.save(user);
	}
	
	public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
        
//        User user = new User();
//        user.setUserName("raj123");
//        user.setUserPassword(getEncodedPassword("raj@pass"));
//        user.setUserFirstName("raj");
//        user.setUserLastName("sharma");
//        Set<Role> userRoles = new HashSet<>();
//        userRoles.add(userRole);
//        user.setRole(userRoles);
//        userDao.save(user);
        
	
	
	
}
