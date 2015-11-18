package com.sprhib.controller;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import com.sprhib.model.User;
import com.sprhib.service.UserService;


@Controller

@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public ModelAndView addTeamPage() {
        ModelAndView modelAndView = new ModelAndView("add-user-form");
        modelAndView.addObject("user", new User());
        return modelAndView;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ModelAndView addingTeam(@ModelAttribute User user) {

        ModelAndView modelAndView = new ModelAndView("home");
        userService.addUser(user);

        String message = "Team was successfully added.";
        modelAndView.addObject("message", message);

        return modelAndView;
    }

    @RequestMapping(value = "/list/{pageNumber}")
    public ModelAndView listOfTeams(@PathVariable Integer pageNumber) {
        ModelAndView modelAndView = new ModelAndView("list-of-users");
        int start =pageNumber*10 ;

        List<User> users = userService.getUsers(start,9);
        modelAndView.addObject("users", users);
        modelAndView.addObject("curentPage",pageNumber);
        return modelAndView;
    }


    @RequestMapping(value = "/edit/{id}", method = RequestMethod.GET)
    public ModelAndView editTeamPage(@PathVariable Integer id) {
        ModelAndView modelAndView = new ModelAndView("edit-user-form");
        User user = userService.getUser(id);
        modelAndView.addObject("user", user);
        return modelAndView;
    }

    @RequestMapping("/search")
    public ModelAndView search( @RequestParam String name) {

        ModelAndView modelAndView = new ModelAndView("list-of-users");

        List<User> list = userService.getUsers(0,1000);
        List<User> users =new ArrayList<>();
        for (User user : list) {
            if (user.getName().equals(name)){
                users.add(user);
            }
        }
        modelAndView.addObject("users", users);

        return modelAndView;
    }


    @RequestMapping(value = "/edit/{id}", method = RequestMethod.POST)
    public ModelAndView edditingTeam(@ModelAttribute User user, @PathVariable Integer id) {

        ModelAndView modelAndView = new ModelAndView("home");

        userService.updateUser(user);

        String message = "Team was successfully edited.";
        modelAndView.addObject("message", message);

        return modelAndView;
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
    public ModelAndView deleteTeam(@PathVariable Integer id) {
        ModelAndView modelAndView = new ModelAndView("home");
        userService.deleteUser(id);
        String message = "Team was successfully deleted.";
        modelAndView.addObject("message", message);
        return modelAndView;
    }


}
