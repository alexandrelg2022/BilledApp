/**
 * @jest-environment jsdom
 */

import { screen, fireEvent, waitFor } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import localStorageMock from "../__mocks__/localStorage"
import firestore from "../app/Firestore"


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Should handle file change", async () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      const newBill = new NewBill({
        document, onNavigate, firestore, localStorage: localStorageMock
      })

      const file = new File(["testfilechange"], "testfilechange.png", { type: "image/png" })
      const fileField = screen.getByTestId("file")
      await waitFor(() => {
        fireEvent.change(fileField, {
          target: {
            files: [file]
          }
        })
      })

      const fileFieldElement = document.querySelector("input[type='file']")
      expect(fileFieldElement.files[0].name).toBe("testfilechange.png")
      expect(fileFieldElement.files.length).toBe(1)
    })
    test("Should handle form submit", async () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      
      const onNavigate = jest.fn((pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      })
      const newBill = new NewBill({
        document, onNavigate, firestore, localStorage: localStorageMock
      })

      const file = new File(["testfilechange"], "testfilechange.png", { type: "image/png" })
      const fileField = screen.getByTestId("file")
      await waitFor(() => {
        fireEvent.change(fileField, {
          target: {
            files: [file]
          }
        })
      })

      const fileFieldElement = document.querySelector("input[type='file']")
      expect(fileFieldElement.files[0].name).toBe("testfilechange.png")
      expect(fileFieldElement.files.length).toBe(1)

      const submitButton = screen.getByText("Envoyer")
      fireEvent.click(submitButton)

      expect(onNavigate).toBeCalledTimes(1)
    })
  })
})