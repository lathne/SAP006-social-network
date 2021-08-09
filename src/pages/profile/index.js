/* eslint-disable import/no-cycle */
import firebase from '../../services/firebase.js'
import { logout } from '../../components/profile/logout.js'

const createPage = () => {
  const user = firebase.getUser()
  const rootElement = document.createElement('div')
  const contentnewElement = `
  <p>${user.displayName}</p>
        
  <button id="logout">Sair</button>
`
  rootElement.innerHTML = contentnewElement

  const logoutButton = rootElement.querySelector('#logout')
  logoutButton.addEventListener('click', logout)

  return rootElement
}
export default createPage