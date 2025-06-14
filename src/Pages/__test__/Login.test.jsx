import React from "react";
import { fireEvent, render, screen } from "@testing-library/react"
import LoginPage from "../LoginPage";
import { useDispatch , useSelector} from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../../app/features/auth/authSlice";
import "@testing-library/jest-dom"

//Mocks
jest.mock('react-router', () => ({
    useNavigate: jest.fn()
}))

jest.mock("react-redux", ()=>({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}))

jest.mock("../../app/features/auth/authSlice", ()=>({
    login: jest.fn()
}))


describe("Login Page", ()=> {
    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();

    // Actually invoked before running evert test
    beforeEach(() => {
        useDispatch.mockReturnValue(mockDispatch);
        useNavigate.mockReturnValue(mockNavigate);
        useSelector.mockImplementation(cb=> cb({auth: {user: null}}))
    })

    afterEach(()=> {
        jest.clearAllMocks();
    })

   test("Should render Login Page", () => {
       render(<LoginPage />)
       
       const titleH3 = screen.getByText(/Login Page/i);
       const userNameInp = screen.getByLabelText(/UserName/i);
       const passwordInp = screen.getByLabelText(/password/i);
       const loginBtn = screen.getByRole('button', {name: /login/i});

       // title,Username , Password and Login button are present on screen

       expect(titleH3).toBeInTheDocument();
       expect(userNameInp).toBeInTheDocument();
       expect(passwordInp).toBeInTheDocument();
       expect(loginBtn).toBeInTheDocument();
   })

   test("should dipatch login when provided username and password" ,()=> {
        const thunk = jest.fn();
        login.mockReturnValue(thunk);

        render(<LoginPage />);

       const userNameInp = screen.getByLabelText(/UserName/i);
       const passwordInp = screen.getByLabelText(/password/i);
       const loginBtn = screen.getByRole('button', { name: /login/i });

       fireEvent.change(userNameInp, {target: {value: "anshu"}})
       fireEvent.change(passwordInp, {target: {value: "password"}});
       fireEvent.click(loginBtn);
    
       expect(login).toHaveBeenCalledWith({ userName: "anshu", password: "password"});
       expect(mockDispatch).toHaveBeenCalledWith(thunk);

   })

   test("should call navigate with home when user is present", () => {
       useSelector.mockImplementation(cb => cb({ auth: { user: {username: "anshu"} } }))
       render(<LoginPage />)
       expect(mockNavigate).toHaveBeenCalledWith("/");
   })
})