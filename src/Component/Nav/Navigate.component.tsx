import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './nav.css';
import { getAllUsers } from '../../Api/User.api';
const Navigate = () => {
  // const currentUserType = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserType: string } } }) => state.user.currentUser.UserType);
  // const currentUser = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserId: string, UserTypeId: string, UserTypeName: string, UserFirstName: string, UserLastName: string } } }) => state.user.currentUser);
  const type = sessionStorage.getItem("role")
  const navigate = useNavigate();
  const location = useLocation();
console.log(type);

debugger
  const getGreetingMessage = () => {
    const hours = new Date().getHours();
    let greeting;
    if (hours < 12) {
      greeting = 'בוקר טוב';
    } else if (hours < 18) {
      greeting = 'צהריים טובים';
    } else {
      greeting = 'ערב טוב';
    }

    return `${sessionStorage.getItem("userName")}, ${greeting}:)`;
  }
  useEffect(() => {
    if (!sessionStorage.getItem("userId")) {
          navigate('/SignIn');
        }
  // getAllUsers()
  }, []);
  return (
    <>
      <div id='imgandnav'>
        <div className="nav-container">
          <header>
            <nav className='nav'>
              <ul className='nav-list'>

                {type === '0'? (
                  <>
                    {/* <li className={`nav-item ${location.pathname.includes('/allStudent') ? 'active' : ''}`}><Link to={'allStudent'}></Link></li>
                    <li className={`nav-item ${location.pathname.includes('/intitution') ? 'active' : ''}`}><Link to={'intitution'}></Link></li>
                    <li className={`nav-item ${location.pathname.includes('/openTasks') ? 'active' : ''}`}><Link to={'openTasks'}></Link></li> */}

<li className={`nav-item ${location.pathname.includes('/allStudent') ? 'active' : ''}`}>
  <Link to={'/allStudent'}>כל הסטודנטים</Link>
</li>
<li className={`nav-item ${location.pathname.includes('/intitution') ? 'active' : ''}`}>
  <Link to={'/intitution'}>מוסדות</Link>
</li>
<li className={`nav-item ${location.pathname.includes('/openTasks') ? 'active' : ''}`}>
  <Link to={'/openTasks'}>משימות פתוחות</Link>
</li>
                  </>
                ) :
                type === '1' ? (
                  <>    
                    <p>{getGreetingMessage()}</p>
                    {/* <li className={`nav-item ${location.pathname.includes('/allStudent') ? 'active' : ''}`}><Link to={'allStudent'}></Link></li> */}
                    <li className={`nav-item ${location.pathname.includes('/allStudent') ? 'active' : ''}`}>
  <Link to={'/allStudent'}>כל הסטודנטים</Link>
</li>
                    </>
                ) :
                      <p style={{ fontSize: "17px" }}>הזן פרטי גישה כדי להתחבר למערכת</p>
                }
              </ul>
            </nav>
          </header>
        </div>

      </div>
    </>


  );
};

export default Navigate;
