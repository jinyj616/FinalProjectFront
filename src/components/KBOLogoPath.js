import {Link} from "react-router-dom";
import "../CSS/KBOLogoPath.css";
import {useState} from "react";

export default function KBOLogoPath() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <nav>
            <button onClick={toggleMenu} className="kbo-logo-button"><img
                src="//lgcxydabfbch3774324.cdn.ntruss.com/KBO_IMAGE/KBOHome/resources/images/common/h1_logo.png"
                alt="KBO Logo"
            /></button>
            <ul className={`team-logo-list ${isMenuOpen ? 'open' : ''}`}>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "LG" }}>
                        <button>
                            <img
                                src="//lgcxydabfbch3774324.cdn.ntruss.com/KBO_IMAGE/KBOHome/resources/images/emblem/regular/2022/LG.png"
                                alt="LG Logo"
                            />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "KT" }}>
                        <button>
                            <img
                                src="//lgcxydabfbch3774324.cdn.ntruss.com/KBO_IMAGE/KBOHome/resources/images/emblem/regular/2022/KT.png"
                                alt="KT Logo"
                            />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "KT" }}>
                        <button>
                            <img
                                src="//lgcxydabfbch3774324.cdn.ntruss.com/KBO_IMAGE/KBOHome/resources/images/emblem/regular/2022/NC.png"
                                alt="KT Logo"
                            />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "두산" }}>
                        <button>
                            <img
                                src="//lgcxydabfbch3774324.cdn.ntruss.com/KBO_IMAGE/KBOHome/resources/images/emblem/regular/2022/OB.png"
                                alt="두산 Logo"
                            />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "SSG" }}>
                        <button>
                            <img
                                src="//lgcxydabfbch3774324.cdn.ntruss.com/KBO_IMAGE/KBOHome/resources/images/emblem/regular/2022/SK.png"
                                alt="SSG Logo"
                            />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "KIA" }}>
                        <button>
                            <img
                                src="//lgcxydabfbch3774324.cdn.ntruss.com/KBO_IMAGE/KBOHome/resources/images/emblem/regular/2022/HT.png"
                                alt="KIA Logo"
                            />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "롯데" }}>
                        <button>
                            <img
                                src="//lgcxydabfbch3774324.cdn.ntruss.com/KBO_IMAGE/KBOHome/resources/images/emblem/regular/2022/LT.png"
                                alt="롯데 Logo"
                            />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "한화 " }}>
                        <button>
                            <img
                                src="//lgcxydabfbch3774324.cdn.ntruss.com/KBO_IMAGE/KBOHome/resources/images/emblem/regular/2022/HH.png"
                                alt="한화 Logo"
                            />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "삼성" }}>
                        <button>
                            <img
                                src="//lgcxydabfbch3774324.cdn.ntruss.com/KBO_IMAGE/KBOHome/resources/images/emblem/regular/2022/SS.png"
                                alt="삼성 Logo"
                            />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/KBO" state={{ teamFilter : "키움" }}>
                        <button>
                            <img
                                src="//lgcxydabfbch3774324.cdn.ntruss.com/KBO_IMAGE/KBOHome/resources/images/emblem/regular/2022/WO.png"
                                alt="키움 Logo"
                            />
                        </button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

