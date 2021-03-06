package fr.cpe.model;

import java.io.Serializable;

public class AuthModel implements Serializable {

    private String login;
    private String role;
    private boolean validAuth;

    public AuthModel() {
    }

    public AuthModel(String login, String role, boolean validAuth) {
        this.login = login;
        this.role = role;
        this.validAuth = validAuth;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isValidAuth() {
        return validAuth;
    }

    public void setValidAuth(boolean validAuth) {
        this.validAuth = validAuth;
    }
}
