import {Route} from "lucide-react";

interface NavProps {
    isLoggedIn: boolean;
}

function Nav({ isLoggedIn = false }: NavProps) {
    return (
        <nav>
            {/*<img src={logo} alt="logo"/>*/}
            {!isLoggedIn ? (
                <div className="button-container">
                    <Route
                        path="login"
                        // element={<About />}
                    />
                    <Route
                        path="join"
                        // element={<About />}
                    />
                </div>
            ) : (
                <div className="button-container">
                    <Route
                        path="about"
                        // element={<About />}
                    />
                    <Route
                        path="logout"
                        // element={<About />}
                    />
                </div>
            )}
        </nav>
    );
}

export default Nav;