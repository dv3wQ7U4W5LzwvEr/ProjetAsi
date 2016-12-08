package fr.cpe.rest.impl;

import fr.cpe.dao.UserDao;
import fr.cpe.model.User;
import fr.cpe.rest.IUserRestService;

import javax.ejb.EJB;
import java.util.List;

public class UserRestServiceImpl implements IUserRestService {

    @EJB
    UserDao userDao;

    @Override
    public List<User> listUser(String login) {
        if (login != null) {
            return userDao.getUserByLogin(login);
        }
        return userDao.listUser();
    }

    @Override
    public User getUserById(int id) {
        return userDao.getUserById(id);
    }

    @Override
    public void addUser(User user) {
        userDao.save(user);
    }
}
