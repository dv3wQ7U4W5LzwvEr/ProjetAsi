package fr.cpe.services;

import model.User;

/**
 * Created by ubuntu on 12/9/16.
 */
public interface MessageSenderLocal {

    public void sendMessage(String message);

    public void sendMessage(User user);
}
