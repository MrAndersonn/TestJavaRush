package com.sprhib.service;

import java.util.List;

import com.sprhib.model.User;

public interface UserService {
	
	public void addUser(User user);
	public void updateUser(User user);
	public User getUser(int id);
	public void deleteUser(int id);
	public List<User> getUsers(int start,int end);

}
