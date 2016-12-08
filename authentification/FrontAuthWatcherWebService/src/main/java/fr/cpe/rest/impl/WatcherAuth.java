package fr.cpe.rest.impl;

import fr.cpe.rest.IWatcherAuth;
import model.UserResponse;
import model.User;

public class WatcherAuth implements IWatcherAuth {

    @Override
    public UserResponse auth(User userModel) {

        System.out.println(userModel);
        return new UserResponse(userModel.getLogin(), "ADMIN", true);
    }
}
