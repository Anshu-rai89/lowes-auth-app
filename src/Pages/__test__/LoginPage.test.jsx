import React from 'react';
import LoginPage from "../LoginPage";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { screen, render, fireEvent } from "@testing-library/react";
import { login } from '../../app/features/auth/authSlice';
import '@testing-library/jest-dom';

jest.mock("react-router" , () => ({
    useNavigate: jest.fn()
}))

jest.mock("react-redux", ()=> ({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}))

jest.mock("../../app/features/auth/authSlice", ()=> ({
    login: jest.fn()
}))


describe("Login Page" , ()=> {
    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(()=> {
        useDispatch.mockReturnValue(mockDispatch);
        useNavigate.mockReturnValue(mockNavigate);
        useSelector.mockImplementation(callback => callback({
            auth: {user: null}
        }))
    })

    afterEach(()=> {
        jest.clearAllMocks()
    })


    test("Renders Login Form" , () => {
        render(<LoginPage />)
        expect(screen.getByLabelText(/UserName/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    })

    test("Dispatch when login click", () => {
        const thunk = jest.fn();
        login.mockReturnValue(thunk);
        render(<LoginPage />)
        const userNameInput = screen.getByLabelText(/UserName/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const loginButton = screen.getByRole('button', {name: /login/i});

        fireEvent.change(userNameInput, {target: {value: "anshu"}})
        fireEvent.change(passwordInput, {target: {value: "password"}})
        fireEvent.click(loginButton);

        expect(login).toHaveBeenCalledWith({userName: "anshu", password: "password"})
        expect(mockDispatch).toHaveBeenCalledWith(thunk);
    })

    test("Navigate to home page is user is logged in", ()=> {
        useSelector.mockImplementation(callback=> callback({
            auth:{user: {username: "Anshu"}}
        }))

        render(<LoginPage />)

        expect(mockNavigate).toHaveBeenCalledWith("/")
    })
})