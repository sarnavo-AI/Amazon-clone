import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../assets/css/Header.css'
import { Link } from 'react-router-dom';
import { useStateValue } from '../contextAPI/StateProvider';
import { auth } from '../Firebase';

function Header() { 
    const [{ cart, user }, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if(user) {
            auth.signOut();
        }
    }

    return ( 
        <div className='header'>
            <Link to="/">
            <img className='header__logo' src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='Amazon logo' />
            </Link>

            <div className='header__search'>
                <input className='header__searchInput' type="text" />
                <SearchIcon className='header__searchIcon' />
            </div>

            <div className='header__nav'>
                <Link to={ !user && '/login' } >
                    <div onClick={handleAuthentication} className='header__option'>
                            <span className='header__optionLineOne' >
                                Hello Guest
                            </span>
                            <span className='header__optionLineTwo'>
                                Sign { user ? "Out" : "In" }
                            </span>
                    </div>
                </Link>
                <div className='header__option'>
                    <span className='header__optionLineOne'>
                        Returns
                    </span>
                    <span className='header__optionLineTwo'>
                        & Orders
                    </span>
                </div>

                <div className='header__option'>
                    <span className='header__optionLineOne'>
                        Your
                    </span>
                    <span className='header__optionLineTwo'>
                        Prime
                    </span>
                </div>

                <Link to="/checkout">
                    <div className='header__optionBasket'>
                        <ShoppingCartIcon />
                        <span className='header__optionLineTwo header__basketCount'>
                            {cart.length}
                        </span>
                    </div>
                </Link>
            </div>

        </div>
  )
}

export default Header;
