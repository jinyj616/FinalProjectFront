import {Link} from "react-router-dom";
import {useState} from "react";
import "../CSS/KLeagueLogoPath.css";

export default function KLeagueLogoPath() {
    const [iskLeagueMenuOpen, setIskLeagueMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIskLeagueMenuOpen(!iskLeagueMenuOpen);
    };
    return (
        <nav>
            <button onClick={toggleMenu} className="kLeague-logo-button"><img
                src="https://www.kleague.com/assets/images/logo/logo.png"
                alt="KLeague Logo"
            /></button>
            <ul className={`kLeague-logo-list ${iskLeagueMenuOpen ? 'open' : ''}`}>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "LG" }}>
                        <button>
                            <img
                                src="https://www.kleague.com/assets/images/emblem/emblem_K01.png"
                                alt="LG Logo"
                            />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "KT" }}>
                        <button>
                            <img
                                src="https://www.kleague.com/assets/images/emblem/emblem_K03.png"
                                alt="error"
                            />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "NC" }}>
                        <button>
                            <img
                                src="https://www.kleague.com/assets/images/emblem/emblem_K22.png"
                                alt="error"
                            />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "두산" }}>
                        <button>
                            <img
                                src="https://www.kleague.com/assets/images/emblem/emblem_K05.png"
                                alt="error"
                            />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "SSG" }}>
                        <button>
                            <img
                                src="https://www.kleague.com/assets/images/emblem/emblem_K18.png"
                                alt="error"
                            />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "KIA" }}>
                        <button>
                            <img
                                src="https://www.kleague.com/assets/images/emblem/emblem_K17.png"
                                alt="error"
                            />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "롯데" }}>
                        <button>
                            <img
                                src="https://www.kleague.com/assets/images/emblem/emblem_K09.png"
                                alt="error"
                            />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "한화 " }}>
                        <button>
                            <img
                                src="https://www.kleague.com/assets/images/emblem/emblem_K10.png"
                                alt="error"
                            />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "삼성" }}>
                        <button>
                            <img
                                src="https://www.kleague.com/assets/images/emblem/emblem_K04.png"
                                alt="error"
                            />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "키움" }}>
                        <button>
                            <img
                                src="https://www.kleague.com/assets/images/emblem/emblem_K29.png"
                                alt="error"
                            />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "키움" }}>
                        <button>
                            <img
                                src="https://www.kleague.com/assets/images/emblem/emblem_K21.png"
                                alt="error"
                            />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "키움" }}>
                        <button>
                            <img
                                src="https://www.kleague.com/assets/images/emblem/emblem_K02.png"
                                alt="error"
                            />
                        </button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

