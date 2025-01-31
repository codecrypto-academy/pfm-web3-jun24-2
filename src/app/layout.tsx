import React from "react";
import Header from "./../components/Header";
import Footer from "./../components/Footer";

interface AppContainerProps {
  children: React.ReactNode;
}

export const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  return (
    <div className="app-container">
      <div className="app-wrapper">{children}</div>
    </div>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root" className="main-container">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
