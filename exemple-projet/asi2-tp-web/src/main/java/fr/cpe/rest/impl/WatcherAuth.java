package fr.cpe.rest.impl;

import fr.cpe.model.User;
import fr.cpe.model.UserResponse;
import fr.cpe.rest.IWatcherAuth;

public class WatcherAuth implements IWatcherAuth {

    @Override
    public UserResponse auth(User userModel) {

        System.out.println(userModel);
        return new UserResponse(userModel.getLogin(), "ADMIN", true);
    }
}
