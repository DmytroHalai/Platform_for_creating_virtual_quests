import type React from "react"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import NavigateBtn from "../../components/ui/NavigateBtn/NavigateBtn"
import "./ErrorRoute.css"

const ErrorPage: React.FC = () => {
  return (
    <div className="error-page">
      <Header />
      <main className="error-page__content">
        <div className="container">
          <h1 className="error-page__title">Oops! Something went wrong</h1>
          <p className="error-page__description">
            We're sorry, but it seems like we've encountered an unexpected error.
          </p>
          <NavigateBtn title="Go to Homepage" path="/" className="error-page__button" />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ErrorPage

