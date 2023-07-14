export default function PublicHeader() {

    return (
        <>
            <header className="header-user">
                <div className="logo-con">
                    <img src='/logo.png'></img>
                </div>
                <div className="menu-holder">
                    <div className="home-menu">Home</div>
                    <div className="list-menu">Listings</div>
                    <div className="compare-menu">Comparison</div>
                </div>
                <div></div>
                <div className="btn-signup">Sign up</div>
            </header>
        </>
    )
}