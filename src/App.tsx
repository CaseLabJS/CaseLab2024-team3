

import Header from './header/user/header'
import Footer from './footer/user/footer'

//Пример использования имени пользователя в шапке
const userData = {
  user: {
      name: "Иванов А.А."
  }
}


function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header userName={userData.user.name}/>
      <main className="flex-grow">
        <h1 className="text-2xl p-4">Документы</h1>
      </main>
      <Footer/>
    </div>
  )
}

export default App
