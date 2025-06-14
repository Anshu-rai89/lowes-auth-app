import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import HomePage from "../HomePage"
import "@testing-library/jest-dom"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router"
import { logout } from "../../app/features/auth/authSlice"

jest.mock("react-redux", ()=>({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}))

jest.mock("react-router" ,()=> ({
    useNavigate: jest.fn(),
    NavLink: ({to, children}) => <a href={to}>{children}</a>
}))

jest.mock("../../app/features/auth/authSlice", ()=> ({
    logout: jest.fn()
}));

describe("Home Page" , () => {
    const mockNavigate = jest.fn();
    const mockDispatch= jest.fn();
    beforeEach(()=> {
        useDispatch.mockReturnValue(mockDispatch)
        useSelector.mockImplementation(cb => cb({auth: {user: {}}}));
        useNavigate.mockReturnValue(mockNavigate)
    })

    afterEach(()=> {
        jest.clearAllMocks();
    })

  test("Should render welcome message" , () => {
    render(< HomePage />)
      expect(screen.getByText(/Welcome to Lowes Auth APP Home Page V2/i)).toBeInTheDocument();
  })

  test("Should render login button if user is not present" ,() => {
      render(< HomePage />)

      expect(screen.getByRole('button', {name: /Login/i})).toBeInTheDocument();
  })

  test("Should call navigate with login path when login is clicked", ()=> {
     render(<HomePage />)

     const loginBtn= screen.getByRole('button', { name: /Login/i })
     fireEvent.click(loginBtn);

      expect(mockNavigate).toHaveBeenCalledWith("/login")
  })

  test("should render profile and logout when user is present" ,()=> {
    useSelector.mockImplementation(cb => cb({auth: {user: {username: "anshu"}}}))
    render(<HomePage />)
      const profilelink = screen.getByText(/Profile/i);
      const logoutBtn = screen.getByRole('button', {name: /logout/i});

      expect(profilelink).toBeInTheDocument();
      expect(logoutBtn).toBeInTheDocument();

  })

  test("Should dispatch logout when clicked on logout btn", ()=> {
      useSelector.mockImplementation(cb => cb({ auth: { user: { username: "anshu" } } }))
      const action = jest.fn()
      logout.mockReturnValue(action);
      render(<HomePage />)
      const logoutBtn = screen.getByRole('button', { name: /logout/i });
      
      fireEvent.click(logoutBtn);

      expect(logout).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenLastCalledWith(action);
  })
})