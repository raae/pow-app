import React, { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"

import IndexPage from "./pages/index"
import LoginPage from "./pages/login"
import SignUpPage from "./pages/signup"
import SignOutPage from "./pages/signout"
import ResetPage from "./pages/reset"
import IncompletePage from "./pages/incomplete"
import TagPage from "./pages/tag"
import TimelinePage from "./pages/timeline"
import ProfileIndexPage from "./pages/profile/index"
import ProfileEmailPage from "./pages/profile/email"
import ProfilePasswordPage from "./pages/profile/password"
import NotFoundPage from "./pages/404"

// Gatsby scrolled to the top on every navigation; the timeline pages manage
// their own scroll anchoring, so they are left alone.
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!pathname.startsWith("/timeline")) {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signout" element={<SignOutPage />} />
        <Route path="/reset" element={<ResetPage />} />
        <Route path="/incomplete" element={<IncompletePage />} />
        <Route path="/tag" element={<TagPage />} />
        <Route path="/timeline/*" element={<TimelinePage />} />
        <Route path="/profile" element={<ProfileIndexPage />} />
        <Route path="/profile/email" element={<ProfileEmailPage />} />
        <Route path="/profile/password" element={<ProfilePasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
