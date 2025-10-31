import React from 'react'
import mainLogo from '../assets/chef-svgrepo-com.svg';
const Header = () => {
  return (
    <header>
        <nav>
          <div className='Navbar'>
            <div className='Header-Title'>
              Chef
            </div>
            <img className='mainLogo' src={mainLogo} alt="" />
            <div className='Header-Title'>
              Claude
            </div>
        </div>
        </nav>
    </header>
  )
}

export default Header